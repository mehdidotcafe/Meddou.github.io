var llApp = angular.module("medLazyLoadApp", []);

llApp.directive("medLazyLoad", function($timeout)
{
  return ({
    restrict: "A",
    scope: {
      fx: "&medLazyLoad"
    },
    link: function($scope, $elem)
    {
      var isVisible = false;
      var isFirstTime = true;

      $scope.$watch(function()
      {
        var elemLeft = $elem[0].offsetLeft;
        var elemRight = elemLeft + $elem[0].offsetWidth;

        return ((elemLeft >= 0 && elemLeft < window.innerWidth && !isVisible));
      },
      function(nval, oldval)
      {
        if (nval == true)
        {
          isVisible = true;
          $scope.fx && $scope.fx();
        }
        else
          isFirstTime = false;
      });
    }
  });
});
