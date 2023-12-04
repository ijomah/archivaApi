const express = require('express');
const db = require('../dbconfig/configDb');
const router = express.Router();


router.get('/:userID', (req, res) => {
       const userDbNo = req.params.userID
    db.from('applications').select(
        'users.date_created',
        'user_key',
        'applic_dob',
        'applic_tag',
        'f_name',
        'l_name',
        // 'file_name',
        // 'file_no',
        // 'files.id',
        'dcb_no',
        'approv_do',
        'approv_date',
        'approv_type',
    )
    // .join('files', 'users.id', '=', `files.user_id`)
    // .join('files', 'applications.id', '=', 'files.applic_id')
    .join('names', 'applications.id', '=', 'names.applic_id')
    .join('approvals', 'approvals.id', '=', 'applications.approv_id')
    .join('users', 'user_id', '=', db.raw('?', [`${userDbNo}`]))
    .then(info => {
        return res.status(200).send(info)
    })
})


router.get('/', (req, res) => {
 db.from('users').select(
     'users.date_created',
     'user_key',
     'applic_dob',
     'applic_tag',
     'f_name',
     'l_name',
     'file_name',
     'file_no',
     'files.id',
     'dcb_no',
     'approv_do',
     'approv_date',
     'approv_type',
 )
 .join('applications', 'users.id', '=', 'applications.user_id')
 .join('names', 'applications.id', '=', 'names.applic_id')
 .join('files', 'applications.id', '=', 'files.applic_id')
 .join('approvals', 'approvals.id', '=', 'applications.approv_id')
 .then(info => {
     return res.status(200).send(info)
 })
})  

    router.post('/', (req, res) => {
        res.send('Branch created, because I am Post');
    })

    router.patch('/:id', (req, res) => {
        console.log(db)
        res.send('I will alter a single field, because I am patch');
    })

    router.delete('/:id', (req, res) => {
        res.send('field is deleted');
    })
//     return router
// }

module.exports = router