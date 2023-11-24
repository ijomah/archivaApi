const express = require('express');

const router = express.Router();

module.exports = function() {
    router.get('/categoryone', (req, res) => {
        res.send('I am categoryone, so what do you want');
    })

    router.post('/categoryone', () => {
        res.send('categoryone created, because I am Post');
    })

    router.patch('/categoryone/:id', () => {
        res.send('I will alter a single field, because I am patch');
    })

    router.delete('/categoryone/:id', () => {
        res.send('field is deleted');
    })
    return router
}