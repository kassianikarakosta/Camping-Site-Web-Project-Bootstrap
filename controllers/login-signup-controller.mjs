// Import required modules
import express from 'express'; // Express framework for web applications
import pkg from 'pg'; // PostgreSQL client
import bcrypt from 'bcrypt'; // Library for hashing passwords
// const router = express.Router(); // Express router for defining routes

// Destructure Pool class from pg package
const { Pool } = pkg;

// Controller function for user signup
export let doSignUp = async (req, res) => {
    // Extract data from the request body
    const { username, email, password, firstname, lastname, phone, birthdate, idnumber, streetname, streetnum, city, postcode } = req.body;

    // Create a PostgreSQL pool with connection details
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL, // Connection string for PostgreSQL database
        ssl: {
            rejectUnauthorized: false // Option to disable SSL certificate validation
        }
    });

    try {
        // Hash the password using bcrypt with a salt of 10 rounds
        const hashedPassword = await bcrypt.hash(password, 10);

        const client = await pool.connect();

        try {
            // Check if user already exists
            const checkUserQuery = 'SELECT * FROM USERS WHERE username = $1 OR email = $2 OR id_number = $3';
            const checkUserResult = await client.query(checkUserQuery, [username, email, idnumber]);

            if (checkUserResult.rows.length > 0) {
                res.render('signup', { title: 'Signup', message_failure: 'Username or email or ID number already exists!', customCss: '/sign.css' });
                return;
            }

            // Insert user data into the database with hashed password
            const user_type = 'user';
            const insertUserQuery = 'INSERT INTO USERS (first_name, last_name, username, user_password, email, phone, id_number, birth_date, user_type, city, street_name, street_num, post_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
            const result = await client.query(insertUserQuery, [firstname, lastname, username, hashedPassword, email, phone, idnumber, birthdate, user_type, city, streetname, streetnum, postcode]);

            if (result.rowCount > 0) {
                res.render('signup', { title: 'Signup', message_success: 'Signup successful!', customCss: '/sign.css' });
            } else {
                res.render('signup', { title: 'Signup', message_failure: 'Signup failed!', customCss: '/sign.css' });
            }

            // Redirect to login page if successful
            res.redirect('/login');
        } catch (error) {
            // Handle error while saving the user
            console.error('Error saving user:', error);
            res.render('signup', { title: 'Signup', message_failure: 'Signup failed!', customCss: '/sign.css' });
            res.status(500).send('Error saving user');
        } finally {
            // Close the database connection
            client.release();
            await pool.end();
        }
    } catch (error) {
        console.error('Error hashing password:', error);
        res.render('signup', { title: 'Signup', message_failure: 'Signup Failed! Contact administrator of the website!', customCss: '/sign.css' });
        res.status(500).send('Error hashing password');
    }
};

// Controller function for user login
export let doLogin = async (req, res) => {
    const { username, password } = req.body;

    // Create a PostgreSQL pool with connection details
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL, // Connection string for PostgreSQL database
        ssl: {
            rejectUnauthorized: false // Option to disable SSL certificate validation
        }
    });

    try {
        const client = await pool.connect();
        try {
            // Fetch user data from the database based on username
            const result = await client.query('SELECT * FROM USERS WHERE username = $1', [username]);
            const user = result.rows[0];

            if (!user) {
                res.render('login', { title: 'Login', message_failure: 'User not found!', customCss: '/sign.css' });
                return;
            }

            // Compare the provided password with the hashed password stored in the database
            const passwordMatch = await bcrypt.compare(password, user.user_password);

            if (!passwordMatch) {
                res.render('login', { title: 'Login', message_failure: 'Incorrect Password!', customCss: '/sign.css' });
                return;
            }

            // Store user information in session
            req.session.user = user;

            // Redirect to dashboard or any other page
            res.redirect('/profile');
        } catch (error) {
            console.error('Error logging in:', error);
            res.render('Login', { title: 'Login', message_failure: 'Login failed', customCss: '/sign.css' })
            res.status(500).send('Internal Server Error');
        } finally {
            // Close the database connection
            client.release();
            await pool.end();
        }
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.render('Login', { title: 'Login', message_failure: 'Login Failed! Contact administrator of the website!', customCss: '/sign.css' })
        res.status(500).send('Internal Server Error');
    }
};

// Controller function for updating user profile
export let updateProfile = async (req, res) => {
    const { password } = req.body;
    const user = req.session.user;

    // Create a PostgreSQL pool with connection details
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL, // Connection string for PostgreSQL database
        ssl: {
            rejectUnauthorized: false // Option to disable SSL certificate validation
        }
    });

    try {
        // Hash the new password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const client = await pool.connect();
        try {
            // Update user password in the database
            const result = await client.query('UPDATE USERS SET user_password = $1 WHERE username = $2', [hashedPassword, user.username]);
            if (result.rowCount > 0) {
                res.render('profile', { title: 'Profile', message_success: 'Password changed!', customCss: '/profile.css', user });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            res.render('profile', { title: 'Profile', message_failure: 'Password change failed!', customCss: '/profile.css', user });
            res.status(500).send('Error updating profile');
        } finally {
            client.release();
            await pool.end();
        }
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.render('profile', { title: 'Profile', message_failure: 'Password change Failed! Contact administrator of the website!', customCss: '/profile.css', user });
        res.status(500).send('Internal Server Error');
    }
};