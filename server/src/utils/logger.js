const winston = require("winston");
const path = require("path");

// 配置日志格式
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

// 创建日志记录器
const logger = winston.createLogger({
  format: logFormat,
  transports: [
    // 控制台输出
    new winston.transports.Console(),
    // 信息级别日志文件
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs/info.log"),
      level: "info",
    }),
    // 错误级别日志文件
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs/error.log"),
      level: "error",
    }),
  ],
});

module.exports = logger;
