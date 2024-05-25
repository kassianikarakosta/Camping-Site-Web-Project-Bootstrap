import express from 'express';
import pkg from 'pg';
import bcrypt from 'bcrypt';
// const router = express.Router();
const { Pool } = pkg;

export let doSignUp = async (req, res) => {
    // *Extract data from the request body
    const { username, email, password, firstname, lastname, phone, birthdate, idnumber, streetname, streetnum, city, postcode } = req.body;
    
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT, 10)
      });

    try {
        // *Hash the password
        // *Hash the password using bcrypt with a salt of 10 rounds
        const hashedPassword = await bcrypt.hash(password, 10);

        // *Create a MySQL connection
        // const connection = await mysql.createConnection(dbConfig);
        const client = await pool.connect();

        try {
            // *Insert user data into the database with hashed password
            // const [rows] = await connection.execute('INSERT INTO USERS (username, email, user_password, first_name, last_name, phone, birth_date, id_number, user_type, city, street_name, street_num, post_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [username, email, hashedPassword, firstname, lastname, phone, birthdate, idnumber, 'regular', city, streetname, streetnum, postcode]);
            
            const user_type = 'user';
            
            const result = await client.query(
                'INSERT INTO USERS (first_name, last_name, username, user_password, email, phone, id_number, birth_date, user_type, city, street_name, street_num, post_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
                [firstname, lastname, username, hashedPassword, email, phone, idnumber, birthdate, user_type, city, streetname, streetnum, postcode]
              );
            // const user = rows[0];
            if (result.rowCount > 0)
            {
                res.render('signup', { title: 'Signup', message_success: 'Signup succesfull!', customCss: '/sign.css' });
            }

            // if (user > 0)
            // {
            //     res.render('signup', { title: 'Signup', message_success: 'Signup succesfull', customCss: '/sign.css' });
            // }
            // *If user registration is successful, redirect to login page
            res.redirect('/login');
        } catch (error) {
            // *If an error occurs while saving the user, handle it routerropriately
            console.error('Error saving user:', error);
            res.render('signup', { title: 'Signup', message_failure: 'Signup failed!', customCss: '/sign.css' });
            res.status(500).send('Error saving user');
        } finally {
            // *Close the database connection
            client.release();
            await pool.end();
        }
    } catch (error) {
        console.error('Error hashing password:', error);
        res.render('signup', { title: 'Signup', message_failure: 'Signup Failed! Contact administrator of the website!', customCss: '/sign.css' });
        res.status(500).send('Error hashing password');
    }
};


// *Login form
// *Route handler to handle form submission for login
export let doLogin = async (req, res) => {
    const { username, password } = req.body;

    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT, 10)
      });

    try {
        // const connection = await mysql.createConnection(dbConfig);
            const client = await pool.connect();
        try {
            // *Fetch user data from the database based on username
            // const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
            const result = await client.query('SELECT * FROM USERS WHERE username = $1', [username]);
            const user = result.rows[0];


            // const user = rows[0];

            if (!user)
            {
                res.render('login', { title: 'Login', message_failure: 'User not found!', customCss: '/sign.css' });
                return;
            }

            // *Compare the provided password with the hashed password stored in the database
            // *Assuming 'user_password' is the column name for hashed passwords
            const passwordMatch = await bcrypt.compare(password, user.user_password);

            if (!passwordMatch)
            {
                res.render('login', { title: 'Login', message_failure: 'Incorrect Password!', customCss: '/sign.css' });
                return;
            }

            // *Store user information in session
            req.session.user = user;

            // *Redirect to dashboard or any other page
            res.redirect('/profile');
        } catch (error)
        {
            console.error('Error logging in:', error);
            res.render('Login', { title: 'Login', message_failure: 'Login failed', customCss: '/sign.css' })
            res.status(500).send('Internal Server Error');
        } finally
        {
            // *Close the database connection
            client.release();
            await pool.end();
        }
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.render('Login', { title: 'Login', message_failure: 'Login Failed! Contact administrator of the website!', customCss: '/sign.css' })
        res.status(500).send('Internal Server Error');
    }
};




export let updateProfile = async (req, res) =>
{
    const {password} = req.body;
    
    const user = req.session.user;

    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT, 10)
      });

    try
    {
        const hashedPassword = await bcrypt.hash(password, 10);

        const client = await pool.connect();
        try
        {
            const result = await client.query('UPDATE USERS SET user_password = $1 WHERE username = $2',[hashedPassword,user.username]);
            if (result.rowCount > 0)
            {
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


export let sendEmail = async (req, res) =>
{
    const {firstname, lastname, email, subject, message} = req.body;
    
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT, 10)
      });

    try
    {
        const client = await pool.connect();
        try
        {
            const result = await client.query('INSERT INTO email (firstname, lastname, email, mail_subject, mail_message) VALUES ($1, $2, $3, $4, $5)',[firstname, lastname, email, subject, message]);
            if (result.rowCount > 0)
            {
                res.render('contact', { title: 'Contact', message_success: 'Message sent!', customCss: '/contact.css' });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            res.render('contact', { title: 'Contact', message_failure: 'Message not sent!', customCss: '/contact.css' });
            res.status(500).send('Error sending message');
        } finally {
            client.release();
            await pool.end();
        }
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.render('contact', { title: 'Contact', message_failure: 'Message not sent! Contact administrator of the website!', customCss: '/contact.css' });
        res.status(500).send('Internal Server Error');
    }
};


