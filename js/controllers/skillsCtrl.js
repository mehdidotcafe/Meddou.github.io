var skillsApp = angular.module("skillsApp", []);

skillsApp.controller("skillsCtrl", function($scope)
{
  $scope.languages = $scope.$parent.configFile.skills;
});
