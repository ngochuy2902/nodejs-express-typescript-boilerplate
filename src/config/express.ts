import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import handleException from '../middleware/exception-handler.middleware';
import { application } from './application';
import indexRoute from '../route/index.route';
import urlNotFoundHandler from '../middleware/url-not-found-handler.middleware';

const app = express();

app.locals['userContext'] = null;
app.use(bodyParser.json());

app.use(cors());
app.use(application.url.baseUrl, indexRoute);
app.use('/files', express.static(application.file.workDir));
app.use(handleException);
app.use(urlNotFoundHandler);

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

export default app;
