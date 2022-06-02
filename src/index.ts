import { createConnection } from 'typeorm';

import logger from './config/logger';
import app from './config/express';
import { application } from './config/application';
import { deleteExpiredFilesJob } from './job/delete-expired-files.job';
const serverPort = application.server.port;

deleteExpiredFilesJob();

createConnection()
  .then(() => {
    app.listen(serverPort, () => {
      logger.info(`Server is running on port ${serverPort}`);
    });
  })
  .catch((error: Error) => {
    logger.error(`Database connection failed with error: ${error.message}`);
  });
