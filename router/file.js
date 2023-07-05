const express = require('express');

const router = express.Router();

module.exports = function() {
    router.get('/filenumbers', (req, res) => {
        res.send('I am filenumbers, so what do you want');
    })

    router.post('/filenumbers', () => {
        res.send('filenumbers created, because I am Post');
    })

    router.patch('/filenumbers/:id', () => {
        res.send('I will alter a single field, because I am patch');
    })

    router.delete('/filenumbers/:id', () => {
        res.send('field is deleted');
    })
    return router
}