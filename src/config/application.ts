require('dotenv').config();

const serverPort: string = process.env.SERVER_PORT;
const accessTokenExpired: string = process.env.ACCESS_TOKEN_EXPIRED_IN_SECOND;
const refreshTokenExpired: string = process.env.REFRESH_TOKEN_EXPIRED_IN_SECOND;
const tokenSecretKey: string = process.env.TOKEN_SECRET_KEY;
const loggerDirectory: string = process.env.LOG_DIR;
const fileMaxSize: string = process.env.FILE_MAX_SIZE;
const fileExtensions: string = process.env.FILE_EXTENSIONS;
const deleteExpiredFilesExpression: string = process.env.DELETE_EXPIRED_FILES_EXPRESSION;

export const application = {
  server: {
    port: serverPort ? parseInt(serverPort) : 8080,
  },
  url: {
    baseUrl: '/api',
  },
  auth: {
    accessTokenExpired: accessTokenExpired ? parseInt(accessTokenExpired) : 3600, //1h
    refreshTokenExpired: refreshTokenExpired ? parseInt(refreshTokenExpired) : 604800, //7d
    tokenSecretKey: tokenSecretKey || 'test',
  },
  log: {
    loggerDirectory: loggerDirectory || './logs',
  },
  file: {
    tmpDir: './resources/tmp',
    workDir: './resources/data',
    expiredTime: 3600000, //1h
    maxSize: fileMaxSize ? parseInt(fileMaxSize) : 10485760, //10MB
    extensions: fileExtensions
      ? fileExtensions.split(',').map((extension) => 'image/' + extension)
      : ['image/jpg', 'image/jpeg', 'image/png'],
  },
  cronJob: {
    deleteExpiredFilesExpression: deleteExpiredFilesExpression || '0 0/1 * * *', //every 1 hour
  },
};
