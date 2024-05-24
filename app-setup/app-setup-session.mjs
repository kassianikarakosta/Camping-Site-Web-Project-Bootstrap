
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

// Middleware to set user data in res.locals
const setUser = (req, res, next) => {
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
    } else {
        res.locals.user = null;
    }
    next();
};


// Authentication middleware
const authenticateUser = (req, res, next) => {
    if (req.session && req.session.loggedUserId) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

export { sessionConfig, setUser, authenticateUser };
