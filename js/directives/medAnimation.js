var medAnimationApp = angular.module("medAnimationApp", []);

medAnimationApp.directive("medRotateOnHover", function()
{
  return ({
    restrict: "A",
    link: function(scope, element)
    {
      element.bind("mouseenter", function()
      {
        if (element[0].classList.contains("rotateOnHoverReverse"))
        {
          element[0].classList.remove("rotateOnHoverReverse");
          element[0].classList.add("rotateOnHover");
        }
        else
        {
          element[0].classList.remove("rotateOnHover");
          element[0].classList.add("rotateOnHoverReverse");
        }
      });
    }
  })
});

medAnimationApp.directive("medWordSwitch", function($timeout)
{
  return ({
    restrict: "E",
    scope: {
      delay: "=",
      words: "=",
      parentClass: "@"
    },
    link: function(scope, elem)
    {
      var idx = 1;

      function addWord()
      {
        elem[0].innerHTML = scope.words[idx];
        elem[0].style.opacity = "1";
        if (++idx >= scope.words.length)
          idx = 0;
      }

      function innerWord()
      {
        if (document.getElementsByClassName("presentation")[0] && document.getElementsByClassName("presentation")[0].classList.contains(scope.parentClass))
        {
          elem[0].style.opacity = "0";
          $timeout(addWord, 500);
        }
        // $timeout(innerWord, parseInt(scope.delay) + 1000);
      }

      elem[0].innerHTML = scope.words[0];
      innerWord();
      setInterval(innerWord, parseInt(scope.delay) + 1000);
    }
  })
});
