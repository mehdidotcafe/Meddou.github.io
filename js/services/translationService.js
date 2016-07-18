var translation = angular.module("translationServiceApp", ["ngRoute"]);

translation.service("translationService", function($route, $rootScope, $location)
{
  var isFirst = true;
  var file = undefined;
  var scope;

  this.setLanguage = function(languageFile, opt)
  {
    var req = new XMLHttpRequest();

    if (!opt)
    {
      $location.path("/").search({lang: languageFile});
      location.reload();
    }
    req.open("GET", "lang/" + languageFile + ".json");
    req.onreadystatechange = function(event)
    {
      if (req.readyState == 4 && req.status >= 200 && req.status < 400)
        file = JSON.parse(req.responseText);
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
    function(keyAsString)
    {
      var keyAsArray = keyAsString.split(".");
      var id = keyAsArray[keyAsArray.length - 1];
      keyAsArray = keyAsArray.slice(0, -1);
      function parseJson(key, jsonField)
      {
        if (key[0])
          return (parseJson(key.slice(1), jsonField[key[0]]));
        return (jsonField[id] || keyAsString)
      }
      if (!translationService.getFile())
        return ("");
      return ($sce.trustAsHtml(parseJson(keyAsArray, translationService.getFile()).replace("*_", "<span class='keyword'>").replace("_*", "</span>")));
    });
}]);
