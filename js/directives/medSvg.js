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
      var request = new XMLHttpRequest();

      request.onload = function() {
        if (request.status >= 200 && request.status < 400)
          element[0].innerHTML = request.responseText;
    };
    request.open("GET", scope.src, true);
    request.send();
    }
  });
});
