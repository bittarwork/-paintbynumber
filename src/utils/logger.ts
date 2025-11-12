/**
 * Logger utility for development and production environments
 * Logs are only shown in development mode (when isDev is true)
 */

// Check if we're in development mode (not in production build)
const isDev = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

export class Logger {
    /**
     * Log a message (only in dev mode)
     */
    public static log(message: string, ...args: any[]): void {
        if (isDev) {
            console.log(`[PaintByNumbers] ${message}`, ...args);
        }
    }

    /**
     * Log a warning (only in dev mode)
     */
    public static warn(message: string, ...args: any[]): void {
        if (isDev) {
            console.warn(`[PaintByNumbers] ${message}`, ...args);
        }
    }

    /**
     * Log an error (always shown, but formatted)
     */
    public static error(message: string, error?: Error | any): void {
        if (error) {
            console.error(`[PaintByNumbers] ${message}`, error);
        } else {
            console.error(`[PaintByNumbers] ${message}`);
        }
    }

    /**
     * Log debug information (only in dev mode)
     */
    public static debug(message: string, ...args: any[]): void {
        if (isDev) {
            console.debug(`[PaintByNumbers] ${message}`, ...args);
        }
    }

    /**
     * Time a function execution (only in dev mode)
     */
    public static time(label: string): void {
        if (isDev) {
            console.time(`[PaintByNumbers] ${label}`);
        }
    }

    /**
     * End timing a function execution (only in dev mode)
     */
    public static timeEnd(label: string): void {
        if (isDev) {
            console.timeEnd(`[PaintByNumbers] ${label}`);
        }
    }
}

