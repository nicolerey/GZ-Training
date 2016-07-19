firstApp.factory('ServerURLService', function(){
    return {
        url: function(url_extension){
            if(url_extension)
                return "http://127.0.0.1:8081/" + url_extension;
            else
                return "http://127.0.0.1:8081/";
        }
    };
});