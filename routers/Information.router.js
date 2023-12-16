const express = require('express');
const information = express.Router();
const {Inforemation, sequelize} = require('../models/index');

// create Order 
information.post('/', (req, res) => {
    const {name,city,district,
        location,
        phone,
        user_id} = req.body;

    Inforemation.create({
         name: name ,
         city: city,
         district: district,
         location:location,
         phone: phone,
         user_id: user_id
    }).then((item) => {
        res.status(201).json(item);
    }).catch((err) => {
        res.status(500).send('Error creating order');
    });
});
// 
information.get('/', (req,res) => {
    Inforemation.findAll()
       .then((item) => {
        res.status(201).json(item);
       })   
       .catch((err) => {
        res.status(500).send('Error creating order');
    });
})

information.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Inforemation.findOne({ where: { user_id: id } });
      if (!result) {
        res.status(404).send("Không tìm thấy thông tin");
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      res.status(500).send("error: " + error);
    }
  });


module.exports = {information};
