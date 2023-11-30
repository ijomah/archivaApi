const express = require('express');
const fs = require('fs');
const path = require('path')
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const db = require('../dbconfig/configDb');
const { default: knex } = require('knex');
const { error } = require('console');

const router = express.Router();

    //For download
    router.get('/filessave/:file', (req, res) => {
        // const imgs = db('images');
        // console.log('img', imgs);
        console.log(req.params)
        const itm = req.params.file
        // ./uploads/3fd3f300ba4df49acdaf00af77be896e
        res.download(`./uploads/${itm}`)
        // res.send('I am file, so what do you want');
    })
// img1700317933741.png
    //For sendfile for preview without download
    router.get('/filesview/:file', (req, res) => {
        // const imgs = db('images');
        // console.log('img', imgs);
        const itm = req.params.file
        if (!itm) {
            return res.status(404).send('No such file');
        }
        console.log(path.join(__dirname+`/upload/${itm}`))
        res.sendFile(path.join(__dirname+`/upload/${itm}`))
        res.send('I am file, so what do you want');
    })

    //let this serve dashboard request
    router.get('/filedetails', (req, res) => {
        const det = req.body;
        // console.log( db.from('files').select('*') );
        // console.log(db('images'))
        // db('login').then(console.log)
        // console.log(db.select('*').from('login').then(console.log))
        res.send('testing...')
    })

    router.get('/filedetails/:fileNO', (req, res) => {
        const singleDet = req.params;
        if(!singleDet) {
            res.status(404).send('No such file');
        }
        // console.log( db.from('files').select('*') );
        // console.log(db('images'))
        db('login').then(console.log)
        // console.log(knex.select('*').from('images'))
        res.send('testing...')
    })

    router.post('/', upload.none(), (req, res) => {
        // console.log(req.files);
        console.log(req.body);
        const bodyData = req.body
        db('applications').insert({
            applic_tag: bodyData.applicTag,
            applic_no: bodyData.applicationNumber,
            applic_name: bodyData.applicationName,
            // applic_name: bodyData.

        })
        .then(() => {
            res.send('inserted well')
        })
        .catch((error) => console.log('err inserting', error))

        db('approvals').insert({
            approv_type: bodyData.approvalType,
            created_at: bodyData.approvalDate,
            approv_do: bodyData.approvalDo,
            dcb_no: bodyData.dcbNumber
        })

        db('files').insert({
            file_name: bodyData.docTitle,
            file_no: bodyData.value,
            file_type: bodyData.value,
            created_at: bodyData.fileYear
        })
        res.send('file created, because I am Post');
    })
//2 samples from expo docs - /binary-upload
    // router.patch('/:id', (req, res) => {
    //     console.log(req.params)
    //     req.pipe(fs.createWriteStream('./uploads/img' + Date.now() + '.png'));
    //     res.end('OK');
        
    // })

    // /multipart-upload
    router.patch('/', upload.array('photo'), 
        (req, res) => {
            res.removeHeader('OK');
            console.log(req.files);
            const bodyData = JSON.parse(req.body.data);
            // console.log(req.body);
            console.log('bodydata to str', bodyData)
            let  imgArr = req.files;
            imgArr.forEach((datum) => {
                console.log('datum', datum)
                db('images').insert({
                    img_human_name: datum.originalname,
                    img_tag: req.body.imgId,
                    size: datum.size,
                    img_path: datum.path,
                    mime_type: datum.mimetype,
                    // file_id: req.body.imgId.slice(2)
                })
            })

            // docData.phoneNo,
            //             docData.value,
            //             docData.fname,
            //             docData.fileYear

            db('applications').insert({
                applic_tag: bodyData.applicTag,
                applic_no: bodyData.applicationNumber,
                applic_name: bodyData.applicationName,
                // applic_name: bodyData.

            })

            db('approvals').insert({
                approv_type: bodyData.approvalType,
                created_at: bodyData.approvalDate,
                approv_do: bodyData.approvalDo,
                dcb_no: bodyData.dcbNumber
            })

            db('files').insert({
                file_name: bodyData.docTitle,
                file_no: bodyData.value,
                file_type: bodyData.value.slice(2,3),
                created_at: bodyData.fileYear
            })
            res.send('Fine!');
        }
    );

    // router.patch('/:id', (req, res) => {
    //     res.send('I will alter a single field, because I am patch');
    // })

    router.delete('/:id', (req, res) => {
        res.send('field is deleted');
    })
    
    
    module.exports = router