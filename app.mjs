import express from 'express'
const app = express()


import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'))

// //Διαδρομές. Αντί να γράψουμε τις διαδρομές μας εδώ, τις φορτώνουμε από ένα άλλο αρχείο
// import routes from './routes/task-list-routes.mjs'
// //και τώρα χρησιμοποιούμε αυτές τις διαδρομές
// app.use('/', routes);

