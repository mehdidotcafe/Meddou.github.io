var medInfoBlocApp = angular.module("medInfoBlocApp", []);

medInfoBlocApp.directive("medInfoBloc", function()
{
  return ({
    restrict: "E",
    link: function(scope, elem, attrs)
    {
      // elem[0].style.backgroundColor = "rgb(" + scope.info.color[0] + ", " + scope.info.color[1] + ", " + scope.info.color[2] + ")";
    },
    controller: function($scope)
    {
      $scope.isManyWords = function(name)
      {
        return (name.split(" ").length > 1);
      }
    },
    templateUrl: "./templates/infoBloc.html"
  })
});
