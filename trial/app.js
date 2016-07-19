var http_module = require('http');
var url_module = require('url');
var fs_module = require('fs');
var db_module = require('./db');

var db = db_module.DBModule(function(){
    db.setCollectionName('test_table1');

    http_module.createServer(function(request, response){
        var pathname = url_module.parse(request.url).pathname;
        var request_params = '';

        console.log("Request for " + pathname);

        if(pathname=='/getAllData'){
            db.setType('ALL');
            db.searchDB(function(data){
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(data));
            });
        }
        else if(pathname=='/addName'){
            request.on('data', function(chunk){
                request_params += chunk;
            });

            request.on('end', function(){
                request_params = JSON.parse(request_params);

                db.setType('ONE');
                db.setData({
                    name: request_params.name
                });
                db.insertToDB(function(){
                    request_params = '';

                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.end();
                });
            });
        }
        else if(pathname=='/deleteName'){
            request.on('data', function(chunk){
                request_params += chunk;
            });

            request.on('end', function(){
                request_params = JSON.parse(request_params);

                db.setType('ONE');
                db.setCondition({_id: db.convertStrToHexStr(request_params._id)});
                db.deleteFromDB(function(res){
                    request_params = '';

                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.end();
                });
            });
        }
        else if(pathname=='/saveName'){
            request.on('data', function(chunk){
                request_params += chunk;
            });

            request.on('end', function(){
                request_params = JSON.parse(request_params);

                db.setType('ONE');
                db.setCondition({_id: db.convertStrToHexStr(request_params._id)});
                db.setData({$set: {name: request_params.name}});
                db.updateDB(function(res){
                    request_params = '';

                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.end();
                });
            });
        }
        else{
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end();
        }

    }).listen(8081);

    console.log('Server running at http://127.0.0.1:8081/');
});