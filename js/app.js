var t3App = angular.module('T3App', []);

t3App.controller('T3Controller', ['$scope', function($scope) {

  // Difficulty Level
  $scope.lvlNorm = 3;
  $scope.lvlHard = 4;
  $scope.lvlExp = 5;
  

  // Board New Function
  $scope.boardNew = function(lvl) {

    // Game Setup
    $scope.gameInit = true;
    $scope.boardActive = true;
    $scope.boardStatus = 'Player Move';
    $scope.playerActive = 1;
    $scope.level = lvl;

    // Board Array
    $scope.board = [];

    var grid = lvl * lvl;

    // Tile Objects
    for (var i = 0; i < grid; i++) {
      // Clear Tile
      if (i % lvl == 0) {
        $scope.board.push({
          index: '['+i+']', // Index for Testing
          active: false,
          clear: true, // Clears Floats
          playerOne: false,
          playerTwo: false
        });
      }
      // Default Tile
      else {
        $scope.board.push({
          index: '['+i+']',
          active: false,
          clear: false,
          playerOne: false,
          playerTwo: false
        });
      }
    }

    // Board Win Array
    $scope.boardWin = [];

    // Player One Arrays
    $scope.pOneRow = [];
    $scope.pOneCol = [];
    $scope.pOneDia = [[],[]];

    for (var i = 0; i < lvl; i++) {
      var row = [];
      var col = [];
      $scope.pOneRow.push(row);
      $scope.pOneCol.push(col);
    }

    // Player Two Arrays
    $scope.pTwoRow = [];
    $scope.pTwoCol = [];
    $scope.pTwoDia = [[],[]];

    for (var j = 0; j < lvl; j++) {
      var row = [];
      var col = [];
      $scope.pTwoRow.push(row);
      $scope.pTwoCol.push(col);
    }

  };


  // Board Init
  $scope.boardInit = function() {
    $scope.boardNew($scope.lvlNorm);
    $scope.gameInit = false;
    $scope.boardActive = false;
    $scope.boardStatus = 'Select Difficulty to Start';
    $scope.playerActive = 0;
  }();


  // Tile Scan Function for Win Conditions
  $scope.tileScan = function(tile, row, col, dia) {

    // Get Index of Clicked Tile
    var index = $scope.board.indexOf(tile);

    // Push Clicks into Win Arrays for Rows and Cols
    for (var i = 0; i < $scope.level; i++) {
      for (var j = 0; j < $scope.level; j++) {
        if (index == j + ($scope.level * i)) {
          row[i].push(0);
          col[j].push(0);
        }
      }
    }

    // Push Clicks into Win Arrays for Left Diagonal
    for (var i = 0; i < $scope.level; i++) {
      if (index == i * ($scope.level + 1)) {
        dia[0].push(0);
      }
    }

    // Push Clicks into Win Arrays for Right Diagonal
    for (var i = 0; i < $scope.level; i++) {
      if (index == (i + 1) * ($scope.level - 1)) {
        dia[1].push(0);
      }
    }

    // Row and Column Wins
    for (var k = 0; k < $scope.level; k++) {
      if (row[k].length == $scope.level) {
        $scope.boardStatus = 'Player Wins';
        $scope.boardActive = false;
      }
      else if (col[k].length == $scope.level) {
        $scope.boardStatus = 'Player Wins';
        $scope.boardActive = false;
      }
    }

    // Diagonal Wins
    for (var l = 0; l < 2; l++) {
      if (dia[l].length == $scope.level) {
        $scope.boardStatus = 'Player Wins';
        $scope.boardActive = false;
      }
    }

    // Tie
    if ($scope.boardWin.length == ($scope.level * $scope.level)) {
      if ($scope.boardActive) {
        $scope.boardStatus = 'Both Players Tie';
        $scope.boardActive = false;
        $scope.gameInit = false;
      }
    }

  };


  // Tile Click Function
  $scope.tileClick = function(tile) {

    if (tile.active == false) {
      $scope.boardWin.push(0);
      tile.active = true;
      switch ($scope.playerActive) {
        // Player 1 Actions on Click
        case 1:
          tile.playerOne = true;
          $scope.tileScan(tile, $scope.pOneRow, $scope.pOneCol, $scope.pOneDia);
          if ($scope.boardActive) {
            $scope.boardStatus = 'Player Move';
            $scope.playerActive = 2;
          }
          break;
        // Player 2 Actions on Click
        case 2:
          tile.playerTwo = true;
          $scope.tileScan(tile, $scope.pTwoRow, $scope.pTwoCol, $scope.pTwoDia);
          if ($scope.boardActive) {
            $scope.playerActive = 1;
            $scope.boardStatus = 'Player Move';
          }
          break;
      }
    }
    else {
      $scope.boardActive = true;
    }

  };


}]);