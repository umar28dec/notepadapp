var app = angular.module("login", []);
app.controller("loginctr", function ($scope, $http, $window) {
    $scope.data = {};
    $scope.save = function () {
        $http({
            method: 'POST',
            url: "/login",
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify($scope.data),
            dataType: 'json',
        }).
                success(function (data, status, headers, config) {
                    if (parseInt(data.code) == 400 && data.data.length >0 ) {
                        alert(data.msg);
                        window.location.href="http://localhost:3000";
                    } else {
                        alert("User name or password is incorrect");
                    }
                }).
                error(function (data, status, headers, config) {
                    alert("failed!");
                });
    };
});