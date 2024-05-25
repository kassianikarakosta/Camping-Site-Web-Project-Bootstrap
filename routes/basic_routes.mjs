import express from 'express';
import pkg from 'pg';
// import bcrypt from 'bcrypt';
import { doSignUp, doLogin, updateProfile, sendEmail, showEmails } from '../controllers/login-signup-controller.mjs';
const router = express.Router();
const { Pool } = pkg;

// *Function to check the user's login
const requireLogin = (req, res, next) => 
{
    if (!req.session.user) 
    {
        res.redirect('/login');
        return;
    }
    next();
};
        
    
    // *Function to check the user's Admin Login
const requireLoginAdmin = (req, res, next) => 
{
    if (!req.session.user || req.session.user.user_type !== 'admin') 
    {
        res.redirect('/login');
        return;
    }
    next();
};

// *Define routes, those are the pages
router.get('/', (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    res.render('home', { title: 'Home', customCss: '/home.css', user });
});

router.get('/events', (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    res.render('events', { title: 'Events', customCss: '/events.css', user });
});

router.get('/camping', (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    res.render('accomodation', { title: 'Camping', customCss: '/accomodation.css', user });
});

router.get('/campers', (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    res.render('accomodation2', { title: 'Campers', customCss: '/accomodation.css', user });
});

router.get('/bungallows', (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    res.render('accomodation3', { title: 'Bungallows', customCss: '/accomodation.css', user });
});

router.get('/bell_tents', (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    res.render('accomodation4', { title: 'Bell_tents', customCss: '/accomodation.css', user });
});

router.get('/adminbooking',requireLoginAdmin, (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    res.render('adminbooking', { title: 'AdminBooking', customCss: '/booking.css', user });
});

router.get('/emails',showEmails, (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    
    res.render('emails', { title: 'Emails', customCss: '/emails.css', user });
});

router.get('/booking',requireLogin, (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    res.render('booking', { title: 'Booking', customCss: '/booking.css', user });
});

router.get('/contact', (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    res.render('contact', { title: 'Contact', customCss: '/contact.css', user });
});
    
router.get('/login', (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    else
    {
        res.redirect('/');
    }
    const user = req.session.user;
    res.render('login', { title: 'Login', customCss: '/sign.css', user });
});

router.get('/signup', (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    else
    {
        res.redirect('/');
    }
    const user = req.session.user;
    res.render('signup', { title: 'Signup', customCss: '/sign.css', user });
});

router.get('/profile',requireLogin, (req, res) =>
{   
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    res.render('profile', { title: 'Profile', customCss: '/profile.css', user });
});

router.get('/services', (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    res.render('services', { title: 'Services', user });
});

router.post('/signup', doSignUp);
router.post('/profile', updateProfile);
router.post('/login', doLogin);
router.post('/contact', sendEmail);
// router.get('/emails', showEmails);




// *Logout
router.get('/logout', (req, res) =>
{
    req.session.destroy();
    res.redirect('/');
});

// *Redirect to 404 page
router.use((req, res, next) =>
{
    res.status(404).redirect('/');
});

//*404 page
router.use((req, res) =>
{
    res.status(404).send('404 Page Not Found');
});

// *500 page
router.use((err, req, res, next) =>
{
    console.error(err.stack);
    res.status(500).send('500 Internal Server Error');
});

export default router;
