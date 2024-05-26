// Import required modules
import express from 'express'; // Express framework for web applications
import { create } from 'express-handlebars'; // Handlebars templating engine
import path from 'path'; // Node.js module for working with file paths
import { fileURLToPath } from 'url'; // Node.js module for working with file URLs
import 'dotenv/config'; // Module to load environment variables from a .env file
import session from 'express-session'; // Express middleware for managing sessions
import pkg from 'pg'; // PostgreSQL client
import routes from './routes/basic_routes.mjs'; // Importing routes from basic_routes.mjs file

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an instance of Express
const app = express();

// Setup Handlebars as the view engine
const hbs = create({
    extname: '.hbs', // Extension for Handlebars files
    layoutsDir: path.join(__dirname, 'views/layouts'), // Directory for layout files
    defaultLayout: 'main', // Default layout file
    partialsDir: path.join(__dirname, 'views/partials'), // Directory for partial files
});

// Set Handlebars as the view engine
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Setup session middleware for managing user sessions
app.use(session({
    secret: process.env.SESSION_SECRET, // Secret used to sign the session ID cookie
    resave: false, // Whether to save the session back to the session store if it was never modified during the request
    saveUninitialized: true // Whether to save new sessions that have not been modified
}));

// Use routes defined in the basic_routes.mjs file
app.use('/', routes);

// Export the Express app
export { app as CampingPage };