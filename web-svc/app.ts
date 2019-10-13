import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const svc = 'web';
process.env.SVC = `${svc}-svc`;
import { endpoints } from 'common-util/configs';
import { reqLogger } from 'common-util/logger';
import { errorHandler } from 'common-util/error';

// Controllers
import * as webController from './controllers/webroute';
import * as redditController from './controllers/reddit';

const app: express.Application = express();

// Engine Setup
app.use(bodyParser.urlencoded({ extended: true })); // Body Parser Middle Ware
app.use(bodyParser.json()); // Body Parser Middle Ware
app.use(reqLogger); // Logger Middleware
app.use(cors({ origin: '*' })); // Cors middleware

// Init user controller internal routes here
webController.router.get('/', webController.getPerspectives);

// Reddit Controller
redditController.router.get('/posts', redditController.getPosts);

// Add custom controller routes here
app.use('/', webController.router);
app.use('/reddit', redditController.router);

// Error Handling Middleware goes here
app.use(errorHandler);

app.listen(endpoints[svc].http_port, () => {
  console.log(`App listening on port ${endpoints[svc].http_port}`);
});

module.exports = {
  app,
};
