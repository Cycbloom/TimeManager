import { format } from "date-fns";

enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

interface LogConfig {
  level: LogLevel;
  logDir: string;
  maxFileSize?: number; // 单位：字节
  maxFiles?: number;
}

class Logger {
  private static instance: Logger;
  private config: LogConfig = {
    level: LogLevel.INFO,
    logDir: "logs",
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 5,
  };

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public configure(config: Partial<LogConfig>): void {
    this.config = { ...this.config, ...config };
  }

  private async writeToFile(message: string): Promise<void> {
    try {
      const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      const logMessage = `[${timestamp}] ${message}\n`;

      // 在浏览器环境中，我们可以使用 localStorage 或 IndexedDB 来模拟文件系统
      const currentLogs = localStorage.getItem("app_logs") || "";
      localStorage.setItem("app_logs", currentLogs + logMessage);

      // 如果需要，可以通过 API 将日志发送到后端
      // await fetch('/api/logs', {
      //   method: 'POST',
      //   body: JSON.stringify({ message: logMessage }),
      //   headers: { 'Content-Type': 'application/json' }
      // });
    } catch (error) {
      console.error("Failed to write log:", error);
    }
  }

  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const component =
      new Error().stack
        ?.split("\n")[3]
        ?.match(/\((.*):\d+:\d+\)/)?.[1]
        ?.split("/")
        .pop() || "unknown";

    const metaStr = meta ? ` | ${JSON.stringify(meta)}` : "";
    return `[${level}][${component}] ${message}${metaStr}`;
  }

  public async debug(message: string, meta?: any): Promise<void> {
    if (this.config.level === LogLevel.DEBUG) {
      const formattedMessage = this.formatMessage(
        LogLevel.DEBUG,
        message,
        meta
      );
      console.debug(formattedMessage);
      await this.writeToFile(formattedMessage);
    }
  }

  public async info(message: string, meta?: any): Promise<void> {
    if ([LogLevel.DEBUG, LogLevel.INFO].includes(this.config.level)) {
      const formattedMessage = this.formatMessage(LogLevel.INFO, message, meta);
      console.info(formattedMessage);
      await this.writeToFile(formattedMessage);
    }
  }

  public async warn(message: string, meta?: any): Promise<void> {
    if (
      [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN].includes(this.config.level)
    ) {
      const formattedMessage = this.formatMessage(LogLevel.WARN, message, meta);
      console.warn(formattedMessage);
      await this.writeToFile(formattedMessage);
    }
  }

  public async error(message: string, meta?: any): Promise<void> {
    const formattedMessage = this.formatMessage(LogLevel.ERROR, message, meta);
    console.error(formattedMessage);
    await this.writeToFile(formattedMessage);
  }

  public clearLogs(): void {
    localStorage.removeItem("app_logs");
  }

  public getLogs(): string {
    return localStorage.getItem("app_logs") || "";
  }
}

export const logger = Logger.getInstance();
export { LogLevel, type LogConfig };
