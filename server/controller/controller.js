const { Model } = require('../models/customer.js');

class Controller {
    static async readCustomer(req, res, next) {
        try {
            let data = await Model.readCustomer(req.query.search);
            if (!data || data == "") {
                throw { name: 'Data not found' };
            }
            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }
    static async readCustomerById(req, res, next) {
        try {
            if (!req.params.id) {
                throw { name: 'Id not found' };
            }
            let data = await Model.readCustomerById(req.params.id);
            if (!data || data == "") {
                throw { name: 'Id not found' };
            }
            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }
    static async createCustomer(req, res, next) {
        try {
            if (!req.body.name || !req.body.level || !req.body.ProdukId) {
                throw { name: 'All fields must be filled' };
            }
            let data = await Model.createCustomer(req.body);
            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }
    static async updateCustomer(req, res, next) {
        try {
            if (!req.body.name || !req.body.level || !req.body.favorite_menu || !req.body.total_transaction) {
                throw { name: 'All fields must be filled' };
            }
            let data = await Model.updateCustomer(req.body, req.params.id);
            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }
    static async deleteCustomer(req, res, next) {
        try {
            if (!req.params.id) {
                throw { name: 'Id not found' };
            }
            let data = await Model.deleteCustomer(req.params.id);
            if (!data || data == "") {
                throw { name: 'Id not found' };
            }
            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }
    static async createTransaction(req, res, next) {
        try {
            if (!req.body.ProdukId || !req.body.CustomerId || !req.body.jumlah) {
                throw { name: 'All fields must be filled' };
            }
            let data = await Model.createTransaction(req.body);
            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }
    static async readFavorite(req, res, next) {
        try {
            let data = await Model.readFavorite();
            if (!data || data == "") {
                throw { name: 'Data not found' };
            }
            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }
    static async readTransactionById(req, res, next) {
        try {
            if (!req.params.id) {
                throw { name: 'Id not found' };
            }
            let data = await Model.readTransactionById(req.params.id);
            if (!data || data == "") {
                throw { name: 'Id not found' };
            }
            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }
    static async deleteCustomer(req, res, next) {
        try {
            if (!req.params.id) {
                throw { name: 'Id not found' };
            }
            let data = await Model.deleteCustomer(req.params.id);
            if (!data || data == "") {
                throw { name: 'Id not found' };
            }
            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }
    static async updateTransaction(req, res, next) {
        try {
            if (!req.body.jumlah || !req.params.id) {
                throw { name: 'All fields must be filled' };
            }
            let data = await Model.updateTransaction(req.body.jumlah, req.params.id);
            res.status(200).json(data);
        } catch (error) {
            next(error)
        }
    }
}
module.exports = Controller