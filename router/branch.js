const express = require('express');

const router = express.Router();

// module.exports = function() {
    router.get('/', (req, res) => {
        res.send('I am branch, so what do you want');
    })

    router.post('/', () => {
        res.send('Branch created, because I am Post');
    })

    router.patch('/:id', () => {
        res.send('I will alter a single field, because I am patch');
    })

    router.delete('/:id', () => {
        res.send('field is deleted');
    })
//     return router
// }

module.exports = router