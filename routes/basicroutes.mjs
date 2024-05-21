import express from 'express';
const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' ,customCss: '/home.css', message: 'Welcome to the Home Page!' });
});

// Add more routes here as needed
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login',  style: "sign.css",message: 'Learn more about us on this page.' });
});

// Add more routes here as needed
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'signup',  style: "sign.css",message: 'Learn more about us on this page.' });
});

// // Add more routes here as needed
// router.get('/login', (req, res) => {
//   res.render('login', { title: 'Login',  style: "login.css",message: 'Learn more about us on this page.' });
// });

export default router;