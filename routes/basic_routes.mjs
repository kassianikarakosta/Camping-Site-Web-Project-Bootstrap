import express from 'express';
import pkg from 'pg';
// import bcrypt from 'bcrypt';
import { doSignUp, doLogin, updateProfile } from '../controllers/login-signup-controller.mjs';
import { sendEmail, showEmails } from '../controllers/email-controller.mjs';
import { showReservations } from '../controllers/reservations-controller.mjs';
import { showEvent, addEvent, upload } from '../controllers/add-event-controllers.mjs';
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

router.get('/events',showEvent, (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    res.render('events', { title: 'Events', customCss: '/events.css', user });
});

router.get('/addevent',requireLoginAdmin, (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    res.render('addevent', { title: 'addevent', customCss: '/addevent.css', user });
});

router.get('/accommodation', (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    res.render('accommodation', { title: 'Accommodation', customCss: '/accommodation.css', user });
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

router.get('/reservations',showReservations, (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    
    res.render('reservations', { title: 'Reservations', customCss: '/reservations.css', user });
});

router.get('/booking',requireLogin, (req, res) =>
{
    if (!req.session.user)
    {
        req.session.user = null;
    }
    const user = req.session.user;
    res.render('booking', { title: 'Booking', customCss: '/booking.css' , customJs: '/js/calculate.js', user });
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


router.post('/signup', doSignUp);
router.post('/profile', updateProfile);
router.post('/login', doLogin);
router.post('/contact', sendEmail);
// router.post('/addevent', addEvent);
// router.get('/emails', showEmails);
router.post('/addevent', upload.single('image_url'), addEvent);



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
