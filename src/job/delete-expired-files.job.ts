import { schedule } from 'node-cron';
import * as fs from 'fs';
import logger from '../config/logger';
import { application } from '../config/application';

const keepFolderFile = '.gitignore';

export const deleteExpiredFilesJob = () => {
  const initScheduledJobs = schedule(application.cronJob.deleteExpiredFilesExpression, () => {
    logger.info('Job start: Delete expired files');
    checkAndDeleteExpiredFiles();
  });
  initScheduledJobs.start();
};

const checkAndDeleteExpiredFiles = () => {
  fs.readdir(application.file.tmpDir, (error, files) => {
    if (error) {
      logger.error(`Can not read temporary directory's file, error: ${error}`);
    }

    files.forEach((file) => {
      const filePath = application.file.tmpDir + '/' + file;

      fs.stat(filePath, (error, stats) => {
        const expiredTime = new Date(stats.birthtime).getTime() + application.file.expiredTime;
        const now = new Date().getTime();

        if (file != keepFolderFile && expiredTime < now) {
          fs.unlink(filePath, (error) => {
            if (error) {
              logger.error(`Can not delete expired file: ${filePath}, error: ${error}`);
            } else {
              logger.info(`Deleted expired file: ${filePath}`);
            }
          });
        }
      });
    });
  });
};
