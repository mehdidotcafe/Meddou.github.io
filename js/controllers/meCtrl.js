var meApp = angular.module("meApp", ["indexingServiceApp"]);

meApp.controller("meCtrl", function($scope, $timeout, $sce)
{
  $scope.years;
  $scope.hours;
  $scope.seconds;
  $scope.gestures = $scope.$parent.configFile.gestures;
  $scope.hobbies = $scope.$parent.configFile.hobbies;
  $scope.life = $scope.$parent.configFile.life;

  $scope.insertHTML = function(comments)
  {
    return ($sce.trustAsHtml(comments));
  }

  function getLife()
  {
    var years;
    var hours;
    var life = Math.abs(new Date(1996, 11, 14) - new Date()) / 36e5;

    years = life / (24 *  365);
    $scope.years = parseInt(years);

    hours = life - ($scope.years * 365 * 24);
    $scope.hours = parseInt(hours);
    $scope.seconds = parseInt((hours - $scope.hours) * 3600);
    $timeout(getLife, 1000);
  }

  getLife();
});
