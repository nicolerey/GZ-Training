firstApp.factory('ServerURLService', function(){
    return {
        url: function(url_extension){
            if(url_extension)
                return "http://localhost:8000/" + url_extension;
            else
                return "http://localhost:8000/";
        }
    };
});