const express = require('express');
const fs = require('fs');
const multer = require('multer');
const upload = multer();
const db = require('../dbconfig/configDb');

const router = express.Router();

    //tested!
    router.get('/', (req, res) => {
       // console.log(req)
        db.from('applications').select(
            // 'applications.id',
            'applic_tag',
            'f_name',
            'l_name',
            'file_name',
            'file_no',
            'files.id'
        )
        .join('files', 'applications.id', '=', 'files.applic_id' )
        .join('names', 'applications.id', '=', 'names.applic_id')
        .then((data) => {
            // console.log(data);
            return res.status(200).send(data)
        })
        
        // res.send('I am the James');
    });

    //yet to test this. Deliberate err
    router.get('/user', (req, res) => {
    //user's id (user_id) should come in the req
    //Use the user_id to get the db's id on the 
    //applic table and users table
        db.from('users').select(
            'users.date_created',
            'applic_tag',
            'f_name',
            'l_name',
            'file_name',
            'file_no',
            'files.id'
            )
            .join('files', 'users.id', '=', 'files.user_id')
            .join('applications', 'applications.id', '=', 'files.applic_id')
            .join('names', 'applications.id', '=', 'names.applic_id')
            .then(info => {
                return res.status(200).send(info)
            })
    });
    
    //This endpoint may needed by admin to know what has 
    //been done by the workers.  NOT NOW! FOR FUTURE
    //An input elem may be needed at FE mobile app for this.
    router.get('/:userKey', (req, res) => {
        const singleUser = req.params;
        if(!singleUser) {
            return res.status(404).send('No such user');
        }
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
