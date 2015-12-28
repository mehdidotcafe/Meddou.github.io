var routeApp = angular.module("routeApp", ["ngRoute", "projectsCtrl"]);

routeApp.config(function($routeProvider, $locationProvider)
{
  $locationProvider.html5Mode(true);
  $routeProvider.when("/",
  {
    templateUrl: "templates/views/me.html",
    controller: "meCtrl"
  });

  $routeProvider.when("/Me",
  {
    templateUrl: "templates/views/me.html",
    controller: "meCtrl"
  });

  $routeProvider.when("/Projects",
  {
    templateUrl: "templates/views/projects.html",
    controller: "projectsCtrl"
  });

  $routeProvider.when("/Blog",
  {
    templateUrl: "templates/views/blog.html",
    controller: "blogCtrl"
  });

  $routeProvider.when("/Contact",
  {
    templateUrl: "templates/views/contact.html",
    controller: "contactCtrl"
  });

  $routeProvider.otherwise({
    redirectTo: "/"
  });
});
