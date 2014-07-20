var t3App = angular.module('T3App', []);

t3App.controller('T3Controller', function($scope) {

  // Players
  $scope.playerActive = 1;
  $scope.playerOne = 0;
  $scope.playerTwo = 0;

  // Difficulty Level
  $scope.levelNorm = 3;
  $scope.levelHard = 4;
  $scope.levelUlti = 5;
  
  // Board Init
  $scope.boardInit = function(grid) {
    // Board Array
    $scope.board = [];
    // Row For-loop
    for (var i = 0; i < grid; i++) {
      // Row Array
      var row = [];
      // Tile For-loop
      for (var j = 0; j < grid; j++) {
        // Push Tiles into Row
        row.push(
          {
            key: '['+i+']'+'['+j+']',
            active: false,
            playerOne: false,
            playerTwo: false
          }
        );
      }
      // Push Rows into Board
      $scope.board.push(row);
    }
  }($scope.levelNorm);


  // Tile function
  $scope.keyClick = function(tile) {
    if (tile.active == false) {
      tile.active = true;
      switch ($scope.playerActive) {
        // Player 1 Actions on Click
        case 1:
          tile.playerOne = true;
          $scope.playerActive = 2;
          break;
        // Player 2 Actions on Click
        case 2:
          tile.playerTwo = true;
          $scope.playerActive = 1;
          break;
        // case 3:
        //   tile.playerThree = true;
        //   $scope.playerActive = 1;
        //   break;
      }
    }
    else {
      alert('Don\'t do it, Bro');
    }
  };

});