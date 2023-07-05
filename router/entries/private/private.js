const express = require('express');
const router = express.Router();

const personsRouter = require('../../person');
const branchesRouter = require('../../branch');
const categoriesRouter = require('../../category');
const filesRouter = require('../../file');
const categoryoneRouter = require('../../categoryone');

module.exports = function () {
    router.use(personsRouter());
    router.use(branchesRouter());
    router.use(categoriesRouter());
    router.use(filesRouter());
    router.use(categoryoneRouter());

    return router;
}