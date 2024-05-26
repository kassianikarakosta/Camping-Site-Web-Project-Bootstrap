import express from 'express';
import pkg from 'pg';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
// import bcrypt from 'bcrypt';
// const router = express.Router();
import { fileURLToPath } from 'url';

const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const eventDir = path.join(__dirname, '../public/event_images', req.body.title);
        fs.mkdirSync(eventDir, { recursive: true });
        cb(null, eventDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

export let addEvent = async (req, res) =>
{
    if (!req.session.user || req.session.user.user_type !== 'admin') 
    {
        res.redirect('/login');
        return;
    }
    const user = req.session.user;

    const { title, description, event_date, event_time, event_duration } = req.body;
    const image_url = path.join('event_images', title, req.file.originalname);

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
            const result = await client.query(
                'INSERT INTO events (title, description, event_date, event_time, event_duration, image_url) VALUES ($1, $2, $3, $4, $5, $6)',
                [title, description, event_date, event_time, event_duration, image_url]
            );

            if (result.rowCount > 0)
            {
                res.render('addevent', { title: 'Add Event', message_success: 'Event added successfully!', customCss: '/addevent.css' });
            }
        }
        catch (error)
        {
            console.error('Error adding event:', error);
            res.render('addevent', { title: 'Add Event', message_failure: 'Failed to add event!', customCss: '/addevent.css' });
            res.status(500).send('Error adding event');
        } 
        finally
        {
            client.release();
            await pool.end();
        }
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.render('addevent', { title: 'Add Event', message_failure: 'Failed to add event! Contact administrator of the website!', customCss: '/addevent.css' });
        res.status(500).send('Internal Server Error');
    };

    res.redirect('/addevent');
};


export let showEvent = async (req, res) =>
{
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
            const result = await client.query('SELECT * FROM events ORDER BY eventid DESC');
            // console.log(result.rows);
            if (result.rowCount > 0)
            {
                res.render('events', { title: 'Events', customCss: '/events.css', events: result.rows, user });
            }
            else
            {
                res.render('events', { title: 'Events', message_failure: 'No events found!', customCss: '/events.css', user });
            }
        } catch (error) {
            console.error('Error showing events:', error);
            res.render('events', { title: 'Events', message_failure: 'Failed showing events!', customCss: '/events.css', user });
            res.status(500).send('Error showing events:');
        } finally {
            client.release();
            await pool.end();
        }
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.render('events', { title: 'Events', message_failure: 'Failed with events! Contact administrator of the website!', customCss: '/events.css', user });
        res.status(500).send('Internal Server Error');
    }
};


export { upload };