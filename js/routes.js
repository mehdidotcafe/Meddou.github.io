var routeApp = angular.module("routeApp", ["ngRoute", "projectsCtrl"]);

routeApp.config(function($routeProvider, $locationProvider)
{
  $locationProvider.html5Mode(true);
  $routeProvider.when("/",
  {
    templateUrl: "templates/views/me.html",
    controller: "meCtrl"
  });

  $routeProvider.when("/Projects",
  {
    templateUrl: "templates/views/projects.html",
    controller: "projectsCtrl"
  });

  $routeProvider.otherwise({
    redirectTo: "/"
  });
});
