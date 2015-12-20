var meApp = angular.module("meApp", ["indexingServiceApp"]);

meApp.controller("meCtrl", function($scope, $timeout, $sce, $location)
{
  $scope.years;
  $scope.hours;
  $scope.seconds;
  $scope.gestures = [];
  $scope.hobbies = [];
  $scope.skills = [];
  $scope.life;

  var getResourceFile = function(fileName, scope, isArray)
  {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "./resources/" + fileName + ".json", true);
    xhr.onload = function(event)
    {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400)
        scope[fileName] = isArray ? JSON.parse(xhr.responseText)[fileName] : JSON.parse(xhr.responseText);
      else
        scope[fileName] = {};
      scope.$digest();
    }
    xhr.send();
  }

  $scope.getGesturesAndHobbies = function()
  {
    getResourceFile("gestures", $scope, true);
    getResourceFile("hobbies", $scope, true);
  }

  $scope.getSkill = function()
  {
    getResourceFile("skills", $scope, true);
  }

  $scope.getCV = function()
  {
    getResourceFile("cv", $scope, true);
  }

  $scope.insertHTML = function(comments)
  {
    return ($sce.trustAsHtml(comments));
  }

  $scope.showProjects = function(language)
  {
    console.log(language);
    $location.path("/projects").search({language: language});
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
