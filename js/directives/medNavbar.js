var navbarApp = angular.module("medNavbarApp", ["indexingServiceApp", "translationServiceApp"]);

navbarApp.directive("medNavbar", function()
{
  return ({
    restrict: "E",
    templateUrl: "./templates/navbar.html"
  });
});
