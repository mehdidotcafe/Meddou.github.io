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

medAnimationApp.directive("medImageSwitch", function($timeout)
{
  return ({
    restrict: "E",
    scope: {
      imgs: "=",
      delay: "=",
      path: "@",
      extension: "@"
    },
    template: "<img id='first-img' class='img-cover'></img><img id='second-img' class='img-cover'></img>",
    link: function(scope, elem)
    {
      var idx = 0;
      var firstImg = document.getElementById("first-img");
      var secondImg = document.getElementById("second-img");

      function changeImg()
      {
        var nextIdx = (idx + 1) % scope.imgs.length;

        if (scope.imgs.length > 0)
        {
          if (idx % 2)
          {
            firstImg.setAttribute("src", scope.path + scope.imgs[idx] + '.' + scope.extension);
            firstImg.style.opacity = "1";
            secondImg.style.opacity = "0";
          }
          else
          {
            secondImg.setAttribute("src", scope.path + scope.imgs[idx] + '.' + scope.extension);
            firstImg.style.opacity = "0";
            secondImg.style.opacity = "1";
          }
        if (++idx >= scope.imgs.length)
          idx = 0;
        }
      }

      scope.$watch("imgs", changeImg);
      setInterval(changeImg, parseInt(scope.delay));
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
      }

      elem[0].innerHTML = scope.words[0];
      innerWord();
      setInterval(innerWord, parseInt(scope.delay) + 1000);
    }
  })
});
