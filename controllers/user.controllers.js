
const { Users } = require('../models/index');
const bcrypt = require('bcryptjs');


const fetchAllUsers = async (req, res) => {
    try {
        const userList = await Users.findAll();
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).send('Failed to fetch users');
    }
};

const addUser = async (req, res) => {
    const { name, pass1 ,fullname,phoneNumber} = req.body;
    // hashpass
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(pass1, salt);
    const newUser = { username: name, pass: hashPassword,fullname: fullname, phone: phoneNumber  };
    try {
        const existingUser = await Users.findOne({
            where: {
                username: name 
            }
        });
        if (!existingUser) {
            await Users.create(newUser); 
            
            return res.status(201).send(true);   
        } else {
            return res.status(400).send(false);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to create user');
    }
};




const removeUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.destroy({
            where: {
                id: id,
            }
        });
        if (user === 0) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("Delete successfully");
    } catch (error) {
        res.status(500).send('Failed to remove user');
    }
};

const forgotPass = async (req, res) => {
    const { name, newpass } = req.params;
    try {
        const user = await Users.findOne({
            where: {
                username: name
            }
        });
        if (!user) {
            return res.status(400).send('User not found');
        }
        user.pass = newpass;
        await user.save();
        res.status(200).send('Password updated successfully');
    } catch (error) {
        res.status(500).send('Failed to update password');
    }
};
const selectUser = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const user = await Users.findOne({
            where: {
                id,
            }
        });
        if (!user) {
            return res.status(400).send('ID not found');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send('Failed to select user');
    }
};
module.exports = { fetchAllUsers, addUser, forgotPass, selectUser, removeUser };
