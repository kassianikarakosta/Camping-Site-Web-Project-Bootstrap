import express from 'express';
import session from 'express-session';
import { getAllTasks } from '../model/sqlite-async/task-list-model-sqlite-async.mjs';

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV, maxAge: process.env.SESSION_LIFETIME}
}));

// Authentication middleware
const authenticateUser = (req, res, next) => {
    if (req.session && req.session.loggedUserId) {
        // User is authenticated
        console.log('User is authenticated');
        next();
    } else {
        // User is not authenticated, redirect to login page
        console.log('User is not authenticated');
        res.redirect('/login');
        // console.log('User is not authenticated 2');

    }
};