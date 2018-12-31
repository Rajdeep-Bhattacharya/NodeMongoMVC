var mongoClient = require('mongodb').MongoClient;
require('dotenv').config();
require('dotenv').load();
const dbName = process.env.db_name;
const collectionName = process.env.collection_name;
var url = process.env.mongo_url;
// takes too long need to fix
var findAllDocuments = function (db, callback) {
    var collection = db.collection(collectionName)
    // bad way of doing it
    /* collection.find().toArray(function(err,docs){
        console.log(docs);
        callback;
    }); */
    // better way of making calls 
    var stream = collection.find({ symbol:1,_id:0,data:1,open:0,close:0,low:0,high:0,volume:0 }).stream();
    var data = [];
    stream.on("data", function (item) { console.log(item); data.push(item) });
    stream.on("end", function () { return callback(data) });
}
module.exports.findAll = function (req, res) {
    //changes in mondb driver ^3.0
    mongoClient.connect(url, function (err, client) {
        findAllDocuments(client.db(dbName), function (data) {
            client.close();
            res.send(data);
        });

    });
}
var findByKey = function (key,val,db, callback) {
    var collection = db.collection(collectionName);
    var query ={};
    query[key]=val;
    var stream = collection.find(query).stream();
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
        findByKey('symbol',req.params.symbol,client.db(dbName), function (data) {
            client.close();
            res.send(data);
        });
    });

}
module.exports.findByDate = function(req,res){
    mongoClient.connect(url,function(err,client){
        findByKey('date',req.params.date,client.db(dbName),function(data){
            client.close();
            res.send(data);
        });
    });
}