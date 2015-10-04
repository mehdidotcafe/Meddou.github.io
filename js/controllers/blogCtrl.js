var blog = angular.module("blogApp", ["indexingServiceApp"]);

blog.controller("blogCtrl", function($scope, indexingService)
{
  $scope.blog = $scope.$parent.configFile.blog;
  $scope.currentArticle = null;

  $scope.setCurrentArticle = function(article)
  {
    $scope.currentArticle = article;
    indexingService.goToIndex(1);
  }
});
