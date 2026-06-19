const express = require('express');
const cors = require("cors");
const path = require('path')

const notesRouter = require('./routes/notesRouter');
const badRequestHandler = require('./middleware/badRequestHandler');
const rateLimiter = require('./middleware/rateLimiter');
const {connectDB} = require('../src/config/db');

const app = express();
const __localDirname = path.resolve("../frontend/dist")


// use cors in development build because we're on 2 different ports
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: 'http://localhost:5173'
    }));
}


// other middleware
app.use(express.json());
app.use(rateLimiter)
app.use(badRequestHandler);

// routes
app.use('/api/notes', notesRouter);

// serve index.html in production build
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__localDirname)))

    app.get("*path", (req, res) => {
        console.log(__localDirname)
        res.sendFile(path.join(__localDirname, 'index.html'));
    })
}

// connect to mongoDB and then start listening
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Server started on PORT: ' + process.env.PORT)
    })
})