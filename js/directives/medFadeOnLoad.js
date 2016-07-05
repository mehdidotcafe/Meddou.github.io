var app = angular.module("medFadeOnLoadApp", []);

app.directive("medFadeOnLoad", function()
{
  return ({
    restrict: "A",
    link: function(scope, element)
    {
      element[0].style.opacity = "0";
      element[0].style.transition = "0.5s";
      element.bind("load", function()
      {
        element[0].style.opacity = "1";
      });
    }
  });
});
