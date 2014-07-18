var t3App = angular.module('t3App', []);

t3App.controller('t3Controller', function($scope) {

  // Player
  $scope.playerActive = 1;

  // Difficulty Level
  $scope.levelEasy = 3;
  $scope.levelNormal = 4;
  $scope.levelHard = 5;
  
  // Board Init
  $scope.boardInit = function(grid) {
    $scope.board = [];
    
    for (var x = 0; x < grid; x++) {
      var row = [];
      
      for (var y = 0; y < grid; y++) {
        row.push(
          {
            key: '['+x+']'+'['+y+']',
            active: false,
            iconTimes: false,
            iconCircle: false,
            // iconHeart: false,
            icon: null
          }
        );
      }

      $scope.board.push(row);
    }
  }

  // To be implemented via ng-model or option
  $scope.boardInit($scope.levelHard);




  for (var i = 0; i < $scope.board.length; i++) {

    $scope.board[2][i].icon = 'HEY';

    if ($scope.board[2][i].icon == 'times') {
      alert('times wins');
    }

  }







  
  // WIN CONDITIONS
  // put into arrays [ rows ], [ cols ], [ diags ]

  // Function for Tiles
  $scope.tileIcon = function(tile) {

    if (tile.active == false) {
      tile.active = true;

      switch ($scope.playerActive) {
        case 1:
          tile.icon = 'times';
          tile.iconTimes = true;
          $scope.playerActive = 2;
          break;
        case 2:
          tile.icon = 'circle';
          tile.iconCircle = true;
          $scope.playerActive = 1;
          break;
        // case 3:
        //   tile.icon = 'heart';
        //   tile.iconHeart = true;
        //   $scope.playerActive = 1;
        //   break;
      }
    }
    else {
      alert('Don\'t do it, Bro');
    }
  };



});