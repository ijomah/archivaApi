const express = require('express');
const knex = require("knex");

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: "./archTester.db"
  },
  useNullAsDefault: true
})

const router = express.Router();

    router.get('/', (req, res) => {
        db.select().table('users').then(admin => console.log(admin));
        res.send('I am register, so what do you want');
    })

    router.post('/', (req, res) => {
        //get the req.body content
        const userDet = req.body;
        // console.log(userDet);
        // console.log(db('admins'));
        // console.log(db('admins').select().table('admins'))
        db.insert({
            id: userDet.id,
            name: userDet.name,
            email: userDet.email,
            password: userDet.password
        }).into('users')
        .then(item => res.send(`Data inserted suceefully. Here is the id: ${item}`) )
        
    })

    router.patch('/:id', (req, res) => {
        res.send('I will alter a Reg field, because I am patch');
    })

    router.delete('/:id', (req, res) => {
        res.send('Reg is deleted');
    })

module.exports = router