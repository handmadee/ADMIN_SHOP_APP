const {sequelize} = require('./../../models/index');
const bcrypt = require('bcryptjs');

const tableExits = (table) => {
    return async (req,res,next) => {
        const isUsersDefined =  await sequelize.isDefined(table)   
        if (isUsersDefined) {
            console.log('Bảng users đã được định nghĩa trong Sequelize.');
            return next;
        } else {
            console.log('Bảng users không tồn tại hoặc chưa được định nghĩa trong Sequelize.');
            res.status(404).send("Table not Exits");
        }
    }
}

const validateNotEmpty = (value) => {
    return async (req, res, next) => {
        if (value !== '') {
            return next();
        }
        return res.status(400).send('Bad Request: Value should not be empty');
    };
};

const checkIdExistence = (table) => {
    return async (req, res, next) => {
        const { id } = req.params;
        try {
            const item = await table.findOne({ id: id });
            if (item) {
                return next();
            } else {
                return res.status(404).send('ID not found');
            }
        } catch (error) {
            console.error(error);
            return res. status(500).send('Internal Server Error');
        }   
    };
};

module.exports = { validateNotEmpty, checkIdExistence, tableExits };
