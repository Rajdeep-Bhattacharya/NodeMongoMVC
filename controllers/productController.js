const model = require('../models/product.model');

exports.test = function (req, res) {
    res.send('greetings from test controller');
}


exports.findAll = function (req, res) {
    model.findAll(req, res);
}

exports.findBySymbol = function (req, res) {

    model.findBySymbol(req,res);

}