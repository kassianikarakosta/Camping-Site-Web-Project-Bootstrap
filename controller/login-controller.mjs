// login-controller.mjs
import bcrypt from 'bcrypt';
import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10)
});

export let showLogInForm = (req, res) => {
    res.render('login');
};

export let showSignUpForm = (req, res) => {
    res.render('signup');
};

export let doSignUp = async (req, res) => {
    try {
        const { firstname, lastname, username, password, email, phone, idnumber, birthdate, city, streetname, streetnum, postcode } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user_type = 'user'; // Default user type

        await pool.query(
            'INSERT INTO USERS (first_name, last_name, username, user_password, email, phone, id_number, birth_date, user_type, city, street_name, street_num, post_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
            [firstname, lastname, username, hashedPassword, email, phone, idnumber, birthdate, user_type, city, streetname, streetnum, postcode]
        );
        
        res.redirect('/login');
    } catch (error) {
        console.error('Registration error:', error);
        res.render('signup', { message: 'Registration failed. Please try again.' });
    }
};

export let doLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await pool.query('SELECT * FROM USERS WHERE username = $1', [username]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const match = await bcrypt.compare(password, user.user_password);

            if (match) {
                req.session.loggedUserId = user.userid;
                res.redirect('/');
            } else {
                res.render('login', { message: 'Incorrect password' });
            }
        } else {
            res.render('login', { message: 'User not found' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', { message: 'Login failed. Please try again.' });
    }
};

export let doLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

export let checkAuthenticated = (req, res, next) => {
    if (req.session.loggedUserId) {
        next();
    } else {
        res.redirect('/login');
    }
};
