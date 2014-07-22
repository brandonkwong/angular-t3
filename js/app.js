var t3App = angular.module('T3App', []);

t3App.controller('T3Controller', function($scope) {

  // Player Active
  $scope.playerActive = 1;


  // Difficulty Level
  $scope.lvlNorm = 3;
  $scope.lvlHard = 4;
  $scope.lvlUlti = 5;


  // Board Init Function
  $scope.boardInit = function(lvl) {

    // Board Array
    $scope.board = [];
    $scope.level = lvl;

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

    // Board Active
    $scope.boardActive = [];

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

  // Board Init Default
  $scope.boardInit($scope.lvlNorm);


  // Tile Scan Function for Win Conditions
  $scope.tileScan = function(tile, row, col, dia, player) {

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
        alert(player + ' WINS');
      }
      else if (col[k].length == $scope.level) {
        alert(player + ' WINS');
      }
    }

    // Diagonal Wins
    for (var l = 0; l < 2; l++) {
      if (dia[l].length == $scope.level) {
        alert(player + ' WINS');
      }
    }

    // Tie
    if ($scope.boardActive.length == ($scope.level * $scope.level)) {
      alert('TIE');
    }

  };


  // Tile Click Function
  $scope.tileClick = function(tile) {

    if (tile.active == false) {
      $scope.boardActive.push(0);
      tile.active = true;
      switch ($scope.playerActive) {
        // Player 1 Actions on Click
        case 1:
          tile.playerOne = true;
          $scope.tileScan(tile, $scope.pOneRow, $scope.pOneCol, $scope.pOneDia, 'PLAYER 1');
          $scope.playerActive = 2;
          break;
        // Player 2 Actions on Click
        case 2:
          tile.playerTwo = true;
          $scope.tileScan(tile, $scope.pTwoRow, $scope.pTwoCol, $scope.pTwoDia, 'PLAYER 2');
          $scope.playerActive = 1; // Change to 3 for Player 3
          break;
        // Player 3 Actions on Click
        // case 3:
        //   tile.playerThree = true;
        //   $scope.tileScan(tile, $scope.pThreeRow, $scope.pThreeCol, $scope.pThreeDia, 'PLAYER 3');
        //   $scope.playerActive = 1;
        //   break;
      }
    }
    else {
      alert('Don\'t do it, Bro');
    }

  };


});