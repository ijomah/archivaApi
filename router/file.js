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
    // uploads/1a129f446b45199464331c465a0bc47f
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

    router.get('/:fileId', (req, res) => {
        const idForFile = req.params.fileId;
        db.from('images').select(
            'mime_type',
            'img_name',
            'img_tag',
            'img_human_name'
        )
        .where({id: idForFile})
        .then(imgDatum => res.status(200).send(imgDatum))
    })

    //let this serve dashboard request
    router.get('/filedetails', (req, res) => {
        const det = req.body;
    // process.env.MINE='is you'
        // console.log( db.from('files').select('*') );
        // console.log(process.env)
        // db('login').then(console.log)
        db.select('*').from('countries')
        .then(data => {
            return res.status(200).send(data)
        })
        // res.status(200).send('testing...')
    })

    router.get('/filedetails/:fileNO', (req, res) => {
        const singleDet = req.params;
        if(!singleDet) {
            res.status(404).send('No such file');
        }
        // console.log( db.from('files').select('*') );
        // console.log(db('images'))
        db('login').then(tins => res.status(200).send(tins))
        // console.log(knex.select('*').from('images'))
        
    })

    router.post('/', upload.none(), async (req, res) => {
        // console.log(req.files);
        // console.log(req.body);
        let fileId=[];
        let nameId=[];
        let applId=[];
        let apprId=[];
        let userId=[];
        try{
            const bodyData = req.body
            // db.transaction()
           await db.transaction(async (tx) =>{

    //Please do insert for users table first 
    //bcos you need the id as foreign key in files table below
                apprId = await tx('approvals').insert({
                    approv_type: bodyData.approvalType,
                    approv_date: bodyData.approvalDate,
                    approv_do: bodyData.approvalDo,
                    dcb_no: bodyData.dcbNumber
                }, 'id')
                
                userId = await tx('users').insert({
                    // user_key: bodyData.userKey,
                    date_created: new Date(),
                    // login_id: 
                }, 'id')

                applId = await tx('applications').insert({
                    applic_tag: bodyData.applicTag,
                    applic_no: bodyData.applicationNumber,
                    applic_dob: bodyData.fileYear,
                    approv_id: apprId[0].id,
                    // Whenever err on this is thrown, fix
                    // in the db. Just adopted newly
                    user_id: userId[0].id
                }, 'id')

                nameId = await tx('names').insert({
                    f_name: bodyData.fname,
                    l_name: bodyData.lname,
                    applic_id: applId[0].id
                }, 'id')

                fileId = await tx('files').insert({
                    file_name: bodyData.docTitle,
                    file_no: bodyData.value,
                    file_type: bodyData.value,
                    user_id: bodyData.dbUserId,
                    applic_id: applId[0].id,
                    date_created: bodyData.fileYear
                }, 'id')
                // console.log('ids', applIds[0].id, apprIds[0], fileIds);
            })
            
            return res.status(201).send({
                message: 'Inserted successfully',
                ids: {
                    fileId: fileId[0],
                    nameId: nameId[0],
                    applId: applId[0],
                    apprId: apprId[0],
                    userId: userId[0]
                }
            });
        } catch(error) {
            console.log('catch err: ', error)
        }
        // catch((error) => console.log('catch err: ', error)) 
    })
    
//2 samples from expo docs - /binary-upload
    // router.patch('/:id', (req, res) => {
    //     console.log(req.params)
    //     req.pipe(fs.createWriteStream('./uploads/img' + Date.now() + '.png'));
    //     res.end('OK');
        
    // })

    // /multipart-upload
    router.patch('/', upload.array('photo'), 
        async (req, res) => {
            res.removeHeader('OK');
            
            const bodyData = JSON.parse(req.body.data);
            const  imgArr = req.files;

            console.log(bodyData)
            console.log(req.files)
            try {
                
                let fileIds = [];
                await db.transaction(async (tx) => {
                    const apprIds = await tx('approvals').insert({
                        approv_type: bodyData.approvalType,
                        approv_date: bodyData.approvalDate,
                        approv_do: bodyData.approvalDo,
                        dcb_no: bodyData.dcbNumber
                    }, 'id')
//not needed. I just need the user_id to be in the
//needed tables
                    // const userIds = await tx('users').insert({
                    //     user_key: bodyData.userKey,
                    //     date_created: new Date(),
                    //     // login_id: 
                    // }, 'id')

                    const applIds = await tx('applications').insert({
                        applic_tag: bodyData.applicTag,
                        applic_no: bodyData.applicationNumber,
                        applic_dob: bodyData.fileYear,
                        approv_id: apprIds[0].id,
                        user_id: bodyData.dbUserId
                    }, 'id')
    
                    const nameId = await tx('names').insert({
                        f_name: bodyData.fName,
                        l_name: bodyData.lName,
                        applic_id: applIds[0].id
                    }, 'id')
                    
                    fileIds = await tx('files').insert({
                        file_name: bodyData.docTitle,
                        file_no: bodyData.value,
                        file_type: bodyData.value,
                        user_id: bodyData.dbUserId,
                        applic_id: applIds[0].id,
                        date_created: bodyData.fileYear
                    }, 'id')

                    const addressIds = await tx('addresses').insert({
                        house_no: bodyData.houseNo,
                        street_name: bodyData.streetName,
                        area_name: bodyData.areaName,
                        state: bodyData.state,
                        user_id: bodyData.dbUserId
                    }, 'id')
                    // console.log('ids', applIds[0].id, apprIds[0], fileIds);

                    const countryId = await tx('countries').insert({
                        zip_code: bodyData.zipCode,
                        country_name: bodyData.country,
                        address_id: addressIds[0].id
                    }, 'id')

                });

                imgArr.forEach(async (datum) => {
                    await db.transaction(async (tx) => {
                            // console.log(datum)
                            var imageId = await tx('images').insert({        
                                img_human_name: datum.originalname,
                                img_tag: req.body.imgId,
                                size: datum.size,
                                img_name: datum.filename,
                                file_id: fileIds[0].id,
                                img_path: datum.path,
                                mime_type: datum.mimetype
                        }, 'id')
                        // return res.status(200).send(imageId)      
                    })  
                })

                
                
                
                return res.status(200).send('file inserted');
                
            } catch(error) {
                console.log('new err', error)
            }
            
            
            // docData.phoneNo,
            //             docData.value,
            //             docData.fname,
            //             docData.fileYear

            // db('applications').insert({
            //     applic_tag: bodyData.applicTag,
            //     applic_no: bodyData.applicationNumber,
            //     applic_name: bodyData.applicationName,
            //     // applic_name: bodyData.

            // })

            // db('approvals').insert({
            //     approv_type: bodyData.approvalType,
            //     created_at: bodyData.approvalDate,
            //     approv_do: bodyData.approvalDo,
            //     dcb_no: bodyData.dcbNumber
            // })

            // db('files').insert({
            //     file_name: bodyData.docTitle,
            //     file_no: bodyData.value,
            //     file_type: bodyData.value.slice(2,3),
            //     created_at: bodyData.fileYear
            // })
            return res.status(200).send('Fine!');
        }
    );

    // router.patch('/:id', (req, res) => {
    //     res.send('I will alter a single field, because I am patch');
    // })

    router.delete('/:id', (req, res) => {
        res.send('field is deleted');
    })
    
    
    module.exports = router