var medInputApp = angular.module("medInputApp", []);

medInputApp.directive("medRangeSelector", function()
{
  return ({
      restrict: "E",
      scope: {
        min: "=",
        max: "=",
        toFill: "=",
        color: "@",
        src: "@"
      },
      controller: function($scope, $element)
      {
        $scope.isClicked = false;
        $scope.stepAsArray = new Array($scope.max);

        for (var i = 0; i < $scope.max ; ++i)
          $scope.stepAsArray[i] = " ";
        $scope.setValue = function(val)
        {
          $scope.isClicked = true;
          if ($scope.toFill == val + $scope.min)
          {
            $scope.toFill = "";
            for (var i = 0; i <= $scope.max; ++i)
              angular.element($element[0].children[i]).css({fill: $scope.color});
          }
          else
            $scope.toFill = val + $scope.min;
        }
        this.hoverChildrenElements = function(index, color)
        {
          var colors = color.split('(')[1].split(')')[0].split(',');
          var r = parseInt(colors[0]);
          var g = parseInt(colors[1]);
          var b = parseInt(colors[2]);

          r = parseInt(r * (r > 225 ? 0.5 : 1.5));
          g = parseInt(g * (g > 225 ? 0.5 : 1.5));
          b = parseInt(b * (b > 225 ? 0.5 : 1.5));
          var i = -1;

          $scope.isClicked = false;
          colors = "rgb(" + r + ", " + g + ", " + b + ")";
          while (++i <= $scope.max)
          {
            if (i <= index)
              angular.element($element[0].children[i]).css({fill: colors});
            else
              angular.element($element[0].children[i]).css({fill: color});
          }
        };

        $element.bind("mouseleave", function()
        {
          var colors = $scope.color.split('(')[1].split(')')[0].split(',');
          var r = parseInt(colors[0]);
          var g = parseInt(colors[1]);
          var b = parseInt(colors[2]);

          r = parseInt(r * (r > 225 ? 0.5 : 1.5));
          g = parseInt(g * (g > 225 ? 0.5 : 1.5));
          b = parseInt(b * (b > 225 ? 0.5 : 1.5));
          var i = -1;

          colors = "rgb(" + r + ", " + g + ", " + b + ")";
          if ($scope.isClicked == false)
          {
            for (var i = 0; i <= $scope.max; ++i)
            {
              angular.element($element[0].children[i]).css({fill: colors});
              if (i >= $scope.toFill)
                angular.element($element[0].children[i]).css({fill: $scope.color});
            }
          }
        });

        this.unhoverChidrenElements = function(index, color)
        {
          if ($scope.isClicked == false)
          {
            for (var i = 0; i <= index; ++i)
              angular.element($element[0].children[i]).css({fill: color})
          }
        }
      },
    template: '<med-svg-in-range-selector ng-repeat="step in stepAsArray track by $index" ng-click="setValue($index)" med-on-touch src="{{src}}" idx={{$index}} color="{{color}}" set-value="setValue"></med-svg-in-range-selector>'
  });
});

medInputApp.directive("medSvgInRangeSelector", function()
{
  var cachedSvgs = [];

  return ({
    require: "^medRangeSelector",
    restrict: "E",
    scope: {
      color: "@",
      src: "@",
      setValue: "&"
    },
    link: function(scope, elem, attrs, rangeSelectorCtrl)
    {
      var color;
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
        var request = new XMLHttpRequest();

        request.onload = function()
        {
          if (request.status >= 200 && request.status < 400)
          {
            elem[0].innerHTML = request.responseText;
            cachedSvgs.push({src: scope.src, responseText: request.responseText});
          }
        }
        request.open("GET", scope.src, true);
        request.send();
      }


      if ((idx = cachedSvgsContains(scope.src)) == -1)
        getSvg();
      else
        elem[0].innerHTML = cachedSvgs[idx].responseText;
      elem.css({fill: scope.color});
      elem.bind("mouseenter", function()
      {
        rangeSelectorCtrl.hoverChildrenElements(attrs.idx, scope.color);
      });
    }
  });
});

medInputApp.directive("medRange", function()
{
  return ({
    restrict: "E",
    scope: {
      color: "@",
      val: "=",
      src: "@"
    },
    controller: function($scope, $element)
    {
      $scope.stepAsArray = new Array($scope.val);

      for (var i = 0; i < $scope.val; ++i)
      {
        $scope.stepAsArray[i] = " ";
      }
    },
    template: '<med-svg-in-range ng-repeat="step in stepAsArray track by $index" src="{{src}}" color="{{color}}"></med-svg-in-range>'
  });
});

medInputApp.directive("medSvgInRange", function()
{
  return ({
    require: "^medRange",
    restrict: "E",
    scope: {
      color: "@",
      src: "@"
    },
    link: function(scope, elem, attrs, medSelectorCtrl)
    {
      var request = new XMLHttpRequest();
      var color;

      request.onload = function()
      {
        if (request.status >= 200 && request.status < 400)
          elem[0].innerHTML = request.responseText;
      }
      request.open("GET", scope.src, true);
      request.send();

      elem.css({fill: scope.color});
    }
  })
})

medInputApp.directive("medSwitchSelector", function()
{
  return ({
    restrict: "E",
    scope: {
      colors: "=",
      imgs: "=",
      values: "=",
      toFill: "=",
      setValue: "&"
    },
    controller: function($scope, $element)
    {
      $scope.isClicked = false;

      $scope.setValue = function(val)
      {
        if ($scope.toFill != $scope.values[val])
          $scope.toFill = $scope.values[val];
        else
        {
          $scope.toFill = "";
          val = -1;
        }
        for (var i = 0; i <= $scope.values.length; ++i)
        {
          if (i == val)
            angular.element($element[0].children[i]).css({border: "2px solid "});
          else
            angular.element($element[0].children[i]).css({border: "2px solid rgba(0, 0, 0, 0)"});
        }
      }
      this.hoverChildrenElements = function(index, color)
      {
        var colors = color.split('(')[1].split(')')[0].split(',');
        var r = parseInt(colors[0]);
        var g = parseInt(colors[1]);
        var b = parseInt(colors[2]);

        r = parseInt(r * (r > 225 ? 0.5 : 1.5));
        g = parseInt(g * (g > 225 ? 0.5 : 1.5));
        b = parseInt(b * (b > 225 ? 0.5 : 1.5));
        $scope.isClicked = false;
        colors = "rgb(" + r + ", " + g + ", " + b + ")";
        angular.element($element[0].children[index]).css({fill: colors});
      };
    },
    template: '<med-svg-in-switch-selector ng-repeat="img in imgs track by $index" src="{{img}}" color={{colors[$index]}} idx="$index" ng-click="setValue($index)" med-on-touch set-value={{setValue}}></med-svg-in-switch-selector>'
  });
});

medInputApp.directive("medSvgInSwitchSelector", function()
{
  return ({
    require: "^medSwitchSelector",
    restrict: "E",
    scope: {
      idx: "=",
      color: "@",
      src: "@"
    },
    link: function(scope, elem, attrs, medSwitchSelectorCtrl)
    {
      var request = new XMLHttpRequest();
      var color;

      request.onload = function()
      {
        if (request.status >= 200 && request.status < 400)
          elem[0].innerHTML = request.responseText;
      }
      request.open("GET", scope.src, true);
      request.send();

      elem.css({fill: scope.color});
      elem.bind("mouseenter", function()
      {
        medSwitchSelectorCtrl.hoverChildrenElements(scope.idx, scope.color);
      });
      elem.bind("mouseleave", function()
      {
        elem.css({fill: scope.color});
      });
    }
  });
});

medInputApp.directive("medFocusable", function()
{
  return ({
    restrict: "A",
    link: function(scope, elem, attrs)
    {
      elem.bind("click", function()
      {
        elem[0].focus();
      });
      elem.bind("touchend", function()
      {
        elem[0].focus();
      });
    }
  });
});
