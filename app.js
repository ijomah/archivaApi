const express = require('express');
// const fileUpload = require('express-fileupload');
const app = express();

//db
const db = require('./dbconfig/configDb');

app.use(express.urlencoded({extended: false}))

// app.use(fileUpload());

const registerRouter = require("./router/register");
const signInRouter = require("./router/signin");
const personRouter = require('./router/person');
const documentRouter = require('./router/docs');
const branchRouter = require('./router/branch');
const fileRouter = require('./router/file');
const documentOne = require('./router/documentone');
// const branchRouter = require("./router/branch")

const port = process.env.PORT || 3000;

//create endpoints for sql db
app.use('/api/v1/signin', signInRouter);
app.use('/api/v1/register', registerRouter);
app.use('/api/v1/persons', personRouter);
app.use('/api/v1/documents', documentRouter);
app.use('/api/v1/branches', branchRouter);
app.use('/api/v1/files', fileRouter);
app.use('/api/v1/documentone', documentOne);
//create endpoints for google drive db


app.listen(port, () => console.log(`listening on port: ${port}`));

module.exports = app;