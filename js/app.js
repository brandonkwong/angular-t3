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

    // Board Win
    $scope.boardWin = [];

    if (lvl > 3) {
      $scope.win = 3;
    }
    else {
      $scope.win = lvl - 1;
    }

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
          wallL: true, // Clears Floats
          wallR: false,
          playerOne: false,
          playerTwo: false
        });
      }
      else if (i % lvl == lvl - 1) {
        $scope.board.push({
          index: '['+i+']',
          active: false,
          wallL: false,
          wallR: true,
          playerOne: false,
          playerTwo: false
        });
      }
      // Default Tile
      else {
        $scope.board.push({
          index: '['+i+']',
          active: false,
          wallL: false,
          wallR: false,
          playerOne: false,
          playerTwo: false
        });
      }
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
  $scope.tileScan = function(tile, player) {

    // Get Index of Clicked Tile
    var index = $scope.board.indexOf(tile);

    // Scan Variables
    var b = $scope.board;
    var grid = $scope.level * $scope.level;

    // Player Arrays
    $scope.playerRow = [];
    $scope.playerCol = [];
    $scope.playerDiL = [];
    $scope.playerDiR = [];

    // Row Scan
    for (var i = 1; i < grid; i++) {
      if (b[index + i] && b[index + i][player]) {
        if (b[index + i].wallL) {
          break;
        }
        else {
          $scope.playerRow.push(0);
        }
      }
      else {
        break;
      }
    }
    for (var i = 1; i < grid; i++) {
      if (b[index - i] && b[index - i][player]) {
        if (b[index - i].wallR) {
          break;
        }
        else {
          $scope.playerRow.push(0);
        }
      }
      else {
        break;
      }
    }

    // Column Scan
    for (var i = $scope.level; i < grid; i += $scope.level) {
      if (b[index + i] && b[index + i][player]) {
        $scope.playerCol.push(0);
      }
      else {
        break;
      }
    }
    for (var i = $scope.level; i < grid; i += $scope.level) {
      if (b[index - i] && b[index - i][player]) {
        $scope.playerCol.push(0);
      }
      else {
        break;
      }
    }

    // Diagonal Left Scan
    for (var i = ($scope.level + 1); i < grid; i += ($scope.level + 1)) {
      if (b[index + i] && b[index + i][player]) {
        if (b[index + i].wallL) {
          break;
        }
        else {
          $scope.playerDiL.push(0);
        }
      }
      else {
        break;
      }
    }
    for (var i = ($scope.level + 1); i < grid; i += ($scope.level + 1)) {
      if (b[index - i] && b[index - i][player]) {
        if (b[index - i].wallR) {
          break;
        }
        else {
          $scope.playerDiL.push(0);
        }
      }
      else {
        break;
      }
    }

    // Diagonal Right Scan
    for (var i = ($scope.level - 1); i < grid; i += ($scope.level - 1)) {
      if (b[index + i] && b[index + i][player]) {
        if (b[index + i].wallR) {
          break;
        }
        else {
          $scope.playerDiR.push(0);
        }
      }
      else {
        break;
      }
    }
    for (var i = ($scope.level - 1); i < grid; i += ($scope.level - 1)) {
      if (b[index - i] && b[index - i][player]) {
        if (b[index - i].wallL) {
          break;
        }
        else {
          $scope.playerDiR.push(0);
        }
      }
      else {
        break;
      }
    }

    // Win
    if ($scope.playerRow.length >= $scope.win) {
      $scope.boardStatus = 'Player Wins';
      $scope.boardActive = false;
    }
    else if ($scope.playerCol.length >= $scope.win) {
      $scope.boardStatus = 'Player Wins';
      $scope.boardActive = false;
    }
    else if ($scope.playerDiL.length >= $scope.win) {
      $scope.boardStatus = 'Player Wins';
      $scope.boardActive = false;
    }
    else if ($scope.playerDiR.length >= $scope.win) {
      $scope.boardStatus = 'Player Wins';
      $scope.boardActive = false;
    }
    // Tie
    else if ($scope.boardActive && $scope.boardWin.length == grid) {
      $scope.boardStatus = 'Both Players Tie';
      $scope.boardActive = false;
      $scope.gameInit = false;
    }

  };


  // Tile Click Function
  $scope.tileClick = function(tile, player) {

    if (tile.active == false) {
      $scope.boardWin.push(0);
      tile.active = true;
      switch ($scope.playerActive) {
        // Player 1 Actions on Click
        case 1:
          tile.playerOne = true;
          $scope.tileScan(tile, 'playerOne');
          if ($scope.boardActive) {
            $scope.boardStatus = 'Player Move';
            $scope.playerActive = 2;
          }
          break;
        // Player 2 Actions on Click
        case 2:
          tile.playerTwo = true;
          $scope.tileScan(tile, 'playerTwo');
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