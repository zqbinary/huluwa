// app.js
import express from 'express';
import "regenerator-runtime/runtime.js";
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParse from 'body-parser'
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import apisRouter from './routes/apis';

var app = express();

app.use(logger('dev'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/api', apisRouter);
app.use('/users', usersRouter);

export default app;
