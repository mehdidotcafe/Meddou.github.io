var navbarApp = angular.module("medNavbarApp");

navbarApp.controller("navbarCtrl", function($scope, indexingService, translationService)
{
  $scope.currentLink = null;
  $scope.mode = true;

  $scope.setLanguage = function(language)
  {
    translationService.setLanguage(language);
  }
});
