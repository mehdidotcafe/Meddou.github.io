var translation = angular.module("translationServiceApp", []);

translation.service("translationService", function()
{
  var file = undefined;
  var scope;

  this.setLanguage = function(languageFile)
  {
    var req = new XMLHttpRequest();

    req.open("GET", "resources/languages/" + languageFile.toLowerCase() + ".json");
    req.onreadystatechange = function(event)
    {
      if (req.readyState == 4 && req.status >= 200 && req.status < 400)
      {
        file = JSON.parse(req.responseText);
      }
    }
    req.send(null);
  }

  this.setScope = function(newScope)
  {
    scope = newScope;
  }

  this.getFile = function()
  {
    return (file);
  }
});

translation.filter("translate", ["translationService", "$sce", function(translationService, $sce)
{
  return (
    function(key)
    {
      return ($sce.trustAsHtml(translationService.getFile()[key] || key));
    });
}]);
