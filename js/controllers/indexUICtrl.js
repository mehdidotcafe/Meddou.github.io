var indexUIApp = angular.module("indexUIApp", ["indexingServiceApp"]);

indexUIApp.controller("indexUICtrl", function($scope, indexingService)
{
  $scope.indexingService.getCurrentIndex = indexingService.getCurrentIndex;
  $scope.indexingService.getWindowMax = indexingService.getWindowMax;
  $scope.indexingService.goToIndex = indexingService.goToIndex;
});
