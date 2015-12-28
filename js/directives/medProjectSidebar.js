var medProjectSidebarApp = angular.module("medProjectSidebarApp", []);

medProjectSidebarApp.directive("medProjectSidebar", function()
{
  return ({
    scope: {
      visibleSidebar: "=visibilityVar",
      projectModel: "="
    },
    transclude: true,
    link: function(scope, element, attrs)
    {
      scope.changeVisibility = function()
      {
        scope.visibleSidebar = !scope.visibleSidebar;
      };
    },
    templateUrl: "templates/projectSidebar.html"
  });
});
