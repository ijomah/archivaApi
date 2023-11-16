
const getUserSignInDetail = (req, res) => {
    res.send('User Signin details, because I am Get');
}

const signIn = (req, res) => {
    res.send('Signin created, because I am Post');
}

const updateSignIn = (req, res) => {
    res.send('I will alter a sign in field, because I am patch');
}

const deleteSignInUser = (req, res) => {
    res.send('signin is deleted');
}

module.exports = {deleteSignInUser, updateSignIn, getUserSignInDetail, signIn};