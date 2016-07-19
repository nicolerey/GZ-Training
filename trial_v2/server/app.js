var http_module = require('http');
var url_module = require('url');
var fs_module = require('fs');
var db_module = require('./modules/db');

var db = db_module.DBModule(function(){
    db.setCollectionName('test_table1');

    http_module.createServer(function(request, response){
        var pathname = url_module.parse(request.url).pathname;
        var request_params = '';

        console.log("Request for " + pathname);

        if(pathname=='/getAllData'){
            db.searchDB('ALL', function(data){
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(data));
            });
        }
        else if(pathname=='/addName' || pathname=='/deleteName' || pathname=='/saveName'){
            request.on('data', function(chunk){
                request_params += chunk;
            });

            request.on('end', function(){
                var data = {};
                var condition = {};

                request_params = JSON.parse(request_params);

                if(pathname=='/addName'){
                    data = {
                        name: request_params.name
                    };
                    db.insertToDB('ONE', data, function(){
                        request_params = '';

                        response.writeHead(200, {'Content-Type': 'application/json'});
                        response.end();
                    });
                }
                else if(pathname=='/deleteName'){
                    condition = {
                        _id: db.convertStrToHexStr(request_params._id)
                    };
                    db.deleteFromDB('ONE', condition, function(res){
                        request_params = '';

                        response.writeHead(200, {'Content-Type': 'application/json'});
                        response.end();
                    });
                }
                else if(pathname=='/saveName'){
                    condition = {
                        _id: db.convertStrToHexStr(request_params._id)
                    };
                    data = {
                        $set: {
                            name: request_params.name
                        }
                    };
                    db.updateDB('ONE', condition, data, function(res){
                        request_params = '';

                        response.writeHead(200, {'Content-Type': 'application/json'});
                        response.end();
                    });
                }
            });
        }
        else{
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end();
        }

    }).listen(8081);

    console.log('Server running at http://127.0.0.1:8081/');
});