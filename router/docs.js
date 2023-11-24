const express = require('express');

const router = express.Router();


    router.get('/', (req, res) => {
        db()
        res.send('I am branch, so what do you want');
    })

    router.post('/', (req, res) => {
        res.send('Branch created, because I am Post');
    })

    router.patch('/:id', (req, res) => {
        res.send('I will alter a single field, because I am patch');
    })

    router.delete('/:id', (req, res) => {
        res.send('field is deleted');
    })
//     return router
// }

module.exports = router