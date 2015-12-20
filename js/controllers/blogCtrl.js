var blog = angular.module("blogApp", ["indexingServiceApp"]);

blog.controller("blogCtrl", function($scope, indexingService)
{
  $scope.blog = [];
  $scope.currentArticle = null;

  $scope.setCurrentArticle = function(article)
  {
    $scope.currentArticle = article;
    indexingService.goToIndex(1);
  }

  $scope.getBlog = function()
  {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "./resources/blog.json", true);
    xhr.onload = function(event)
    {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400)
        $scope.blog = JSON.parse(xhr.responseText).blog;
      $scope.$digest();
    }
    xhr.send();
  }
});
