import express from 'express';
import session from 'express-session';
import { showLogInForm, showSignUpForm, doLogin, doSignUp, doLogout } from '../controller/login-controller.mjs';
import pkg from 'pg';

const { Pool } = pkg;
const router = express.Router();
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

const pool = new Pool();


// Login route
router.post('/login', async (req, res) => {
  const { username, user_password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM USERS WHERE username = $1', [username]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      if (user.user_password === user_password) { // Comparing plaintext passwords
        req.session.loggedUserId = user.userid;
        res.redirect('/profile'); // Redirect to profile page
      } else {
        res.redirect('/login'); // Redirect back to login on error
      }
    } else {
      res.redirect('/login'); // Redirect back to login on error
    }
  } catch (err) {
    console.error(err);
    res.redirect('/login'); // Redirect back to login on error
  }
});

router.get('/login', showLogInForm);
router.post('/login', doLogin);
router.get('/signup', showSignUpForm);
router.post('/signup', doSignUp);
router.get('/logout', doLogout);

export default router;


// import express from 'express';
// import bcrypt from 'bcrypt';

// import session from 'express-session';
// import { showLogInForm, showSignUpForm, doLogin, doSignUp, doLogout } from '../controller/login-controller.mjs';
// import pkg from 'pg';

// const { Pool } = pkg;
// const router = express.Router();
// const pool = new Pool();

// // Signup route
// router.post('/signup', async (req, res) => {
//   const {
//     firstname, lastname, username, user_password, email, phone, idnumber,
//     birthdate, city, streetname, streetnum, postcode
//   } = req.body;

//   const user_type = 'user'; // Default user type

//   try {
//     const hashedPassword = await bcrypt.hash(user_password, 10);
//     const result = await pool.query(
//       `INSERT INTO USERS (
//         first_name, last_name, username, user_password, email, phone,
//         id_number, birth_date, user_type, city, street_name, street_num, post_code
//       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
//       RETURNING userID`, [
//         firstname, lastname, username, hashedPassword, email, phone,
//         idnumber, birthdate, user_type, city, streetname, streetnum, postcode
//       ]);

//     req.session.loggedUserId = result.rows[0].userid;
//     res.redirect('/profile'); // Redirect to home page or dashboard
//   } catch (err) {
//     console.error(err);
//     res.redirect('/signup'); // Redirect back to signup on error
//   }
// });

// // Login route
// router.post('/login', async (req, res) => {
//   const { username, user_password } = req.body;

//   try {
//     const result = await pool.query('SELECT * FROM USERS WHERE username = $1', [username]);

//     if (result.rows.length > 0) {
//       const user = result.rows[0];
//       const isMatch = await bcrypt.compare(user_password, user.user_password);

//       if (isMatch) {
//         req.session.loggedUserId = user.userid;
//         res.redirect('/profile'); // Redirect to profile page
//       } else {
//         res.redirect('/login'); // Redirect back to login on error
//       }
//     } else {
//       res.redirect('/login'); // Redirect back to login on error
//     }
//   } catch (err) {
//     console.error(err);
//     res.redirect('/login'); // Redirect back to login on error
//   }
// });

// router.get('/login', showLogInForm);
// router.post('/login', doLogin);
// router.get('/signup', showSignUpForm);
// router.post('/signup', doSignUp);
// router.get('/logout', doLogout);


// export default router;
