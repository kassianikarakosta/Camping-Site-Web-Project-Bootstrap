// Import required modules
import express from 'express'; // Express framework for web applications
import pkg from 'pg'; // PostgreSQL client
// import bcrypt from 'bcrypt'; // Library for hashing passwords
// const router = express.Router(); // Express router for defining routes

// Destructure Pool class from pg package
const { Pool } = pkg;

// Controller function to show reservations
export let showReservations = async (req, res) => {
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
            // Execute SQL query to select reservations with user and place details
            const result = await client.query('SELECT users.first_name, users.last_name, users.email, users.phone, users.id_number, place.place_type, place.category_type, reservation.arrival_date, reservation.depart_date, reservation.final_price FROM users, reservation, place WHERE reservation.placeid = place.placeid AND reservation.userid = users.userid ORDER BY reservID DESC;');
            if (result.rowCount > 0) {
                // Render reservations page with reservation data
                res.render('reservations', { title: 'Reservations', message_success: 'Reservations Shown!', customCss: '/reservations.css', reservations: result.rows, user });
            } else {
                // Render reservations page with no reservations message
                res.render('reservations', { title: 'Reservations', message_failure: 'No reservations found!', customCss: '/reservations.css', user });
            }
        } catch (error) {
            // Render error message if failed to show reservations
            console.error('Error sending message:', error);
            res.render('reservations', { title: 'Reservations', message_failure: 'Failed showing reservations!', customCss: '/reservations.css', user });
            res.status(500).send('Error sending message');
        } finally {
            // Release client back to the pool and end the pool
            client.release();
            await pool.end();
        }
    } catch (error) {
        // Render error message if failed to connect to database
        console.error('Error connecting to the database:', error);
        res.render('reservations', { title: 'Reservations', message_failure: 'Failed with reservations!', customCss: '/reservations.css', user });
        res.status(500).send('Internal Server Error');
    }
};