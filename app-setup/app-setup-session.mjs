// app-setup-session.mjs
import session from 'express-session';
import 'dotenv/config';

const sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: parseInt(process.env.SESSION_LIFETIME, 10) // Session lifetime in milliseconds
    }
});

// Authentication middleware
const authenticateUser = (req, res, next) => {
    if (req.session && req.session.loggedUserId) {
        console.log('User is authenticated');
        next();
    } else {
        console.log('User is not authenticated');
        res.redirect('/login');
    }
};

export { sessionConfig, authenticateUser };
