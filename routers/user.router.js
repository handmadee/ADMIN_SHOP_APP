const express = require('express');
const userRouter = express.Router();
const auToken = express.Router()
const {Users} = require('../models/index');
const {fetchAllUsers,addUser,forgotPass,selectUser, removeUser} = require('../controllers/user.controllers');
const { checkIdExistence , validateNotEmpty,tableExits} = require('../middlewares/validations/isValidations');

const isLogin = require('../middlewares/auth/login');
const { Authen, timeToken } = require('../middlewares/auth/authen');
const { authorize } = require('../middlewares/auth/authorize');
var jwt = require('jsonwebtoken'); 
// init router
userRouter.get('/', Authen, authorize(['SUPERADMIN','ADMIN']), fetchAllUsers);
userRouter.get('/:id', Authen, authorize(['SUPERADMIN','ADMIN']),selectUser);
userRouter.post('/',addUser);
userRouter.put('/:name/:newpass',checkIdExistence(Users),
forgotPass);
userRouter.delete('/:id',checkIdExistence(Users),removeUser);
// AUTHEN account 
userRouter.post('/Login',isLogin);
userRouter.post('/Verification', Authen,(req,res) => {
    const {user} = req;
    res.status(200).send(user);
});
// 
auToken.post('/', (req,res) => {
     const {token} = req.body;
     try {
        const decod = jwt.verify(token,'Da24102003@');
        return res.send(decod);
      } catch (error) {
         throw new Error(error);
      }
})
userRouter.post('/timeToken',timeToken);
module.exports = {userRouter,auToken};


