const express = require('express');
const inforRouter = express.Router();
const  {Inforemation,Users} =  require('../models/index');

//initRouter
inforRouter.get('/', async (req,res) => {
      try {
        const showInfor = await Inforemation.findAll({
          
          include: [
            {
              model: Users,
              as: 'userAccount',
              attributes: [ 'username']
            }
          ]
        });        
        res.status(200).json(showInfor);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
});

inforRouter.post('/', async (req,res) => {
    const {name,city,district,location,phone,user_id} = req.body;
    try {
        const item =  await Inforemation.create(
            {
                name: name,
                city: city,
                district: district,
                location: location,
                phone:phone,
                user_id:user_id
            }
        )
      if (!item) return res.status(404).send('Not found ID')
      res.status(201).send('Create Succets')
    } catch (error) {
        res.status(500).send('Sever Error')
    }
})



module.exports = {inforRouter}