var projectApp = angular.module("projectsCtrl", ["indexingServiceApp"])

projectApp.controller("projectsCtrl", function($scope, indexingService)
{
  $scope.visibleSidebar = true;
  $scope.currentProject = undefined;
  $scope.unmatchedProject = [];
  $scope.filteredProject = [];
  $scope.projectModel = {
    name: "",
    language: "",
    time: -1,
    difficulty: "",
    context: "",
    numberPerson: -1,
    love: -1,
    color: "",
    img: "",
    ico: "",
    downloadLink: "",
    description: []
  };

  $scope.setProject = function(project)
  {
    $scope.currentProject = project;
    indexingService.goToIndex(1);
  };
});

projectApp.filter("filterProject", function()
{
  return (
    function(projects, $scope)
    {
      var projectModel = $scope.projectModel;
      var res = {};
      var isGood;
      var position = 0;

      if (!$scope.unmatchedProject[0] && !$scope.filteredProject[0])
      {
        angular.forEach(projects, function(project)
        {
          isGood = true;
          for (var key in project)
          {
              if (project.hasOwnProperty(key) && (typeof(projectModel[key]) == "number" && projectModel[key] != -1 && project[key] != projectModel[key])
              || ((typeof(projectModel[key]) != "number") && projectModel[key] != "" && project[key].toLowerCase().indexOf(projectModel[key].toLowerCase())))
                isGood = false;
          }
          if (isGood == true)
            res[position++] = project;
          else
            $scope.unmatchedProject.push(project);
        });
      }
      else
      {
        var unmatched = [];

        function checkProjectArray(project)
        {
          isGood = true;
          for (var key in project)
          {
              if (project.hasOwnProperty(key) && (typeof(projectModel[key]) == "number" && projectModel[key] != -1 && project[key] != projectModel[key])
              || ((typeof(projectModel[key]) != "number") && projectModel[key] != "" && project[key].toLowerCase().indexOf(projectModel[key].toLowerCase())))
                isGood = false;
          }
          if (isGood == true)
            res[position++] = project;
          else
            unmatched.push(project);
        }
        angular.forEach($scope.filteredProject, checkProjectArray);
        angular.forEach($scope.unmatchedProject, checkProjectArray);
        $scope.unmatchedProject = unmatched;
      }
      $scope.filteredProject = res;
      return (res);
    });
});
