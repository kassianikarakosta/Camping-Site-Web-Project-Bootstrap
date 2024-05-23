import express from 'express';
const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' , customCss: '/home.css' });
});

// Add more routes here as needed
router.get('/auth/login', (req, res) => {
  res.render('login', { title: 'Login',  customCss: "/sign.css" });
});

// Add more routes here as needed
router.get('/auth/signup', (req, res) => {
  res.render('signup', { title: 'signup',  customCss: "/sign.css" });
});

// // Add more routes here as needed
router.get('/profile', (req, res) => {
  res.render('profile', { title: 'profile',  customCss: "/profile.css" });
});

// // Add more routes here as needed
router.get('/services', (req, res) => {
  res.render('services', { title: 'services',  customCss: "/services.css" });
});

// // Add more routes here as needed
router.get('/events', (req, res) => {
  res.render('events', { title: 'events',  customCss: "/events.css" });
});

// // Add more routes here as needed
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'contact',  customCss: "/contact.css" });
});

// // Add more routes here as needed
router.get('/booking', (req, res) => {
  res.render('booking', { title: 'booking',  customCss: "/booking.css" });
});

// // Add more routes here as needed
// router.get('/accomondation', (req, res) => {
//   res.render('accomondation', { title: 'Accomondation',  customCss: "/accomondation.css" });
// });

// // Add more routes here as needed
router.get('/camping', (req, res) => {
  res.render('accomondation', { title: 'Camping',  customCss: "/accomondation.css" });
});

// // Add more routes here as needed
router.get('/campers', (req, res) => {
  res.render('accomondation2', { title: 'Campers',  customCss: "/accomondation.css" });
});

// // Add more routes here as needed
router.get('/bungallows', (req, res) => {
  res.render('accomondation3', { title: 'Bungallows',  customCss: "/accomondation.css" });
});

// // Add more routes here as needed
router.get('/bell_tents', (req, res) => {
  res.render('accomondation4', { title: 'Bell Tents',  customCss: "/accomondation.css" });
});

// // Add more routes here as needed
router.get('/adminbooking', (req, res) => {
  res.render('adminbooking', { title: 'Admin Booking',  customCss: "/booking.css" });
});



export default router;