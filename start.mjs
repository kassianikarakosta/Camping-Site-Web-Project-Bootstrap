// Import dotenv module to load environment variables from a .env file
import dotenv from 'dotenv';

// Load environment variables from .env file if not in production environment
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// Import the CampingPage app from app.mjs file
import { CampingPage } from './app.mjs';

// Define the port to listen on, using the PORT environment variable or defaulting to 3000
const port = process.env.PORT || '3000';

// Start the server and listen on the specified port
const server = CampingPage.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});

// Uncomment the following block to handle SIGTERM signal and gracefully shut down the server
// process.on('SIGTERM', () => {
//     console.info('SIGTERM signal received.');
//     console.log('Closing http server.');
//     server.close(() => {
//         console.log('Http server closed.');
//     });
// });