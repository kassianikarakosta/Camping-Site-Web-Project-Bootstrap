// Import required modules
import express from 'express'; // Express framework for web applications
import pkg from 'pg'; // PostgreSQL client
import multer from 'multer'; // Middleware for handling multipart/form-data
import fs from 'fs'; // File system module
import path from 'path'; // Path module for handling file paths
import { fileURLToPath } from 'url'; // Module to convert file URL to file path

// Destructuring assignment to get Pool class from pg package
const { Pool } = pkg;

// Get current filename and dirname using fileURLToPath and dirname functions
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an instance of express router
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Create directory for storing uploaded event images
        const eventDir = path.join(__dirname, '../public/event_images', req.body.title);
        fs.mkdirSync(eventDir, { recursive: true }); // Synchronously create directory if it doesn't exist
        cb(null, eventDir); // Callback with destination directory
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Set filename to the original filename
    }
});

// Initialize multer middleware with configured storage
const upload = multer({ storage: storage });

// Controller function to add an event
export let addEvent = async (req, res) => {
    // Check if user is logged in and is an admin
    if (!req.session.user || req.session.user.user_type !== 'admin') {
        res.redirect('/login'); // Redirect to login if not logged in as admin
        return;
    }
    const user = req.session.user;

    // Extract event details from request body
    const { title, description, event_date, event_time, event_duration } = req.body;
    // Construct image URL based on uploaded file
    const image_url = path.join('event_images', title, req.file.originalname);

    // Create a PostgreSQL pool with connection details
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL, // Connection string for PostgreSQL database
        ssl: {
          rejectUnauthorized: false // Option to disable SSL certificate validation
        }
    });

    try {
        // Connect to the PostgreSQL pool
        const client = await pool.connect();
        try {
            // Execute SQL query to insert event details into database
            const result = await client.query(
                'INSERT INTO events (title, description, event_date, event_time, event_duration, image_url) VALUES ($1, $2, $3, $4, $5, $6)',
                [title, description, event_date, event_time, event_duration, image_url]
            );

            if (result.rowCount > 0) {
                // Render success message if event added successfully
                res.render('addevent', { title: 'Add Event', message_success: 'Event added successfully!', customCss: '/addevent.css' });
            }
        } catch (error) {
            // Render error message if failed to add event
            console.error('Error adding event:', error);
            res.render('addevent', { title: 'Add Event', message_failure: 'Failed to add event!', customCss: '/addevent.css' });
            res.status(500).send('Error adding event');
        } finally {
            // Release client back to the pool and end the pool
            client.release();
            await pool.end();
        }
    } catch (error) {
        // Render error message if failed to connect to database
        console.error('Error connecting to the database:', error);
        res.render('addevent', { title: 'Add Event', message_failure: 'Failed to add event! Contact administrator of the website!', customCss: '/addevent.css' });
        res.status(500).send('Internal Server Error');
    }

    res.redirect('/addevent'); // Redirect to add event page after processing
};

// Controller function to show events
export let showEvent = async (req, res) => {
    const user = req.session.user;

    // Create a PostgreSQL pool with connection details
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL, // Connection string for PostgreSQL database
        ssl: {
          rejectUnauthorized: false // Option to disable SSL certificate validation
        }
    });

    try {
        // Connect to the PostgreSQL pool
        const client = await pool.connect();
        try {
            // Execute SQL query to select all events from database
            const result = await client.query('SELECT * FROM events ORDER BY eventid DESC');
            if (result.rowCount > 0) {
                // Render events page with events data
                res.render('events', { title: 'Events', customCss: '/events.css', events: result.rows, user });
            } else {
                // Render events page with no events message
                res.render('events', { title: 'Events', message_failure: 'No events found!', customCss: '/events.css', user });
            }
        } catch (error) {
            // Render error message if failed to show events
            console.error('Error showing events:', error);
            res.render('events', { title: 'Events', message_failure: 'Failed showing events!', customCss: '/events.css', user });
            res.status(500).send('Error showing events:');
        } finally {
            // Release client back to the pool and end the pool
            client.release();
            await pool.end();
        }
    } catch (error) {
        // Render error message if failed to connect to database
        console.error('Error connecting to the database:', error);
        res.render('events', { title: 'Events', message_failure: 'Failed with events! Contact administrator of the website!', customCss: '/events.css', user });
        res.status(500).send('Internal Server Error');
    }
};

// Export multer middleware for file uploads
export { upload };
