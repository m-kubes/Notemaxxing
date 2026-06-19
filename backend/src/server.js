const express = require('express');
const cors = require("cors");

const notesRouter = require('./routes/notesRouter');
const badRequestHandler = require('./middleware/badRequestHandler');
const rateLimiter = require('./middleware/rateLimiter');
const {connectDB} = require('../src/config/db');

const app = express();

// middleware
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(rateLimiter)
app.use(badRequestHandler);

// routes
app.use('/api/notes', notesRouter);

// connect to mongoDB and then start listening
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Server started on PORT: ' + process.env.PORT)
    })
})