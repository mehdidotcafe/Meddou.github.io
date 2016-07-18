var medSvgApp = angular.module("medSvgApp", []);

medSvgApp.directive("medSvg", function($cacheFactory)
{
  var cachedSvgs = [];

  return ({
    restrict: "E",
    transclude: false,
    scope: {
      src: "@",
    },
    link: function(scope, element)
    {
      var newImg;
      var idx;

      function cachedSvgsContains(src)
      {
        var i = 0;

        cachedSvgs.forEach(function(svg)
        {
          if (svg.src == src)
            return (i);
          ++i;
        });
        return (-1);
      }

      function getSvg()
      {
        var request;

        request = new XMLHttpRequest();
        request.onload = function() {
        if (request.status >= 200 && request.status < 400)
          {
            element[0].innerHTML = request.responseText;
            cachedSvgs.push({src: scope.src, responseText: request.responseText});
          }
        };
        request.open("GET", scope.src, true);
        request.send();
      }

      if (scope.src.indexOf(".svg") != -1)
      {
        if ((idx = cachedSvgsContains(scope.src)) == -1)
          getSvg();
        else
          element[0].innerHTML = cachedSvgs[idx].responseText;
      }
      else
      {
        newImg = document.createElement("img");
        newImg.setAttribute("src", scope.src);
        element[0].appendChild(newImg);
      }
    }
  });
});
