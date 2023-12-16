const express = require('express');
const detailOrderRouter = express.Router();
const {detailOrders, sequelize} = require('../models/index');

// create Order 

detailOrderRouter.post('/', (req, res) => {
    const {idOrder,idProduct,countProduct} = req.body;
    detailOrders.create({
        idOrder:idOrder,
        idProduct:idProduct,
        countProduct: countProduct
    }).then((item) => {
        res.status(201).json(item);
    }).catch((err) => {
        res.status(500).send(err);
    });
});


module.exports = {detailOrderRouter};
