var t3App = angular.module('T3App', []);

t3App.controller('T3Controller', function($scope) {

  // Player Active
  $scope.playerActive = 1;


  // Difficulty Level
  $scope.lvlNorm = 3;
  $scope.lvlHard = 4;
  $scope.lvlUlti = 5;
  

  // Board Init
  $scope.boardInit = function(lvl) {

    // Board Array
    $scope.board = [];
    $scope.level = lvl;

    var grid = lvl * lvl;

    // Tile Objects
    for (var i = 0; i < grid; i++) {
      // Left Wall Tile
      if (i % lvl == 0) {
        $scope.board.push({
          index: '['+i+']', // index for testing
          active: false,
          wall: true,
          wallLeft: true,
          wallRight: false,
          playerOne: false,
          playerTwo: false
        });
      }
      // Right Wall Tile
      else if (i % lvl == lvl - 1) {
        $scope.board.push({
          index: '['+i+']',
          active: false,
          wall: true,
          wallLeft: false,
          wallRight: true,
          playerOne: false,
          playerTwo: false
        });
      }
      // Default Tile
      else {
        $scope.board.push({
          index: '['+i+']',
          active: false,
          wall: false,
          wallLeft: false,
          wallRight: false,
          playerOne: false,
          playerTwo: false
        });
      }
    }

  }($scope.lvlNorm);


  // Win Init
  $scope.winInit = function(lvl) {

    // Player One
    $scope.pOneRow = [];
    $scope.pOneCol = [];
    $scope.pOneDia = [[],[]];

    // Player Two
    $scope.pTwoRow = [];
    $scope.pTwoCol = [];
    $scope.pTwoDia = [[],[]];

    for (var i = 0; i < lvl; i++) {
      var row = [];
      $scope.pOneRow.push(row);
      var col = [];
      $scope.pOneCol.push(col);
    }

    for (var j = 0; j < lvl; j++) {
      var row = [];
      $scope.pTwoRow.push(row);
      var col = [];
      $scope.pTwoCol.push(col);
    }

  }($scope.level);


  // Tile Scan for Wins
  $scope.tileScan = function(tile, pRow, pCol, pDia) {

    var index = $scope.board.indexOf(tile);

    // Push Clicks into Win Arrays for Rows and Cols
    for (var i = 0; i < $scope.level; i++) {
      for (var j = 0; j < $scope.level; j++) {
        if (index == j + ($scope.level * i)) {
          pRow[i].push(0);
          pCol[j].push(0);
        }
      }
    }

    // Push Clicks into Win Array for Left Diagonal
    for (var i = 0; i < $scope.level; i++) {
      if (index == i * ($scope.level + 1)) {
        pDia[0].push(0);
      }
    }

    // Push Clicks into Win Array for Right Diagonal
    for (var i = 0; i < $scope.level; i++) {
      if (index == (i + 1) * ($scope.level - 1)) {
        pDia[1].push(0);
      }
    }

    // Win Conditions for Rows and Cols
    for (var k = 0; k < $scope.level; k++) {
      // Row Win
      if (pRow[k].length == $scope.level) {
        alert('success');
      }
      // Col Win
      else if (pCol[k].length == $scope.level) {
        alert('success');
      }
    }

    // Win Conditions for Diagonals
    for (var l = 0; l < 2; l++) {
      if (pDia[l].length == $scope.level) {
        alert('success');
      }
    }

  };


  // Tile Click Function
  $scope.tileClick = function(tile) {

    if (tile.active == false) {
      tile.active = true;

      switch ($scope.playerActive) {
        // Player 1 Actions on Click
        case 1:
          tile.playerOne = true;
          $scope.playerActive = 2;
          $scope.tileScan(tile, $scope.pOneRow, $scope.pOneCol, $scope.pOneDia);
          break;
        // Player 2 Actions on Click
        case 2:
          tile.playerTwo = true;
          $scope.playerActive = 1;
          $scope.tileScan(tile, $scope.pTwoRow, $scope.pTwoCol, $scope.pTwoDia);
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