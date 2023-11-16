const express = require('express');
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const router = express.Router();

    
    router.get('/', (req, res) => {
        res.send('I am file, so what do you want');
    })

    router.post('/', (req, res) => {
        // console.log(req.ip);
        res.send('file created, because I am Post');
    })
//2 samples from expo docs - /binary-upload
    // router.patch('/', (req, res) => {
    //     console.log(req)
    //     req.pipe(fs.createWriteStream('./uploads/img' + Date.now() + '.png'));
    //     res.end('OK');
        
    // })

    // /multipart-upload
    router.patch('/', upload.array('photo'), 
        (req, res) => {
            res.removeHeader('OK');
            console.log(req.files);
            console.log(req.body)
            res.send('Fine!')
        }
    );

    // router.patch('/:id', (req, res) => {
    //     res.send('I will alter a single field, because I am patch');
    // })

    router.delete('/:id', (req, res) => {
        res.send('field is deleted');
    })
    
    
    module.exports = router