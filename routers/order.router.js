const express = require("express");
const orderRouter = express.Router();
const { Orders, sequelize } = require("../models/index");

// create Order
orderRouter.post("/:id", (req, res) => {
  const { id } = req.params;
  Orders.create({
    idUser: id,
  })
    .then((item) => {
      res.status(201).json(item);
    })
    .catch((err) => {
      res.status(500).send("Error creating order");
    });
});
// Select order
orderRouter.get("/", async (req, res) => {
  try {
        const resuft = await sequelize.query(`
        SELECT Orders.id, Inforemations.name,Inforemations.phone,Inforemations.location,Orders.createdAt , sum(detailOrders.countProduct * Product.price) as TongTien ,Orders.status
        from Orders
        join Users on Users.id = Orders.idUser
        join Inforemations on Inforemations.user_id = Users.id
        join detailOrders on detailOrders.idOrder =  Orders.id
        join Product on Product.id = detailOrders.idProduct
        group by Orders.id, Inforemations.name,Inforemations.phone,Inforemations.location,Orders.createdAt
        `);
     return  res.status(200).json(resuft[0]);
  } catch (error) {
    res.status(500).send("error" + error);
  }
});
// Select order ID
orderRouter.get("/selectOrder/:id", (req, res) => {
  const { id } = req.params;
  return sequelize
    .query(
      `
SELECT Orders.id,Product.url,Product.title,Product.price,detailOrders.countProduct
from Orders 
join Users on Users.id = Orders.idUser
join Inforemations on Inforemations.user_id = Users.id
join detailOrders on detailOrders.idOrder =  Orders.id 
join Product on Product.id = detailOrders.idProduct
where Orders.id = ${id};
  `
    )
    .then((item) => {
      res.status(201).json(item);
    })
    .catch((err) => {
      res.status(500).send("Error creating order");
    });
});
//

module.exports = { orderRouter };
