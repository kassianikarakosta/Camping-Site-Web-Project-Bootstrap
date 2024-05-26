import express from 'express';
import pkg from 'pg';
// import bcrypt from 'bcrypt';
// const router = express.Router();
const { Pool } = pkg;

export let sendEmail = async (req, res) =>
{
    const {firstname, lastname, email, subject, message} = req.body;
    
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT, 10)
        });

    try
    {
        const client = await pool.connect();
        try
        {
            const result = await client.query('INSERT INTO email (firstname, lastname, email, mail_subject, mail_message) VALUES ($1, $2, $3, $4, $5)',[firstname, lastname, email, subject, message]);
            if (result.rowCount > 0)
            {
                res.render('contact', { title: 'Contact', message_success: 'Message sent!', customCss: '/contact.css' });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            res.render('contact', { title: 'Contact', message_failure: 'Message not sent!', customCss: '/contact.css' });
            res.status(500).send('Error sending message');
        } finally {
            client.release();
            await pool.end();
        }
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.render('contact', { title: 'Contact', message_failure: 'Message not sent! Contact administrator of the website!', customCss: '/contact.css' });
        res.status(500).send('Internal Server Error');
    }

    res.redirect('/contact');
};


export let showEmails = async (req, res) =>
{
    if (!req.session.user || req.session.user.user_type !== 'admin') 
    {
        res.redirect('/login');
        return;
    }
    const user = req.session.user;

    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT, 10)
        });

    try
    {
        const client = await pool.connect();
        try
        {
            const result = await client.query('SELECT * FROM email ORDER BY senderid DESC');
            // console.log(result.rows);
            if (result.rowCount > 0)
            {
                res.render('emails', { title: 'Emails', message_success: 'Emails Shown!', customCss: '/emails.css', emails: result.rows, user });
            }
            else
            {
                res.render('emails', { title: 'Emails', message_failure: 'No emails found!', customCss: '/emails.css', user });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            res.render('emails', { title: 'Emails', message_failure: 'Failed showing emails!', customCss: '/emails.css', user });
            res.status(500).send('Error sending message');
        } finally {
            client.release();
            await pool.end();
        }
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.render('emails', { title: 'Emails', message_failure: 'Failed with emails! Contact administrator of the website!', customCss: '/emails.css', user });
        res.status(500).send('Internal Server Error');
    }
};
