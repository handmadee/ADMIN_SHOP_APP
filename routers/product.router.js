const express = require('express');
const useProduct = express.Router();
const {Product, sequelize} = require('../models/index');
const { uploadImage } = require('../middlewares/upload/postImage');
const urlBase = 'http://localhost:3006'
//init Router
useProduct.get('/', (req,res) => res.send('Hello Product'));
useProduct.post('/', uploadImage('product'), (req, res) => {
    const { title, detail, price, count, category_id } = req.body;
    console.log(title, detail, price, count, category_id);
    const imageUrl = req.file ? req.file.filename : null; 
    const url = `http://localhost:3006/upload/product/${imageUrl}`;
    console.log(url);
    Product.create({
        url: url,
        title: title,
        detail: detail,
        price: price,
        count: count,
        category_id: category_id,
    }).then((product) => {
        res.status(201).json(product);
    }).catch((err) => {
        console.log(err);
        res.status(500).send('Error creating product');
    });
});
useProduct.get('/getProduct', async (req, res) => {
    try {
      const [results] = await sequelize.query(
        'SELECT * FROM appDialigo.Product;'
      )
      res.status(200).send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Đã xảy ra lỗi khi lấy dữ liệu sản phẩm' });
    }
  });

  useProduct.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Product.destroy({
            where: {
                id: id,
            }
        });
        if (user === 0) {
            return res.status(404).send("Product not found");
        }
        res.status(200).send("Delete successfully");
    } catch (error) {
        res.status(500).send('Failed to remove product');
    }
  });

  useProduct.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await sequelize.query(`Select * from appDialigo.Product 
      where id = ${id}`)
      if (!result) {
        res.status(404).send("Không tìm thấy thông tin");
      } else {
        res.status(200).json(result[0][0]);
      }
    } catch (error) {
      res.status(500).send("error: " + error);
    }
  });

  useProduct.put('/:id',  uploadImage('product'), async (req, res) => {
    const { id } = req.params;
    const { title, detail, price, count, category_id } = req.body;
    const imageUrl = req.file ? req.file.filename : null; 
    const url = `http://localhost:3006/upload/product/${imageUrl}`;
    console.log(url);
    try {
        const query = `
        UPDATE Product
        SET
            url = COALESCE($url, url),
            title = COALESCE($title, title),
            detail = COALESCE($detail, detail),
            price = COALESCE($price, price),
            count = COALESCE($count, count),
            category_id = COALESCE($category_id, category_id)
        WHERE id = $id;
    `;
    
     await sequelize.query(query, {
        bind: {
            url,
            title,
            detail,
            price,
            count,
            category_id,
            id,
        },
        type: sequelize.QueryTypes.UPDATE,
    });
        res.status(200).send('Product updated successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});




  

module.exports = {useProduct};


