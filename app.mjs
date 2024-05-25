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


const { Pool } = pkg;
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: parseInt(process.env.DB_PORT, 10)
// });

// // *Function to check the user's login
// const requireLogin = (req, res, next) => 
// {
//     if (!req.session.user) 
//     {
//         res.redirect('/login');
//         return;
//     }
//     next();
// };
    

// // *Function to check the user's Admin Login
// const requireLoginAdmin = (req, res, next) => 
// {
//     if (!req.session.user || req.session.user.user_type !== 'admin') 
//     {
//         res.redirect('/login');
//         return;
//     }
//     next();
// };
    
app.use('/', routes);


// // *Define routes, those are the pages
// app.get('/', (req, res) =>
// {
//     if (!req.session.user)
//     {
//         req.session.user = null;
//     }
//     const user = req.session.user;
//     res.render('home', { title: 'Home', customCss: '/home.css', user });
// });

// app.get('/events', (req, res) =>
// {
//     if (!req.session.user)
//     {
//         req.session.user = null;
//     }
//     const user = req.session.user;
//     res.render('events', { title: 'Events', customCss: '/events.css', user });
// });

// app.get('/camping', (req, res) =>
// {
//     if (!req.session.user)
//     {
//         req.session.user = null;
//     }
//     const user = req.session.user;
//     res.render('accomondation', { title: 'Accomondation', customCss: '/accomodation.css', user });
// });

// app.get('/campers', (req, res) =>
// {
//     if (!req.session.user)
//     {
//         req.session.user = null;
//     }
//     const user = req.session.user;
//     res.render('accomondation2', { title: 'Accomondation', customCss: '/accomodation.css', user });
// });

// app.get('/bungallows', (req, res) =>
// {
//     if (!req.session.user)
//     {
//         req.session.user = null;
//     }
//     const user = req.session.user;
//     res.render('accomondation3', { title: 'Bungallows', customCss: '/accomodation.css', user });
// });

// app.get('/bell_tents', (req, res) =>
// {
//     if (!req.session.user)
//     {
//         req.session.user = null;
//     }
//     const user = req.session.user;
//     res.render('accomondation4', { title: 'Bell_tents', customCss: '/accomodation.css', user });
// });

// app.get('/adminbooking',requireLoginAdmin, (req, res) =>
// {
//     if (!req.session.user)
//     {
//         req.session.user = null;
//     }
//     const user = req.session.user;
//     res.render('adminbooking', { title: 'AdminBooking', customCss: '/booking.css', user });
// });

// app.get('/booking',requireLogin, (req, res) =>
// {
//     if (!req.session.user)
//     {
//         req.session.user = null;
//     }
//     const user = req.session.user;
//     res.render('booking', { title: 'Booking', customCss: '/booking.css', user });
// });

// app.get('/contact', (req, res) =>
// {
//     if (!req.session.user)
//     {
//         req.session.user = null;
//     }
//     const user = req.session.user;
//     res.render('contact', { title: 'Contact', customCss: '/contact.css', user });
// });
 
// app.get('/login', (req, res) =>
// {
//     if (!req.session.user)
//     {
//         req.session.user = null;
//     }
//     else
//     {
//         res.redirect('/');
//     }
//     const user = req.session.user;
//     res.render('login', { title: 'Login', customCss: '/sign.css', user });
// });

// app.get('/signup', (req, res) =>
// {
//     if (!req.session.user)
//     {
//         req.session.user = null;
//     }
//     else
//     {
//         res.redirect('/');
//     }
//     const user = req.session.user;
//     res.render('signup', { title: 'Signup', customCss: '/sign.css', user });
// });

// app.get('/profile',requireLogin, (req, res) =>
// {   
//     if (!req.session.user)
//     {
//         req.session.user = null;
//     }
//     const user = req.session.user;
//     res.render('profile', { title: 'Profile', customCss: '/profile.css', user });
// });

// app.get('/services', (req, res) =>
// {
//     if (!req.session.user)
//     {
//         req.session.user = null;
//     }
//     const user = req.session.user;
//     res.render('services', { title: 'Services', user });
// });




// *Sinup form
// *Route handler to handle form submission for signup

// app.post('/signup', async (req, res) => {
//     // *Extract data from the request body
//     const { username, email, password, firstname, lastname, phone, birthdate, idnumber, streetname, streetnum, city, postcode } = req.body;
    
//     const pool = new Pool({
//         user: process.env.DB_USER,
//         host: process.env.DB_HOST,
//         database: process.env.DB_NAME,
//         password: process.env.DB_PASSWORD,
//         port: parseInt(process.env.DB_PORT, 10)
//       });

//     try {
//         // *Hash the password
//         // *Hash the password using bcrypt with a salt of 10 rounds
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // *Create a MySQL connection
//         // const connection = await mysql.createConnection(dbConfig);
//         const client = await pool.connect();

//         try {
//             // *Insert user data into the database with hashed password
//             // const [rows] = await connection.execute('INSERT INTO USERS (username, email, user_password, first_name, last_name, phone, birth_date, id_number, user_type, city, street_name, street_num, post_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [username, email, hashedPassword, firstname, lastname, phone, birthdate, idnumber, 'regular', city, streetname, streetnum, postcode]);
            
//             const user_type = 'user';
            
//             const result = await client.query(
//                 'INSERT INTO USERS (first_name, last_name, username, user_password, email, phone, id_number, birth_date, user_type, city, street_name, street_num, post_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
//                 [firstname, lastname, username, hashedPassword, email, phone, idnumber, birthdate, user_type, city, streetname, streetnum, postcode]
//               );
//             // const user = rows[0];
//             if (result.rowCount > 0)
//             {
//                 res.render('signup', { title: 'Signup', message_success: 'Signup succesfull!', customCss: '/sign.css' });
//             }

//             // if (user > 0)
//             // {
//             //     res.render('signup', { title: 'Signup', message_success: 'Signup succesfull', customCss: '/sign.css' });
//             // }
//             // *If user registration is successful, redirect to login page
//             res.redirect('/login');
//         } catch (error) {
//             // *If an error occurs while saving the user, handle it appropriately
//             console.error('Error saving user:', error);
//             res.render('signup', { title: 'Signup', message_failure: 'Signup failed!', customCss: '/sign.css' });
//             res.status(500).send('Error saving user');
//         } finally {
//             // *Close the database connection
//             client.release();
//             await pool.end();
//         }
//     } catch (error) {
//         console.error('Error hashing password:', error);
//         res.render('signup', { title: 'Signup', message_failure: 'Signup Failed! Contact administrator of the website!', customCss: '/sign.css' });
//         res.status(500).send('Error hashing password');
//     }
// });


// // *Login form
// // *Route handler to handle form submission for login
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     const pool = new Pool({
//         user: process.env.DB_USER,
//         host: process.env.DB_HOST,
//         database: process.env.DB_NAME,
//         password: process.env.DB_PASSWORD,
//         port: parseInt(process.env.DB_PORT, 10)
//       });

//     try {
//         // const connection = await mysql.createConnection(dbConfig);
//             const client = await pool.connect();
//         try {
//             // *Fetch user data from the database based on username
//             // const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
//             const result = await client.query('SELECT * FROM USERS WHERE username = $1', [username]);
//             const user = result.rows[0];


//             // const user = rows[0];

//             if (!user)
//             {
//                 res.render('login', { title: 'Login', message_failure: 'User not found!', customCss: '/sign.css' });
//                 return;
//             }

//             // *Compare the provided password with the hashed password stored in the database
//             // *Assuming 'user_password' is the column name for hashed passwords
//             const passwordMatch = await bcrypt.compare(password, user.user_password);

//             if (!passwordMatch)
//             {
//                 res.render('login', { title: 'Login', message_failure: 'Incorrect Password!', customCss: '/sign.css' });
//                 return;
//             }

//             // *Store user information in session
//             req.session.user = user;

//             // *Redirect to dashboard or any other page
//             res.redirect('/profile');
//         } catch (error)
//         {
//             console.error('Error logging in:', error);
//             res.render('Login', { title: 'Login', message_failure: 'Login failed', customCss: '/sign.css' })
//             res.status(500).send('Internal Server Error');
//         } finally
//         {
//             // *Close the database connection
//             client.release();
//             await pool.end();
//         }
//     } catch (error) {
//         console.error('Error connecting to the database:', error);
//         res.render('Login', { title: 'Login', message_failure: 'Login Failed! Contact administrator of the website!', customCss: '/sign.css' })
//         res.status(500).send('Internal Server Error');
//     }
// });


// // app.post('/booking', async (req, res) => 
// // {
// //     const { checkin, checkout, adults, children, roomtype, roomnum, price, totalprice } = req.body;
// //     const user = req.session.user;
// //     const pool = new Pool({
// //         user: process.env.DB_USER,
// //         host: process.env.DB_HOST,
// //         database: process.env.DB_NAME,
// //         password: process.env.DB_PASSWORD,
// //         port: parseInt(process.env.DB_PORT, 10)
// //       });

// //     try {
// //         const client = await pool.connect();
// //         try {
// //             const result = await client.query(
// //                 'INSERT INTO BOOKINGS (checkin, checkout, adults, children, room_type, room_num, price, total_price, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
// //                 [checkin, checkout, adults, children, roomtype, roomnum, price, totalprice, user.user_id]
// //               );
// //             if (result.rowCount > 0)
// //             {
// //                 res.render('booking', { title: 'Booking', message_success: 'Booking succesfull', customCss: '/booking.css', user });
// //             }
// //             res.redirect('/profile');
// //         } catch (error) {
// //             console.error('Error saving booking:', error);
// //             res.render('booking', { title: 'Booking', message_failure: 'Booking failed', customCss: '/booking.css', user });
// //             res.status(500).send('Error saving booking');
// //         } finally {
// //             client.release();
// //             await pool.end();
// //         }
// //     } catch (error) {
// //         console.error('Error connecting to the database:', error);
// //         res.render('booking', { title: 'Booking', message_failure: 'Booking Failed! Contact administrator of the website!', customCss: '/booking.css', user });
// //         res.status(500).send('Internal Server Error');
// //     }
// // });


// app.post('/profile', async (req, res) =>
// {
//     const {password} = req.body;
    
//     const user = req.session.user;

//     const pool = new Pool({
//         user: process.env.DB_USER,
//         host: process.env.DB_HOST,
//         database: process.env.DB_NAME,
//         password: process.env.DB_PASSWORD,
//         port: parseInt(process.env.DB_PORT, 10)
//       });

//     try
//     {
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const client = await pool.connect();
//         try
//         {
//             const result = await client.query('UPDATE USERS SET user_password = $1 WHERE username = $2',[hashedPassword,user.username]);
//             if (result.rowCount > 0)
//             {
//                 res.render('profile', { title: 'Profile', message_success: 'Password changed!', customCss: '/profile.css', user });
//             }
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             res.render('profile', { title: 'Profile', message_failure: 'Password change failed!', customCss: '/profile.css', user });
//             res.status(500).send('Error updating profile');
//         } finally {
//             client.release();
//             await pool.end();
//         }
//     } catch (error) {
//         console.error('Error connecting to the database:', error);
//         res.render('profile', { title: 'Profile', message_failure: 'Password change Failed! Contact administrator of the website!', customCss: '/profile.css', user });
//         res.status(500).send('Internal Server Error');
//     }
// });


// app.post('/contact', async (req, res) =>
// {
//     const {firstname, lastname, email, subject, message} = req.body;
    
//     const pool = new Pool({
//         user: process.env.DB_USER,
//         host: process.env.DB_HOST,
//         database: process.env.DB_NAME,
//         password: process.env.DB_PASSWORD,
//         port: parseInt(process.env.DB_PORT, 10)
//       });

//     try
//     {
//         const client = await pool.connect();
//         try
//         {
//             const result = await client.query('INSERT INTO email (firstname, lastname, email, mail_subject, mail_message) VALUES ($1, $2, $3, $4, $5)',[firstname, lastname, email, subject, message]);
//             if (result.rowCount > 0)
//             {
//                 res.render('contact', { title: 'Contact', message_success: 'Message sent!', customCss: '/contact.css' });
//             }
//         } catch (error) {
//             console.error('Error sending message:', error);
//             res.render('contact', { title: 'Contact', message_failure: 'Message not sent!', customCss: '/contact.css' });
//             res.status(500).send('Error sending message');
//         } finally {
//             client.release();
//             await pool.end();
//         }
//     } catch (error) {
//         console.error('Error connecting to the database:', error);
//         res.render('contact', { title: 'Contact', message_failure: 'Message not sent! Contact administrator of the website!', customCss: '/contact.css' });
//         res.status(500).send('Internal Server Error');
//     }
// });



// // *Logout
// app.get('/logout', (req, res) =>
// {
//     req.session.destroy();
//     res.redirect('/');
// });

// // *Redirect to 404 page
// app.use((req, res, next) =>
// {
//     res.status(404).redirect('/');
// });

// //*404 page
// app.use((req, res) =>
// {
//     res.status(404).send('404 Page Not Found');
// });

// // *500 page
// app.use((err, req, res, next) =>
// {
//     console.error(err.stack);
//     res.status(500).send('500 Internal Server Error');
// });

// // *Start the server
// app.listen(port, () =>
// {
//     console.log(`Server is running on http://localhost:${port}`);
// });

export { app as CampingPage };