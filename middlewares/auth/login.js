const { Users } = require('./../../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateUserCredentials = async (username, pass) => {
    try {
        const user = await Users.findOne({
            where: {
                username: username,
            }
        });
        if (!user) {
            throw new Error('Account does not exist');
        }
        const isAuthen = bcrypt.compareSync(pass, user.pass);
        if (!isAuthen) {
            throw new Error('Login error');
        }
        const token = jwt.sign({ username: username, type: user.type, id: user.id ,  name: user.fullname, phone: user.phone}, 'Da24102003@', { expiresIn: 60 * 60 });
        return token;
    } catch (error) {
        console.error('Error validating user credentials:', error.message);
      return false;
    }
};

const isLogin =async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await validateUserCredentials(username, password);
        if (token) {
            res.status(200).json(token); 
        } else {
            res.status(400).send(false);
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

module.exports = isLogin;


