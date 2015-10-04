var websiteApp = angular.module("websiteApp", ["routeApp", "indexUIApp", "medNavbarApp", "meApp", "blogApp", "medInfoBlocApp", "contactApp", "skillsApp", "medAnimationApp", "medSvgApp", "medProjectSidebarApp", "medGesturesApp", "medInputApp", "medMdParserApp", "indexingServiceApp", "translationServiceApp", "ngAnimate"]);

websiteApp.run(function(translationService)
{
  translationService.setLanguage("french");
});

websiteApp.controller("indexCtrl", function($scope, $timeout, indexingService, translationService)
{
  $scope.navbarIsHidden = false;
  $scope.isChrome = !!window.chrome;

  $scope.indexingService = function()
  {
    indexingService.setCurrentWindow(window.location.href);
  };

  function getConfigFile()
  {
    var req = new XMLHttpRequest();

    req.open("GET", "./config.json", true);
    req.onload = function(event)
    {
      if (req.readyState == 4 && req.status >= 200 && req.status < 400)
        $scope.configFile = JSON.parse(req.responseText);
      else
        $scope.configFile = JSON.parse("{}");
    }
    req.send(null);
  }

  $scope.handleKey = function(event)
  {
    var activeElement = document.activeElement.tagName;

    if ((event.keyCode == 37 || event.keyCode == 70 || event.keyCode == 65) && activeElement != "INPUT")
      indexingService.goToIndex(indexingService.getCurrentIndex() - 1);
    else if ((event.keyCode == 39 || event.keyCode == 74 || event.keyCode == 68) && activeElement != "INPUT")
      indexingService.goToIndex(indexingService.getCurrentIndex() + 1);
  }

  translationService.setScope($scope);
  getConfigFile();
});
