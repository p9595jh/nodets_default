import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
const createError = require('http-errors');

const app = express();

// set options
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set routers
app.use('/', require('./routes/index'));

// error handling
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  next(createError(404));
});

app.use((err: Err, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    data: err.data
  });
});

interface Err extends Error {
  status: number
  data?: any
}

export default app;
