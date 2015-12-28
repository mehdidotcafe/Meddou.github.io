var websiteApp = angular.module("websiteApp", ["routeApp", "indexUIApp", "medNavbarApp", "meApp", "blogApp", "contactApp", "medAnimationApp", "medSvgApp", "medProjectSidebarApp", "medGesturesApp", "medInputApp", "medMdParserApp", "medLazyLoadApp", "indexingServiceApp", "translationServiceApp", "ngAnimate"]);

websiteApp.run(function(translationService, $location)
{
  if ($location.search().lang)
    translationService.setLanguage($location.search().lang, true);
  else
    translationService.setLanguage("fr", true);
});

websiteApp.controller("indexCtrl", function($scope, $timeout, indexingService, translationService)
{
  $scope.isChrome = !!window.chrome;
  $scope.navbarIsHidden = false;

  $scope.indexingService = function()
  {
    indexingService.setCurrentWindow(window.location.href);
  };
  $scope.handleKey = function(event)
  {
    var activeElement = document.activeElement.tagName;

    if ((event.keyCode == 37 || event.keyCode == 70 || event.keyCode == 65) && activeElement != "INPUT")
      indexingService.goToIndex(indexingService.getCurrentIndex() - 1);
    else if ((event.keyCode == 39 || event.keyCode == 74 || event.keyCode == 68) && activeElement != "INPUT")
      indexingService.goToIndex(indexingService.getCurrentIndex() + 1);
  }
  translationService.setScope($scope);
});
