import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
    // console.log('loading .env');
    dotenv.config();
}

import { CampingPage } from './app.mjs';

const port = process.env.PORT || '3000';

const server = CampingPage.listen(port, () => 
{
    console.log(`Server is running on port:${port}`);
});
    
// process.on('SIGTERM', () => {
// console.info('SIGTERM signal received.');
// console.log('Closing http server.');
// server.close(() => {
//     console.log('Http server closed.');
// });