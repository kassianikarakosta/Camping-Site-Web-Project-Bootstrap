// Import required modules
import express from 'express'; // Express framework for web applications
import pkg from 'pg'; // PostgreSQL client
// import bcrypt from 'bcrypt'; // Library for hashing passwords
// const router = express.Router(); // Express router for defining routes

// Destructure Pool class from pg package
const { Pool } = pkg;

// Controller function to send email
export let sendEmail = async (req, res) => {
    // Extract data from request body
    const { firstname, lastname, email, subject, message } = req.body;

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
            // Execute SQL query to insert email details into database
            const result = await client.query('INSERT INTO email (firstname, lastname, email, mail_subject, mail_message) VALUES ($1, $2, $3, $4, $5)', [firstname, lastname, email, subject, message]);
            if (result.rowCount > 0) {
                // Render success message if email sent successfully
                res.render('contact', { title: 'Contact', message_success: 'Message sent!', customCss: '/contact.css' });
            }
        } catch (error) {
            // Render error message if failed to send email
            console.error('Error sending message:', error);
            res.render('contact', { title: 'Contact', message_failure: 'Message not sent!', customCss: '/contact.css' });
            res.status(500).send('Error sending message');
        } finally {
            // Release client back to the pool and end the pool
            client.release();
            await pool.end();
        }
    } catch (error) {
        // Render error message if failed to connect to database
        console.error('Error connecting to the database:', error);
        res.render('contact', { title: 'Contact', message_failure: 'Message not sent! Contact administrator of the website!', customCss: '/contact.css' });
        res.status(500).send('Internal Server Error');
    }

    res.redirect('/contact'); // Redirect to contact page after processing
};

// Controller function to show emails
export let showEmails = async (req, res) => {
    // Check if user is logged in and is an admin
    if (!req.session.user || req.session.user.user_type !== 'admin') {
        res.redirect('/login'); // Redirect to login if not logged in as admin
        return;
    }
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
            // Execute SQL query to select all emails from database
            const result = await client.query('SELECT * FROM email ORDER BY senderid DESC');
            if (result.rowCount > 0) {
                // Render emails page with email data
                res.render('emails', { title: 'Emails', message_success: 'Emails Shown!', customCss: '/emails.css', emails: result.rows, user });
            } else {
                // Render emails page with no emails message
                res.render('emails', { title: 'Emails', message_failure: 'No emails found!', customCss: '/emails.css', user });
            }
        } catch (error) {
            // Render error message if failed to show emails
            console.error('Error sending message:', error);
            res.render('emails', { title: 'Emails', message_failure: 'Failed showing emails!', customCss: '/emails.css', user });
            res.status(500).send('Error sending message');
        } finally {
            // Release client back to the pool and end the pool
            client.release();
            await pool.end();
        }
    } catch (error) {
        // Render error message if failed to connect to database
        console.error('Error connecting to the database:', error);
        res.render('emails', { title: 'Emails', message_failure: 'Failed with emails! Contact administrator of the website!', customCss: '/emails.css', user });
        res.status(500).send('Internal Server Error');
    }
};
