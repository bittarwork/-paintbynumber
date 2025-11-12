import { cancelProcess, downloadPalettePng, downloadPNG, downloadSVG, loadExample, process, updateOutput } from "./gui";
import { Clipboard } from "./lib/clipboard";
import { DragDropHandler } from "./utils/dragDrop";
import { notifications } from "./utils/notifications";
import { Logger } from "./utils/logger";

$(document).ready(function () {

    $(".tabs").tabs();
    $(".tooltipped").tooltip();

    // Dark mode toggle
    const themeToggle = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            
            const icon = themeToggle.querySelector("i");
            if (icon) {
                icon.textContent = newTheme === "dark" ? "brightness_5" : "brightness_4";
            }
        });
        
        // Set initial icon
        const icon = themeToggle.querySelector("i");
        if (icon && currentTheme === "dark") {
            icon.textContent = "brightness_5";
        }
    }

    const clip = new Clipboard("canvas", true);
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvasPlaceholder = document.getElementById("canvasPlaceholder");
    const canvasContainer = document.getElementById("canvasContainer");
    
    // Function to show canvas and hide placeholder
    const showCanvas = () => {
        if (canvasPlaceholder) {
            canvasPlaceholder.style.display = "none";
        }
        if (canvas) {
            canvas.classList.add("visible");
        }
    };
    
    // Function to hide canvas and show placeholder
    const hideCanvas = () => {
        if (canvasPlaceholder) {
            canvasPlaceholder.style.display = "block";
        }
        if (canvas) {
            canvas.classList.remove("visible");
        }
    };
    
    // Setup drag and drop
    const dragDrop = new DragDropHandler({
        canvas: canvas,
        onImageLoad: (img: HTMLImageElement) => {
            const ctx = canvas.getContext("2d")!;
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            showCanvas();
        }
    });

    // File input handler
    $("#file").change(function (ev) {
        const files = (<HTMLInputElement>$("#file").get(0)).files;
        if (files !== null && files.length > 0) {
            dragDrop.processFile(files[0]);
        }
    });
    
    // File input click handler - also trigger from upload button
    const fileInput = document.getElementById("file");
    if (fileInput) {
        // File input change is already handled above
    }

    // Initially hide canvas
    hideCanvas();
    
    // Load example after a delay to show placeholder first
    setTimeout(() => {
        loadExample("imgSmall");
        showCanvas();
    }, 500);

    // Keyboard shortcuts
    $(document).keydown(function (e) {
        // Ctrl+P or Cmd+P to process
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            $("#btnProcess").trigger('click');
        }
    });

    $("#btnProcess").click(async function () {
        try {
            await process();
        } catch (err: any) {
            Logger.error("Error in process button handler", err);
            // Error handling is done in gui.ts process() function
        }
    });

    $("#chkShowLabels, #chkFillFacets, #chkShowBorders, #txtSizeMultiplier, #txtLabelFontSize, #txtLabelFontColor").change(async () => {
        await updateOutput();
    });

    $("#btnDownloadSVG").click(function () {
        downloadSVG();
    });

    $("#btnDownloadPNG").click(function () {
        downloadPNG();
    });

    $("#btnDownloadPalettePNG").click(function () {
        downloadPalettePng();
    });

    // Cancel button handler
    $("#btnCancel").click(function () {
        cancelProcess();
    });

    $("#lnkTrivial").click(() => { loadExample("imgTrivial"); return false; });
    $("#lnkSmall").click(() => { loadExample("imgSmall"); return false; });
    $("#lnkMedium").click(() => { loadExample("imgMedium"); return false; });
});
