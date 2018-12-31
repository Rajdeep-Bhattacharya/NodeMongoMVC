var mongoClient = require('mongodb').MongoClient;
require('dotenv').config();
require('dotenv').load();
var url = process.env.mongo_url;
// takes too long need to fix
var findAllDocuments = function (db, callback) {
    var collection = db.collection('stockData')
    // bad way of doing it
    /* collection.find().toArray(function(err,docs){
        console.log(docs);
        callback;
    }); */
    // better way of making calls 
    var stream = collection.find({ symbol: "ADM" }, { symbol: 1, _id: 0, data: 1 }).stream();
    var data = [];
    stream.on("data", function (item) { console.log(item); data.push(item) });
    stream.on("end", function () { return callback(data) });
}
module.exports.findAll = function (req, res) {
    //changes in mondb driver ^3.0
    mongoClient.connect(url, function (err, client) {
        findAllDocuments(client.db('stock'), function (data) {
            client.close();
            res.send(data);
        });

    });
}
var findBySymbol = function (symbol,db, callback) {
    var collection = db.collection('stockData');
    var stream = collection.find({symbol:symbol}).stream();
    var data=[];
    stream.on('data',function(item){
        console.log(item);
        data.push(item);
    })
    stream.on('end',function(){
        return callback(data);
    })
}


module.exports.findBySymbol = function (req, res) {
    mongoClient.connect(url, function (err, client) {
        findBySymbol(req.params.symbol,client.db('stock'), function (data) {
            client.close();
            res.send(data);
        });
    });

}