var app = angular.module("user", []);
app.controller("userCtrl", function ($scope, $http, $window) {
    $scope.data = {};
    $scope.save = function () {
        $http({
            method: 'POST',
            url: "/saveuser",
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify($scope.data),
            dataType: 'json',
        }).
                success(function (data, status, headers, config) {
                    if (parseInt(data.code) == 400) {
                        alert(data.msg);
                        window.location.href="http://localhost:3000";
                    } else {
                        alert("error occured");
                    }
                }).
                error(function (data, status, headers, config) {
                    alert("failed!");
                });
    };
});