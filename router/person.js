const express = require('express');

const router = express.Router();

module.exports = function () {
    router.get('/persons', (req, res) => {
       // console.log(req)
        res.send('I am the James');
    })

    router.get('/persons/:id', (req, res) => {
        res.send('I am the James with id 2');
    })

    router.post('/persons', (req, res) => {
        res.send('I am the James post');
    })

    router.patch('/persons/:id', (req, res) => {
        res.send('I am the James patch id');
    })

    router.delete('/persons/:id', (req, res) => {
        res.send('I am the James delete id');
    })

    return router
}