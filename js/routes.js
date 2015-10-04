var routeApp = angular.module("routeApp", ["ngRoute", "projectsCtrl"]);

routeApp.config(function($routeProvider, $locationProvider)
{
  $locationProvider.html5Mode(true);
  $routeProvider.when("/",
  {
    templateUrl: "templates/views/me.html",
    controller: "meCtrl"
  });

  $routeProvider.when("/me",
  {
    templateUrl: "templates/views/me.html",
    controller: "meCtrl"
  });

  $routeProvider.when("/projects",
  {
    templateUrl: "templates/views/projects.html",
    controller: "projectsCtrl"
  });

  $routeProvider.when("/blog",
  {
    templateUrl: "templates/views/blog.html",
    controller: "blogCtrl"
  });

  $routeProvider.when("/skills",
  {
    templateUrl: "templates/views/skills.html",
    controller: "skillsCtrl"
  });

  $routeProvider.when("/contact",
  {
    templateUrl: "templates/views/contact.html",
    controller: "contactCtrl"
  });

  $routeProvider.otherwise({
    redirectTo: "/"
  });
});
