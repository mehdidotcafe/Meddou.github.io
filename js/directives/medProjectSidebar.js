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
        console.log(scope.visibleSidebar);
        scope.visibleSidebar = !scope.visibleSidebar;
      };
    },
    templateUrl: "templates/projectSidebar.html"
  });
});
