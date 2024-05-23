import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/basicroutes.mjs';
import authRoutes from './routes/authRoutes.mjs';
import availabilityRoutes from './routes/availabilityRoutes.mjs';
// import { authenticateUser, sessionConfig } from './app-setup/app-setup-session.mjs';
import { sessionConfig, setUser } from './app-setup/app-setup-session.mjs';
import 'dotenv/config';
import pkg from 'pg';

const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new Express application
const app = express();

// Enable session middleware
app.use(sessionConfig);

// Middleware to set user data for views
app.use(setUser);

// Enable URL-encoded body parsing for POST requests
app.use(express.urlencoded({ extended: false }));

// Set res.locals.userId for use in templates
app.use((req, res, next) => {
  if (req.session) {
    res.locals.userId = req.session.loggedUserId || 'visitor';
  } else {
    res.locals.userId = 'visitor';
  }
  next();
});

// Set up Handlebars engine
const hbs = create({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  helpers: {
    ifEquals: (arg1, arg2, options) => {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    }
  }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use routes from routes directory
app.use('/', routes);
app.use('/auth', authRoutes); // Use the authentication routes
app.use('/api', availabilityRoutes);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// Initialize PostgreSQL pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10)
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// // app.mjs
// import express from 'express';
// import { create } from 'express-handlebars';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import routes from './routes/basicroutes.mjs';
// import authRoutes from './routes/authRoutes.mjs';
// import { authenticateUser, sessionConfig } from './app-setup/app-setup-session.mjs';
// import 'dotenv/config';
// import pkg from 'pg';

// const { Pool } = pkg;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Create a new Express application
// const app = express();

// // Enable session middleware
// app.use(sessionConfig);

// app.use(setUser);

// // Enable URL-encoded body parsing for POST requests
// app.use(express.urlencoded({ extended: false }));

// // Set res.locals.userId for use in templates
// app.use((req, res, next) => {
//   if (req.session) {
//     res.locals.userId = req.session.loggedUserId || 'visitor';
//   } else {
//     res.locals.userId = 'visitor';
//   }
//   next();
// });

// // app.get('/navbar', (req, res) => {
// //   res.render('navbar', { isAuthenticated: req.session.loggedUserId });
// // });


// // Set up Handlebars engine
// const hbs = create({
//   extname: 'hbs',
//   defaultLayout: 'main',
//   layoutsDir: path.join(__dirname, 'views', 'layouts'),
//   partialsDir: path.join(__dirname, 'views', 'partials')
// });

// app.engine('hbs', hbs.engine);
// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views'));

// // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Use routes from routes directory
// app.use('/', routes);
// app.use('/auth', authRoutes); // Use the authentication routes
// // console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// // Initialize PostgreSQL pool
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: parseInt(process.env.DB_PORT, 10)
// });


// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
