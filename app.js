require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');
const rateLimiter = require('./middlewares/rateLimiter');

const { APP_PORT, DB_URL } = require('./config');

const routes = require('./routes');

const errorHandler = require('./middlewares/errorHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsOptions, cors } = require('./middlewares/cors');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();

app.use(rateLimiter);
app.use(helmet());

app.options('*', corsOptions);
app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// логгер запросов
app.use(requestLogger);

app.use(routes);

// логгер ошибок
app.use(errorLogger);

// централизованный обработчик ошибок
app.use(errorHandler);

app.listen(APP_PORT);
// app.listen(APP_PORT, () => {
//   console.log(`App listening on port ${APP_PORT}`);
// });
