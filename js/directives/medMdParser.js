var mdParser = angular.module("medMdParserApp", []);

mdParser.directive("medHtmlInsert", function()
{
  return ({
    link: function(scope, elem)
    {
      function appendElement(toCreate, toInner)
      {
        var new_elem = document.createElement(toCreate);

        toInner && (new_elem.innerHTML = toInner);
        elem.append(new_elem);
      }

      function parseFromJsonObject(file, title, date)
      {
        elem.empty();
        appendElement("h3", title);
        appendElement("h4", date);
        appendElement("hr");
        appendElement("p", file);

      }

      scope.$watch(function()
      {
        return (scope.currentArticle);
      }, function(file)
      {
        if (file)
          {
            var req = new XMLHttpRequest();

            req.open("GET", "resources/blog/" + file.src + ".html", true);
            req.onreadystatechange = function(e)
            {
              if (req.readyState == 4 && req.status >= 200 && req.status < 400)
                parseFromJsonObject(req.responseText, file.title, file.date);
            }
            req.send(null);
          }
      });
    }
  })
})
