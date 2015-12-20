var medSvgApp = angular.module("medSvgApp", []);

medSvgApp.directive("medSvg", function()
{
  return ({
    restrict: "E",
    transclude: false,
    scope: {
      src: "@",
    },
    link: function(scope, element)
    {
      var request;
      var newImg;

      if (scope.src.indexOf(".svg") != -1)
      {
        request = new XMLHttpRequest();
        request.onload = function() {
          if (request.status >= 200 && request.status < 400)
            element[0].innerHTML = request.responseText;
        };
        request.open("GET", scope.src, true);
        request.send();
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
