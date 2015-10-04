var medGesturesApp = angular.module("medGesturesApp", ["indexingServiceApp"]);

medGesturesApp.directive("medScrollOnSwipe", function($window, $document, indexingService)
{
  return ({
    link: function(scope, elem, attrs)
    {
      var opt;
      var newX;
      var newY;
      var startY = 0;
      var startX = 0;
      var x = 0;
      var y = 0;
      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      var moveIsOver = false;

      elem.on("touchstart", function(event)
      {
        opt = false;
        event.preventDefault();
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        $document.on("touchmove", mousemove);
        $document.on("touchend", mouseup);
      });

      elem.on("mousedown", function(event)
      {
        opt = true;
        event.preventDefault();
        startX = event.pageX;
        startY = event.pageY;
        $document.on("mousemove", mousemove);
        $document.on("mouseup", mouseup);
      });

      function mousemove(event)
      {
        if (opt == true)
        {
          newY = event.pageY - startY;
          newX = event.pageX - startX;
        }
        else
        {
          newY = event.touches[0].clientY - startY;
          newX = event.touches[0].clientX - startX;
        }
        if ((attrs.medScrollOnSwipe == "vertical" || attrs.medScrollOnSwipe == "both") && Math.abs(newY) > Math.abs(newX))
          (elem[0].scrollTop -= newY / 5) < 0 && (elem[0].scrollTop = 0);
        else if ((attrs.medScrollOnSwipe == "horizontal"  || attrs.medScrollOnSwipe == "both") && Math.abs(newX) >= Math.abs(newY))
        {
          if (newX >= width / 5 && moveIsOver == false)
          {
            indexingService.goToIndex(indexingService.getCurrentIndex() - 1);
            moveIsOver = true;
          }
          else if (-newX >= width / 5 && moveIsOver == false)
          {
            indexingService.goToIndex(indexingService.getCurrentIndex() + 1);
            moveIsOver = true;
          }
        }
      }

      function mouseup()
      {
        moveIsOver = false;
        if (opt == true)
        {
          $document.off("mousemove", mousemove);
          $document.off("mouseup", mouseup);
        }
        else
        {
          $document.off("touchmove", mousemove);
          $document.off("touchend", mouseup);
        }
      }
    }
  });
});

medGesturesApp.directive("medOnTouch", function($parse)
{
  return ({
    restrict: "A",
    link: function(scope, elem, attrs)
    {
      var toExec = $parse(attrs.ngClick);
      var startX;
      var startY;

      elem.bind("touchstart", function(event)
      {
        startY = event.touches[0].clientY;
        event.preventDefault();
        startX = event.touches[0].clientX;
      });
      elem.bind("touchend", function(event)
      {
        event.preventDefault();
        if (startY + 10 >= event.changedTouches[0].clientY && startY - 10 <= event.changedTouches[0].clientY &&
            startX + 10 >= event.changedTouches[0].clientX && startX - 10 <= event.changedTouches[0].clientX)
            {
              console.log(toExec);
              toExec();
          }
      });
    }
  });
});
