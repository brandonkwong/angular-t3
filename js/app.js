var t3App = angular.module('T3App', []);

t3App.controller('T3Controller', function($scope) {

  // Players
  $scope.playerActive = 1;
  $scope.playerOne = 0;
  $scope.playerTwo = 0;

  // Difficulty Level
  $scope.levelEasy = 3;
  $scope.levelNormal = 4;
  $scope.levelHard = 5;
  
  // Board Init
  $scope.boardInit = function(grid) {
    // Board Array
    $scope.board = [];

    // X Board Test
    $scope.playerX = [];

    for (var r = 0; r < grid; r++) {
      // Row Arrays
      var row = [];

      // X Rows Test
      var rowX = [];
      
      for (var c = 0; c < grid; c++) {
        // Tile Objects
        row.push(
          {
            key: '['+r+']'+'['+c+']',
            active: false,
            iconTimes: false,
            iconCircle: false,
            // iconHeart: false,
            icon: null,
            score: 0
          }
        );

        // X Tiles Test
        rowX.push(
          {
            icon: 'times'
          }
        );

      }

      $scope.board.push(row);

      // X Rows Push Test
      $scope.playerX.push(rowX);

    }
  }
  // To be implemented via ng-model or option
  $scope.boardInit($scope.levelEasy);


  // Function for Tiles
  $scope.tileIcon = function(tile) {

    if (tile.active == false) {
      tile.active = true;

      switch ($scope.playerActive) {
        // Player 1 Actions on Click
        case 1:
          tile.icon = 'times';
          tile.iconTimes = true;
          $scope.playerActive = 2;

          // Player X Win Testing
          // $scope.playerOne.push(0);

          // if ($scope.board[0][0].score == $scope.board.length) {
          //   alert('yes');
          // }
          // else {
          //   alert('nope');
          // }

          // console.log($scope.board[0][0].icon);
          // console.log($scope.playerX[0][0].icon);

          // for (var i = 0; i < $scope.board.length; i++)
          //   if ($scope.board[0][i].item == $scope.playerX[0][i].item) {
          //     alert('success');
          //   }
          //   else {
          //     alert('fail');
          //   }
          // }

          break;
        // Player 2 Actions on Click
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