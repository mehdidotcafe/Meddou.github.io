angular.module("websiteApp", [])
  .directive("navbar", function()
  {
    return ({
      restrict: "E",
      transclude: false,
      scope: false,
      templateUrl: "/templates/navbar.html"
    });
  });
