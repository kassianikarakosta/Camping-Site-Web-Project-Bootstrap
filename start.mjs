import dotenv from 'dotenv';
const pgp = require('pg-promise')();
const db = pgp(dbConfig);


if (process.env.NODE_ENV !== 'production') {
   console.log('loading .env');
   dotenv.config();
}



import { taskList } from './app.mjs';

const port = process.env.PORT || '3000';

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};


const server = taskList.listen(port, () => {
   console.log(`Listening to http://127.0.0.1:${port}`);
});

process.on('SIGTERM', () => {
   console.info('SIGTERM signal received.');
   console.log('Closing http server.');
   server.close(() => {
      console.log('Http server closed.');
   });
});
