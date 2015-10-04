var contactApp = angular.module("contactApp", []);

contactApp.controller("contactCtrl", function($scope)
{
  $scope.info = {
    name: "",
    subject: "",
    mail: "",
    email: ""
  };

  $scope.doMailto = function()
  {
    var mailto = "mailto:meddegivet@hotmail.fr?";

    if ($scope.info.subject)
      mailto += "subject=" + escape($scope.info.subject);
    if ($scope.info.mail)
      mailto += "&body=" + $scope.info.mail;
    // if ($scope.info.email)
    //   mailto += "body=" + $scope.info.subject + "&";
    // if ($scope.info.subject)
    //   mailto += "subject=" + $scope.info.subject;

    console.log(mailto);
    window.location.href = mailto;
  }

  $scope.sendMail = function()
  {
    if (!$scope.name || !$scope.subject || !$scope.email)
      return ;
    var req = XMLHttpRequest();

    req.open("POST", "https://mandrillapp.com/api/1.0/messages/send.json")
  }
});
