const express = require('express');
const fs = require('fs');
const multer = require('multer');
const upload = multer();
const db = require('../dbconfig/configDb');

const router = express.Router();


    router.get('/', (req, res) => {
       // console.log(req)
        res.send('I am the James');
    })

    router.get('/:id', (req, res) => {
        res.send('I am the James with id 2');
    })

    router.post('/', upload.none(), (req, res) => {
        let applicantDet = req.body;
        console.log(applicantDet);
        res.send('I am the James post');
    })

    router.patch('/:id', (req, res) => {
        res.send('I am the James patch id');
    })

    router.delete('/:id', (req, res) => {
        res.send('I am the James delete id');
    })

    module.exports = router
