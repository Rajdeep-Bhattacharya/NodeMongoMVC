const model = require('../models/stock.model');

exports.test = function (req, res) {
    res.send('greetings from test controller');
}


exports.findAll = function (req, res) {
    model.findAll(req, res);
}

exports.findByKey = function (req, res) {
    model.findByKey(req,res);
}

exports.create= function(req,res){
    model.create(req,res);
}

exports.update = function(req,res){
    model.update(req,res);
}

exports.delete = function(req,res){
    model.delete(req,res);
}

exports.update = function(req,res){
    model.update(req,res);
}
