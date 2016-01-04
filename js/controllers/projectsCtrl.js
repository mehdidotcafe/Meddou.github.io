var projectApp = angular.module("projectsCtrl", ["indexingServiceApp", "postParamsApp"])

projectApp.controller("projectsCtrl", function($scope, indexingService, $location)
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
    ico: "",
    downloadLink: "",
    description: []
  };
  $scope.projects = {};

  $scope.setProject = function(project)
  {
    $scope.currentProject = project;
    indexingService.goToIndex(1);
  };

  $scope.getProjects = function()
  {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "./resources/projects.json", true);
    xhr.onload = function(event)
    {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400)
      {
        $scope.projects = JSON.parse(xhr.responseText);
        for (var key in $scope.projects)
        {
          $scope.currentProject = $scope.projects[key];
          break;
        }
      }
      else
        $scope.projects = {};
      $scope.$digest();
    }
    xhr.send();
  }
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
              || ((typeof(projectModel[key]) == "string") && typeof(project[key]) == "string" && projectModel[key] != "" && project[key].toLowerCase().indexOf(projectModel[key].toLowerCase())))
                isGood = false;
                else if (key == "language" && projectModel[key])
                {
                  var maybeIsGood = false;
                  for (var i = 0; i < project.language.length; i++)
                  {
                    if (project.language[i].toLowerCase().indexOf(projectModel.language.toLowerCase()) == 0)
                      maybeIsGood = true;
                  }
                  if (!maybeIsGood) isGood = false;
                }
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
              if (project.hasOwnProperty(key) && (typeof(projectModel[key]) == "number"
              && projectModel[key] != -1 && project[key] != projectModel[key])
              || ((typeof(projectModel[key]) == "string") && typeof(project[key]) == "string" && projectModel[key] != "" && project[key].toLowerCase().indexOf(projectModel[key].toLowerCase())))
                isGood = false;
              else if (key == "language" && projectModel[key])
              {
                var maybeIsGood = false;
                for (var i = 0; i < project.language.length; i++)
                {
                  if (project.language[i].toLowerCase().indexOf(projectModel.language.toLowerCase()) == 0)
                    maybeIsGood = true;
                }
                if (!maybeIsGood) isGood = false;
              }
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
