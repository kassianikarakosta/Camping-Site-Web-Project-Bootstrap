const http = require('http');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const querystring = require('querystring');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Patras_Camping_Database',
    password: 'kassiani',
    port: 5432, // Default PostgreSQL port
});

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/html/signup.html') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', () => {
            // const formData = JSON.parse(body);
            const formData = querystring.parse(body);
            // Check if the user already exists
            pool.query('SELECT * FROM users WHERE username = $1', [formData.username], (err, result) => {
                if (err) {
                    console.error('Error executing query', err);
                    res.writeHead(500);
                    res.end('Server Error');
                } else {
                    if (result.rows.length > 0) {
                        // User already exists
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'User already exists' }));
                    } else {
                        // Insert user information into the database
                        const query = `
                            INSERT INTO users (username, user_password, email, last_name, first_name, phone, birth_date, id_number, street_name, street_num, city, post_code, user_type)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                        `;

                        const user_type = "normal_user";
                        const values = [
                            formData.username,
                            formData.password,
                            formData.email,
                            formData.lastname,
                            formData.firstname,
                            formData.phone,
                            formData.birthdate,
                            formData.idnumber,
                            formData.streetname,
                            formData.streetnum,
                            formData.city,
                            formData.postcode,
                            user_type
                        ];
                        pool.query(query, values, (err, result) => {
                            if (err) {
                                console.error('Error executing query', err);
                                res.writeHead(500);
                                res.end('Server Error');
                            } else {
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ message: 'Sign-up successful' }));
                            }
                        });
                    }
                }
            });
        });
    } else {
        // Serve static files
        let filePath = '.' + req.url;

        if (filePath === './') {
            filePath = './html/home.html';
        }

        const extname = path.extname(filePath);
        let contentType = 'text/html';
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
        }

        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    fs.readFile('./404.html', (err, content) => {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    });
                } else {
                    res.writeHead(500);
                    res.end(`Server Error: ${err.code}`);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

const PORT = process.env.PORT || 80;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
