app.config(function($routeProvider) {
        $routeProvider
            .when('/open', {
                templateUrl : 'pages/open.html',
                controller  : 'viewController'
            })
    });