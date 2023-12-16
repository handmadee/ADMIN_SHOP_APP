const express = require('express');
const { userRouter, auToken } = require("./user.router");
const { inforRouter } = require('./location.router');
const { useProduct } = require('./product.router');
const { orderRouter } = require('./order.router');
const { detailOrderRouter } = require('./detailOrder.router');
const { information } = require('./Information.router');

const rootRouter = express.Router();
rootRouter.use('/account',userRouter);
rootRouter.use('/infor', inforRouter);
rootRouter.use('/product', useProduct);
rootRouter.use('/order', orderRouter);
rootRouter.use('/detail', detailOrderRouter);
rootRouter.use('/information', information);
rootRouter.use('/auToken', auToken);
module.exports = {rootRouter};

