import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
// import mysql from 'mysql2/promise';
import 'dotenv/config';
// import bcrypt from 'bcrypt';
import session from 'express-session';
import pkg from 'pg';
import routes from './routes/basic_routes.mjs';

// *Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// const port = 3000;

// *Setup Handlebars
const hbs = create(
{
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views/partials'),
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// *Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

    
app.use('/', routes);


export { app as CampingPage };