const express = require('express');

const router = express.Router();

    router.get('/', (req, res) => {
        res.send('I am signing you in, so what do you want');
    })

    router.post('/', (req, res) => {
        res.send('Signin created, because I am Post');
    })

    router.patch('/:id', (req, res) => {
        res.send('I will alter a sign in field, because I am patch');
    })

    router.delete('/:id', (req, res) => {
        res.send('signin is deleted');
    })

module.exports = router