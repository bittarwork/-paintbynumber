/**
 * Drag and drop utility for image uploads
 */

import { notifications } from "./notifications";

export interface DragDropOptions {
    onImageLoad: (img: HTMLImageElement) => void;
    canvas: HTMLCanvasElement;
    maxFileSize?: number; // in bytes, default 10MB
    allowedTypes?: string[]; // default: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
}

export class DragDropHandler {
    private canvas: HTMLCanvasElement;
    private onImageLoad: (img: HTMLImageElement) => void;
    private maxFileSize: number;
    private allowedTypes: string[];
    private isDragging: boolean = false;

    constructor(options: DragDropOptions) {
        this.canvas = options.canvas;
        this.onImageLoad = options.onImageLoad;
        this.maxFileSize = options.maxFileSize || 10 * 1024 * 1024; // 10MB default
        this.allowedTypes = options.allowedTypes || [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/gif',
            'image/webp'
        ];

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            document.body.addEventListener(eventName, this.preventDefaults, false);
        });

        const canvasContainer = this.canvas.parentElement;
        if (canvasContainer) {
            // Highlight drop zone when item is dragged over it
            ['dragenter', 'dragover'].forEach(eventName => {
                canvasContainer.addEventListener(eventName, (e: Event) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.isDragging = true;
                    canvasContainer.classList.add('drag-over');
                    const overlay = document.getElementById('dragOverlay');
                    if (overlay) {
                        overlay.classList.add('active');
                    }
                }, false);
            });

            ['dragleave', 'drop'].forEach(eventName => {
                canvasContainer.addEventListener(eventName, (e: Event) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.isDragging = false;
                    canvasContainer.classList.remove('drag-over');
                    const overlay = document.getElementById('dragOverlay');
                    if (overlay) {
                        overlay.classList.remove('active');
                    }
                }, false);
            });

            // Handle dropped files
            canvasContainer.addEventListener('drop', this.handleDrop.bind(this), false);
        }
    }

    private preventDefaults(e: Event): void {
        e.preventDefault();
        e.stopPropagation();
    }

    private handleDrop(e: DragEvent): void {
        const dt = e.dataTransfer;
        if (!dt) {
            return;
        }

        const files = dt.files;
        if (files.length === 0) {
            return;
        }

        // Only process the first file
        const file = files[0];
        this.processFile(file);
    }

    public processFile(file: File): void {
        // Validate file type
        if (!this.allowedTypes.includes(file.type)) {
            notifications.error(
                `Invalid file type. Allowed types: ${this.allowedTypes.join(', ')}`
            );
            return;
        }

        // Validate file size
        if (file.size > this.maxFileSize) {
            const maxSizeMB = (this.maxFileSize / (1024 * 1024)).toFixed(2);
            notifications.error(
                `File too large. Maximum size: ${maxSizeMB}MB`
            );
            return;
        }

        // Read and load image
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const result = e.target?.result;
            if (typeof result === 'string') {
                const img = new Image();
                img.onload = () => {
                    this.onImageLoad(img);
                    notifications.success("Image loaded successfully");
                };
                img.onerror = () => {
                    notifications.error("Failed to load image");
                };
                img.src = result;
            }
        };
        reader.onerror = () => {
            notifications.error("Error reading file");
        };
        reader.readAsDataURL(file);
    }
}

