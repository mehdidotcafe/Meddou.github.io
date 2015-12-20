var ppApp = angular.module("postParamsApp", []);

ppApp.directive("medPostParams", function($location)
{
  return ({
    restrict: "A",
    scope: {
      "varToGet": "@"
    },
    link: function($scope, $elem, $attrs)
    {
      var field;
      var value;
      var splittedNgModel;
      var i;

      if (($location.search() && (value = $location.search()[$scope.varToGet])))
        {
          if ($attrs.ngModel)
          {
            splittedNgModel = $attrs.ngModel.split(".");
            field = $scope.$parent;
            for (i = 0; i < splittedNgModel.length - 1; i++)
              field = field[splittedNgModel[i]];
            field[splittedNgModel[i]] = value;
          }
          $elem[0].value = value;
        }
    }
  });
});
