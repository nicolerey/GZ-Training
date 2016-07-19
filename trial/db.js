exports.DBModule = function(cllbck){
    var MongoClient = require('mongodb').MongoClient;
    var assert_module = require('assert');
    var ObjectID = require('mongodb').ObjectID;
    var database = 'test';
    var url = 'mongodb://localhost:27017/' + database;

    var _db_connection = {};

    var _collection_name = '';
    var _type = '';
    var _data = {};
    var _condition = {};
    var _sort = {};
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
        setType: function(type){
            _type = type;
        },
        setData: function(collection_data){
            _data = collection_data;
        },
        setCondition: function(condi){
            _condition = condi;
        },
        setSort: function(srt){
            _sort = srt;
        },
        closeDBConnection: function(){
            _db_connection.close();
        },
        convertStrToHexStr: function(st){
            return ObjectID(st);
        },
        searchDB: function(callback){
            // setCollectionName
            // setType
            // setSort (optional)

            var col = _db_connection.collection(_collection_name);

            var fnd = {};
            if(_type=='ALL')
                fnd = col.find();
            else
                fnd = col.find(_data).toArray();

            if(_sort.length!==0)
                fnd = fnd.sort(_sort);

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
        insertToDB: function(callback){
            // setCollectionName
            // setType
            // setData

            var col = _db_connection.collection(_collection_name);

            if(_type=='ONE')
                col.insertOne(_data, insertCallback);
            else if(_type=='MANY')
                col.insertMany(_data, insertCallback);

            function insertCallback(error, result){
                assert_module.equal(error, null);
                console.log("Inserted one row of data to " + _collection_name + ".");
                callback(result);
            }
        },
        updateDB: function(callback){
            // setCollectionName
            // setType
            // setCondition
            // setData

            var col = _db_connection.collection(_collection_name);

            if(_type=='ONE')
                col.updateOne(_condition, _data, updateCallback);
            else if(_type=='MANY')
                col.updateMany(_condition, _data, updateCallback);

            function updateCallback(error, result){
                assert_module.equal(error, null);
                console.log("Updated " + result + " entries in " + _collection_name + ".");
                callback(result);
            }
        },
        deleteFromDB: function(callback){
            // setCollectionName
            // setType
            // setCondition

            var col = _db_connection.collection(_collection_name);

            if(_type=='ONE')
                col.deleteOne(_condition, deleteCallback);
            else if(_type=='MANY')
                col.deleteMany(_condition, deleteCallback);

            function deleteCallback(error, result){
                console.log("Deleted " + _type + " from " + _collection_name + ".");
                callback(result);
            }
        }
    };

    return db_data;
};