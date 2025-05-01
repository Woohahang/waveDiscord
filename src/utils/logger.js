const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info', // default level
    format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.printf(({ level, message, timestamp, stack, ...meta }) => {

            const metaInfo = Object.entries(meta)
                .map(([key, value]) => `${key}: ${value}`)
                .join(' | ');

            let log = `[${level}] ${timestamp} - ${message}`;

            if (metaInfo) log += ' | ' + metaInfo;
            if (stack) log += `\n${stack}`;

            return log;
        })
    ),
    transports: [
        new transports.Console(),
        // new transports.File({ filename: 'logs/error.log', level: 'error' }),
        // new transports.File({ filename: 'logs/combined.log' })
    ]
});

module.exports = logger;