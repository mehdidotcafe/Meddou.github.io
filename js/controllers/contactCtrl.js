var contactApp = angular.module("contactApp", []);

contactApp.controller("contactCtrl", function($scope, $timeout)
{
  $scope.isPlaying = false;
  var containerRect = document.getElementById("game");
  var FPS = 60;
  var player = {
    isDead: false,
    isJumping: false,
    player: document.getElementById("player"),
    hitbox: document.getElementById("hitbox"),
    score: 0,
    jumpValue: 50,
    jump: function()
    {
      if (player.jumpValue > 0)
      {
        --player.jumpValue;
        if (!player.player.style.marginTop) player.player.style.marginTop = '100px';
        player.player.style.marginTop = parseFloat(player.player.style.marginTop) - 1 + "px";
      }
      else
        {
          player.jumpValue = 50;
          player.isJumping = false;
        }
    },
    wall: function()
    {
      var legsRect = document.getElementById("legs").getBoundingClientRect();
      var headRect = document.getElementById("head").getBoundingClientRect();

      console.log(document.getElementById("game").offsetTop);
      console.log(headRect);
      legsRect.top -= containerRect.offsetTop + 80;
      headRect.top -= containerRect.top;
      // if (legsRect + parseInt(document.getElementById("legs").style.height) >= 400)
      // {
      //   console.log("mort");
      //   player.isDead = true;
      // }
      if (headRect.top <= 0)
      {
        console.log("mort");
        player.isDead = true;
      }
    },
    intersec: function(t1, t2)
    {

    },
    fall: function()
    {
      if (!player.player.style.marginTop) player.player.style.marginTop = '100px';
      player.player.style.marginTop = parseFloat(player.player.style.marginTop) + 2 + "px";
    }
  };

  $scope.jump = function()
  {
    if ($scope.isPlaying)
      player.isJumping = true;
  }

  $scope.doMailto = function()
  {
    window.location.href = "mailto:mehdi.meddour@epitech.eu?";
  }

  $scope.play = function()
  {

    function loop()
    {
      if (player.isJumping)
      {
        player.jump();
      }
      else
        player.fall();
      if (!player.isDead)
        $timeout(loop, 1000 / FPS);
    }
    $scope.isPlaying = true;
    loop();
  }
});
