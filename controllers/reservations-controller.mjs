import express from 'express';
import pkg from 'pg';
// import bcrypt from 'bcrypt';
// const router = express.Router();
const { Pool } = pkg;

export let showReservations = async (req, res) =>
    {
        if (!req.session.user || req.session.user.user_type !== 'admin') 
        {
            res.redirect('/login');
            return;
        }
        const user = req.session.user;
    
        // const pool = new Pool({
        //     user: process.env.DB_USER,
        //     host: process.env.DB_HOST,
        //     database: process.env.DB_NAME,
        //     password: process.env.DB_PASSWORD,
        //     port: parseInt(process.env.DB_PORT, 10)
        //     });

        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
              rejectUnauthorized: false
            }
        });
    
        try
        {
            const client = await pool.connect();
            try
            {
                const result = await client.query('SELECT users.first_name, users.last_name, users.email, users.phone, users.id_number, place.place_type, place.category_type, reservation.arrival_date, reservation.depart_date, reservation.final_price FROM users, reservation, place WHERE reservation.placeid = place.placeid AND reservation.userid = users.userid ORDER BY reservID DESC;');
                if (result.rowCount > 0)
                {
                    res.render('reservations', { title: 'Reservations', message_success: 'Reservations Shown!', customCss: '/reservations.css', reservations: result.rows, user });
                }
                else
                {
                    res.render('reservations', { title: 'Reservations', message_failure: 'No reservations found!', customCss: '/reservations.css', user });
                }
            } catch (error) {
                console.error('Error sending message:', error);
                res.render('reservations', { title: 'Reservations', message_failure: 'Failed showing reservations!', customCss: '/reservations.css', user });
                res.status(500).send('Error sending message');
            } finally {
                client.release();
                await pool.end();
            }
        } catch (error) {
            console.error('Error connecting to the database:', error);
            res.render('reservations', { title: 'Reservations', message_failure: 'Failed with reservations!', customCss: '/reservations.css', user });
            res.status(500).send('Internal Server Error');
        }
    };