const db = require("../dbconfig/configDb");


const getUser = (req, res) => {
    // db.select().table('users').then(admin => console.log(admin));
    db('files').then(admin => res.send(admin));
    // res.send('I am register, so what do you want');
}

const regUser = async (req, res) => {
    //get the req.body content
    
    const regData = req.body;
    console.log('from con', regData);
    // console.log(db('admins'));
    
    // const hash = await hashPassword()
    try {
        
        await db.transaction(async tx =>{
            // login table insertion
            const loginId = await tx('login').insert({
                hash: regData.password,
                email: regData.email
            }, 'id')

            const userId = await tx('users').insert({
                user_key: regData.userKey,
                date_created: regData.fileYear,
                login_id: loginId[0].id
            }, 'id')

            const addressId = await tx('addresses').insert({
                house_no: regData.houseNo,
                street_name: regData.streetName,
                area_name: regData.areaName,
                state: regData.state,
                user_id: userId[0].id
            }, 'id');

            const countryId = await tx('countries').insert({
                zip_code: regData.zipCode,
                country_name: regData.country,
                address_id: addressId[0].id
            }, 'id')

            const nameId = await tx('names').insert({
                f_name: regData.fname,
                l_name: regData.lname,           
            }, 'id')

            const phoneId = await tx('phone').insert({
                no: regData.phoneNo,
                user_id: userId[0].id
            })
            return res.status(200).send(userId) 
        })
    } catch(error) {
        console.log('catch err: ', error)
    }

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