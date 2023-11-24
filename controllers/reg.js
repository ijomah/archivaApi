const db = require("../dbconfig/configDb");

const getUser = (req, res) => {
    // db.select().table('users').then(admin => console.log(admin));
    db('users').then(admin => console.log(admin));
    res.send('I am register, so what do you want');
}

const regUser = (req, res) => {
    //get the req.body content
    const regData = req.body;
    console.log('from con', regData);
    // console.log(db('admins'));
    // console.log(db('admins').select().table('admins'))
    // db.insert()
    // db.insert({
    //     // id: userDet.id,
    //     // email: userDet.email,
    //     // user_key: name,
    //     // created_at: userDet.device
    // }).into('users')
    // .then(item => res.send(`Data inserted suceefully. Here is the id: ${item}`) )
    // res.send('registered')
}

const updateRegister = (req, res) => {
    res.send('I will alter a Reg field, because I am patch');
}

const deleteRegEntry = (req, res) => {
    res.send('Reg is deleted');
}

module.exports = {getUser, deleteRegEntry, updateRegister, regUser}