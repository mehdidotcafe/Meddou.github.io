var app = angular.module("medFadeOnLoadApp", []);

app.directive("medFadeOnLoad", function()
{
  return ({
    restrict: "A",
    link: function(scope, element)
    {
      var loader = document.createElement("div");
      var subloader = document.createElement("div");

      loader.className = "absolute uil-ring-css";
      loader.style.transform = "scale(0.6)";
      loader.insertAdjacentElement('afterBegin', subloader);

      element[0].style.opacity = "0";
      element[0].style.transition = "0.5s";
      element[0].insertAdjacentElement('beforebegin', loader);

      element.bind("load", function()
      {
        loader.remove();
        element[0].style.opacity = "1";
      });
    }
  });
});
