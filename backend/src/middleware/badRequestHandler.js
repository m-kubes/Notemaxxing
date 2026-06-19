const express = require('express');

// malformed json request handler
// sends a 400 instead of showing user the error message
const badRequestHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).send({ message: 'Malformed request body' }); // Bad request
    }
    next();
}


module.exports = badRequestHandler