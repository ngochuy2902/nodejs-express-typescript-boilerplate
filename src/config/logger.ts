import winston, { format } from 'winston';
import { application } from './application';

const { combine, timestamp, printf } = format;

const customFormat = printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: combine(
        format((info) => ({ ...info, level: info.level.toUpperCase() }))(),
        format.colorize(),
        timestamp(),
        customFormat,
      ),
    }),
    new winston.transports.File({
      filename: 'server.log',
      level: 'info',
      maxsize: 5242880,
      dirname: application.log.loggerDirectory,
      format: combine(format((info) => ({ ...info, level: info.level.toUpperCase() }))(), timestamp(), customFormat),
    }),
  ],
});

export default logger;
