var sliderService = angular.module("indexingServiceApp", []);

sliderService.service("indexingService", function($timeout)
{
  var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var firstView = true;
  var currWindowName;
  var windowsInDOM = [];
  var windows = {
    "Me": {
      name: "Me",
      max: 3,
      currIdx: 0
    },
    "Projects": {
      name: "Projects",
      max: 2,
      currIdx: 0
    }
  };

  angular.element(document).ready(function()
  {
    windowsInDOM = document.getElementsByTagName("article");
    for (var i = 0 ; i < windowsInDOM.length; i++)
    {
      if (i < windows[currWindowName].currIdx)
      {
        windowsInDOM[i].classList.add("left");
        windowsInDOM[i].classList.remove("right");
        windowsInDOM[i].classList.remove("default");
      }
      else if (i == windows[currWindowName].currIdx)
      {
        windowsInDOM[i].classList.add("default");
        windowsInDOM[i].classList.remove("right");
        windowsInDOM[i].classList.remove("left");
      }
      else
      {
        windowsInDOM[i].classList.add("right");
        windowsInDOM[i].classList.remove("default");
        windowsInDOM[i].classList.remove("left");
      }
    }
  });

  this.setCurrentWindow = function(location)
  {
    var splitedLocation = location.split("?")[0].split("/");
    var blocs = document.getElementsByClassName("bloc");

    currWindowName = splitedLocation[splitedLocation.length - 1] || "Me";
    windows[currWindowName].currIdx = 0;
    if (firstView == false)
    {
      for (var i in blocs)
      {
        if (blocs[i].style)
          blocs[i].style.animationDelay = "0.5s";
      }
    }
    firstView = false;
  };

  this.goToIndex = function(idx)
  {
    document.activeElement.blur();
    function slideRecursive(index)
    {
      if (index < windows[currWindowName].currIdx && windowsInDOM)
      {
        windowsInDOM[windows[currWindowName].currIdx].classList.remove("default");
        windowsInDOM[windows[currWindowName].currIdx].classList.remove("left");
        windowsInDOM[windows[currWindowName].currIdx].classList.add("right");
        if (windows[currWindowName].currIdx > 0)
          --windows[currWindowName].currIdx;
        // else
        //   scope.idx = scope.windows.length - 1;
        windowsInDOM[windows[currWindowName].currIdx].classList.remove("right");
        windowsInDOM[windows[currWindowName].currIdx].classList.remove("left");
        windowsInDOM[windows[currWindowName].currIdx].classList.add("default");
      }
      else if (index != windows[currWindowName].currIdx && windowsInDOM)
      {
        windowsInDOM[windows[currWindowName].currIdx].classList.remove("default");
        windowsInDOM[windows[currWindowName].currIdx].classList.remove("right");
        windowsInDOM[windows[currWindowName].currIdx].classList.add("left");
        if (windows[currWindowName].currIdx < windows[currWindowName].max - 1)
          ++windows[currWindowName].currIdx;
        // else
        //   scope.idx = 0;
        windowsInDOM[windows[currWindowName].currIdx].classList.remove("left");
        windowsInDOM[windows[currWindowName].currIdx].classList.remove("right");
        windowsInDOM[windows[currWindowName].currIdx].classList.add("default");
      }
      if (index != windows[currWindowName].currIdx && index >= 0 && index < windows[currWindowName].max)
      {
        $timeout(function()
        {
          slideRecursive(index);
        }, 200);
      }
    }
    slideRecursive(idx);
  };

  this.getWindowMax = function()
  {
    if (windows[currWindowName])
      return (new Array(windows[currWindowName].max));
    return (new Array(0));
  };

  this.getCurrentIndex = function()
  {
      return (windows[currWindowName].currIdx);
  };

  this.getMaxIndex = function()
  {
    return (windows[currWindowName].max);
  };
});
