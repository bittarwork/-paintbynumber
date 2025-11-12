/**
 * Toast notification system for user feedback
 * Replaces alert() with modern, non-blocking notifications
 */

export type NotificationType = "success" | "error" | "warning" | "info";

export interface NotificationOptions {
    duration?: number; // Duration in milliseconds (default: 5000)
    dismissible?: boolean; // Can user dismiss manually (default: true)
}

class NotificationManager {
    private container: HTMLElement | null = null;
    private notifications: Set<HTMLElement> = new Set();

    /**
     * Initialize the notification container
     */
    public init(): void {
        if (this.container) {
            return;
        }

        this.container = document.createElement("div");
        this.container.id = "notification-container";
        this.container.className = "notification-container";
        document.body.appendChild(this.container);
    }

    /**
     * Show a notification
     */
    public show(
        message: string,
        type: NotificationType = "info",
        options: NotificationOptions = {}
    ): void {
        this.init();

        const duration = options.duration ?? 5000;
        const dismissible = options.dismissible ?? true;

        const notification = document.createElement("div");
        notification.className = `notification notification-${type}`;
        
        const icon = this.getIcon(type);
        const messageSpan = document.createElement("span");
        messageSpan.className = "notification-message";
        messageSpan.textContent = message;

        notification.appendChild(icon);
        notification.appendChild(messageSpan);

        if (dismissible) {
            const closeBtn = document.createElement("button");
            closeBtn.className = "notification-close";
            closeBtn.innerHTML = "&times;";
            closeBtn.setAttribute("aria-label", "Close notification");
            closeBtn.onclick = () => this.remove(notification);
            notification.appendChild(closeBtn);
        }

        this.container!.appendChild(notification);
        this.notifications.add(notification);

        // Trigger animation
        setTimeout(() => {
            notification.classList.add("show");
        }, 10);

        // Auto-dismiss
        if (duration > 0) {
            setTimeout(() => {
                this.remove(notification);
            }, duration);
        }
    }

    /**
     * Remove a notification
     */
    private remove(notification: HTMLElement): void {
        if (!this.notifications.has(notification)) {
            return;
        }

        notification.classList.remove("show");
        notification.classList.add("hide");

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            this.notifications.delete(notification);
        }, 300); // Match CSS transition duration
    }

    /**
     * Get icon for notification type
     */
    private getIcon(type: NotificationType): HTMLElement {
        const icon = document.createElement("span");
        icon.className = "notification-icon";

        switch (type) {
            case "success":
                icon.innerHTML = "✓";
                break;
            case "error":
                icon.innerHTML = "✕";
                break;
            case "warning":
                icon.innerHTML = "⚠";
                break;
            case "info":
            default:
                icon.innerHTML = "ℹ";
                break;
        }

        return icon;
    }

    /**
     * Show success notification
     */
    public success(message: string, options?: NotificationOptions): void {
        this.show(message, "success", options);
    }

    /**
     * Show error notification
     */
    public error(message: string, options?: NotificationOptions): void {
        this.show(message, "error", { duration: 7000, ...options });
    }

    /**
     * Show warning notification
     */
    public warning(message: string, options?: NotificationOptions): void {
        this.show(message, "warning", options);
    }

    /**
     * Show info notification
     */
    public info(message: string, options?: NotificationOptions): void {
        this.show(message, "info", options);
    }
}

// Export singleton instance
export const notifications = new NotificationManager();

