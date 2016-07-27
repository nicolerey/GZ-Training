firstApp.controller('indexController', ['$scope', '$http', 'ServerURLService', function($scope, $http, ServerURLService) {
    $scope.server_response = [];

    $scope.AddNameToServer = function() {
        console.log("Add name to SERVER");

        $http.post(ServerURLService.url('addName'), { name: $scope.name })
            .success(function(response) {
                $scope.name = '';
                $scope.RequestToServer();
            });
    };

    $scope.SaveNameToServer = function(id, u_name) {
        console.log("Save name to SERVER");

        $http.post(ServerURLService.url('saveName'), { _id: id, name: u_name })
            .success(function(response) {
                $scope.RequestToServer();
            });
    };

    $scope.DeleteNameFromServer = function(id) {
        console.log("Delete name from SERVER");

        $http.post(ServerURLService.url('deleteName'), { _id: id })
            .success(function(response) {
                $scope.RequestToServer();
            });
    };

    $scope.RequestToServer = function() {
        console.log("Request names from SERVER");

        $http.get(ServerURLService.url('getAllData')).success(function(response) {
            $scope.server_response = response;
        });
    };
    $scope.RequestToServer();
}]);
