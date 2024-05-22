import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/basicroutes.mjs';
// import { Pool } from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import pkg from 'pg';

const { Pool } = pkg;

// Create a new Express application
const app = express();

// Configure the PostgreSQL connection pool
// const pool = new Pool({
//   user: 'your-username',
//   host: 'your-hostname',
//   database: 'your-database-name',
//   password: 'your-password',
//   port: 5432, // Default PostgreSQL port
// });

// Set up Handlebars engine
const hbs = create({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials')
});

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'camping_page',
  password: 'kassiani',
  port: 5432, // Default PostgreSQL port
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use routes from routes directory
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
