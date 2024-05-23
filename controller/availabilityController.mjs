import pkg from 'pg';
import 'dotenv/config';

const { Pool } = pkg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10)
});

export const checkAvailability = async (req, res) => {
    try {
        const { arrivalDate, departureDate } = req.body;

        const queryText = `
            SELECT p.subtype,
                   COUNT(p.placeID) AS available_places
            FROM place p
            LEFT JOIN reservation r ON p.placeID = r.placeID
                AND (r.arrival_date <= $1 AND r.depart_date >= $2)
                OR (r.arrival_date <= $2 AND r.depart_date >= $1)
            GROUP BY p.subtype;
        `;

        const result = await query(queryText, [arrivalDate, departureDate]);

        res.json(result.rows);
    } catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};