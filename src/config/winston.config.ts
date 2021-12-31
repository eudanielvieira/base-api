import { WinstonModuleOptions } from 'nest-winston';
import { transports, config } from 'winston';

export const winstonConfig: WinstonModuleOptions = {
  levels: config.npm.levels,
  level: 'info',
  transports: [
    new transports.File({
      level: 'verbose',
      filename: '.log',
      dirname: 'logs',
    }),
  ],
};
