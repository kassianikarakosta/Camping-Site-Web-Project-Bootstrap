import express from 'express';
import session from 'express-session';
import { showLogInForm, showSignUpForm, doLogin, doSignUp, doLogout } from '../controller/login-controller.mjs';
import pkg from 'pg';

const { Pool } = pkg;
const router = express.Router();
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

const pool = new Pool();

router.get('/login', showLogInForm);
router.post('/login', doLogin);
router.get('/signup', showSignUpForm);
router.post('/signup', doSignUp);
router.get('/logout', doLogout);

export default router;