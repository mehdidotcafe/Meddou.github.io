var sliderService = angular.module("indexingServiceApp", []);

sliderService.service("indexingService", function($timeout)
{
  var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  // var articles = document.getElementsByTagName("article");
  // var container = document.getElementsByClassName("scrollContainer");
  var firstView = true;
  var currWindowName;
  var windowsInDOM = [];
  var windows = {
    "me": {
      name: "me",
      max: 3,
      currIdx: 0
    },
    "blog": {
      name: "blog",
      max: 2,
      currIdx: 0
    },
    "projects": {
      name: "projects",
      max: 2,
      currIdx: 0
    },
    "contact": {
      name: "contact",
      max: 1,
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

    currWindowName = splitedLocation[splitedLocation.length - 1] || "me";
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

  // function scrollLeft()
  // {
  //   var stack = 100;
  //
  //   function doItLeft()
  //   {
  //     --stack;
  //     if (stack > 5)
  //     {
  //       container[0].scrollLeft -= windowWidth / 100;
  //       $timeout(doItLeft, 5);
  //     }
  //     else
  //     {
  //       container[0].scrollLeft -= windowWidth / 100 + windowWidth % 100;
  //       stack = 100;
  //     }
  //   }
  //   doItLeft();
  //   // console.log(0);
  //   // container[0].scrollLeft -= parseInt(windowWidth / 100);
  //   // if (container[0].scrollLeft % windowWidth != 0)
  //   //   $timeout(scrollLeft, 10);
  // }

  // function scrollRight()
  // {
  //   var stack = 100;
  //
  //   function doItRight()
  //   {
  //     --stack;
  //     if (stack > 0)
  //     {
  //       container[0].scrollLeft += windowWidth / 100;
  //       $timeout(doItRight, 5);
  //     }
  //     else
  //     {
  //       container[0].scrollLeft += windowWidth / 100 + windowWidth % 100;
  //       stack = 100;
  //     }
  //   }
  //   doItRight();
  //   // console.log(1);
  //   // container[0].scrollLeft += windowWidth;
  //   // console.log(container[0].scrollLeft);
  //   // if (container[0].scrollLeft % windowWidth != 0)
  //   //   $timeout(scrollRight, 10);
  // }

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
        {
          // scrollLeft();
          --windows[currWindowName].currIdx;
        }
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
        {
          // scrollRight();
          ++windows[currWindowName].currIdx;
        }
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
