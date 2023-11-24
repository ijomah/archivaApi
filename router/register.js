const express = require('express');

const router = express.Router();
const multer = require('multer');
const upload = multer();

const db = require("../dbconfig/configDb");
const { getUser, regUser, updateRegister, deleteRegEntry } = require('../controllers/reg');


    router
        .get('/', getUser)
        .post('/', upload.none(), regUser)
        .patch('/:id', updateRegister)
        .delete('/:id', deleteRegEntry)

module.exports = router