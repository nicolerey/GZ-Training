exports.DBModule = function(cllbck){
    var MongoClient = require('mongodb').MongoClient;
    var assert_module = require('assert');
    var ObjectID = require('mongodb').ObjectID;
    var database = 'test';
    var url = 'mongodb://localhost:27017/' + database;

    var _db_connection = {};

    var _collection_name = '';
    var _collection_data = [];

    MongoClient.connect(url, function(err, db){
        assert_module.equal(null, err);
        _db_connection = db;
        cllbck();
    });

    var db_data = {
        setCollectionName: function(name){
            _collection_name = name;
        },
        closeDBConnection: function(){
            _db_connection.close();
        },
        convertStrToHexStr: function(st){
            return ObjectID(st);
        },
        searchDB: function(type, callback, data, sort){
            data = (typeof data !== 'undefined') ? data : {};
            sort = (typeof sort !== 'undefined') ? sort : {};

            var col = _db_connection.collection(_collection_name);

            var fnd = {};
            if(type=='ALL')
                fnd = col.find();
            else
                fnd = col.find(data).toArray();

            if(sort)
                fnd = fnd.sort(sort);

            console.log("Fetched data from " + _collection_name);

            fnd.each(function(err, doc){
                assert_module.equal(err, null);
                if(doc!==null)
                    _collection_data.push(doc);
                else{
                    var c_data = _collection_data;
                    _collection_data = [];
                    callback(c_data);
                }
            });
        },
        insertToDB: function(type, data, callback){
            var col = _db_connection.collection(_collection_name);

            if(type=='ONE')
                col.insertOne(data, insertCallback);
            else if(type=='MANY')
                col.insertMany(data, insertCallback);

            function insertCallback(error, result){
                assert_module.equal(error, null);
                console.log("Inserted one row of data to " + _collection_name + ".");
                callback(result);
            }
        },
        updateDB: function(type, condition, data, callback){
            var col = _db_connection.collection(_collection_name);

            if(type=='ONE')
                col.updateOne(condition, data, updateCallback);
            else if(type=='MANY')
                col.updateMany(condition, data, updateCallback);

            function updateCallback(error, result){
                assert_module.equal(error, null);
                console.log("Updated " + result + " entries in " + _collection_name + ".");
                callback(result);
            }
        },
        deleteFromDB: function(type, condition, callback){
            var col = _db_connection.collection(_collection_name);

            if(type=='ONE')
                col.deleteOne(condition, deleteCallback);
            else if(type=='MANY')
                col.deleteMany(condition, deleteCallback);

            function deleteCallback(error, result){
                console.log("Deleted " + type + " from " + _collection_name + ".");
                callback(result);
            }
        }
    };

    return db_data;
};