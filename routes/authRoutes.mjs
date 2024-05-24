import express from 'express';
import session from 'express-session';
import { showLogInForm, showSignUpForm, doLogin, doSignUp, doLogout } from '../controller/login-controller.mjs';
import pkg from 'pg';

const { Pool } = pkg;
const pool = new Pool();
const router = express.Router();
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// Ensure that the user session is checked for authentication
export function setUser(req, res, next) {
    res.locals.user = req.session.user;
    next();
}

// Redirect to the login page if the user is not authenticated
export let checkAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

router.get('/login', showLogInForm);
router.post('/login', doLogin);
router.get('/signup', showSignUpForm);
router.post('/signup', doSignUp);
router.get('/logout', doLogout);

export default router;