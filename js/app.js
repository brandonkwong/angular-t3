var t3App = angular.module('T3App', ['firebase']);

t3App.controller('T3Controller', ['$scope', '$firebase', function($scope, $firebase) {

  // Players
  $scope.playerId;
  $scope.playerInit = 0;


  // Player Set Function
  $scope.playerSet = function(player) {
    switch (player) {
      case 1:
        $scope.playerId = 1;
        $scope.playerInit = 1;
        break;
      case 2:
        $scope.playerId = 2;
        $scope.playerInit = 2;
        break;
    }
  };


  // Difficulty Level
  $scope.lvlNorm = 3;
  $scope.lvlHard = 4;
  $scope.lvlExp = 5;


  // Board Setup Function
  $scope.boardSetup = function(lvl) {

    // Game Setup
    $scope.gameInit = true;
    $scope.boardActive = true;
    $scope.boardStatus = 'Player Move';
    $scope.playerActive = Math.floor((Math.random() * 2) + 1);
    $scope.level = lvl;

    // Board Score
    $scope.boardScore = {tileCount: 0};
    $scope.winScore;

    // Win Score Set by Level
    if (lvl > 3) {
      $scope.winScore = 3;
    }
    else {
      $scope.winScore = lvl - 1;
    }

    // Board Array
    $scope.board = [];

    var grid = lvl * lvl;

    // Tile Objects
    for (var i = 0; i < grid; i++) {
      // Clear Tile
      if (i % lvl === 0) {
        $scope.board.push({
          index: i,
          active: false,
          wallL: true, // Clears floats to break into rows
          wallR: false,
          playerOne: false,
          playerTwo: false
        });
      }
      else if (i % lvl === lvl - 1) {
        $scope.board.push({
          index: i,
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
          index: i,
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
    $scope.boardSetup($scope.lvlNorm);
    $scope.gameInit = false;
    $scope.boardActive = false;
    $scope.boardStatus = 'Select Difficulty to Start';
    $scope.playerActive = 0;
  }();


  // Tile Scan Function for Win Conditions
  $scope.tileScan = function(tile, player) {

    // Scan Variables
    var b = $scope.board;
    var index = tile.index;
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

    // Win Conditions
    if ($scope.playerRow.length >= $scope.winScore) {
      $scope.boardStatus = 'Player Wins';
      $scope.boardActive = false;
    }
    else if ($scope.playerCol.length >= $scope.winScore) {
      $scope.boardStatus = 'Player Wins';
      $scope.boardActive = false;
    }
    else if ($scope.playerDiL.length >= $scope.winScore) {
      $scope.boardStatus = 'Player Wins';
      $scope.boardActive = false;
    }
    else if ($scope.playerDiR.length >= $scope.winScore) {
      $scope.boardStatus = 'Player Wins';
      $scope.boardActive = false;
    }
    // Tie Condition
    else if ($scope.boardActive && $scope.boardScore.tileCount === grid) {
      $scope.boardStatus = 'Both Players Tie';
      $scope.boardActive = false;
      $scope.gameInit = false;
    }

  };


  // Tile Click Function
  $scope.tileClick = function(tile, player) {

    if (!tile.active) {
      switch ($scope.playerActive) {
        // Player 1 Actions on Click
        case 1:
          if ($scope.playerId === 1) {
            $scope.boardScore.tileCount++;
            tile.active = true;
            tile.playerOne = true;
            $scope.tileScan(tile, 'playerOne');
            if ($scope.boardActive) {
              $scope.playerActive = 2;
              $scope.boardStatus = 'Player Move';
            }
          }
          break;
        // Player 2 Actions on Click
        case 2:
          if ($scope.playerId === 2) {
            $scope.boardScore.tileCount++;
            tile.active = true;
            tile.playerTwo = true;
            $scope.tileScan(tile, 'playerTwo');
            if ($scope.boardActive) {
              $scope.playerActive = 1;
              $scope.boardStatus = 'Player Move';
            }
          }
          break;
      }
    }
    else {
      $scope.boardActive = true;
    }

  };


  // Firebase URL References
  var url = 'https://test-ttt-08.firebaseio.com/';
  var t3Ref = new Firebase(url);
  var boardRef = new Firebase(url + 'board');
  var playerRef = new Firebase(url + 'player');
  var playerInitRef = new Firebase(url + 'player-init');
  var levelRef = new Firebase(url + 'level');
  var statusRef = new Firebase(url + 'status');

  // Firebase Remote References
  $scope.remoteBoard = $firebase(new Firebase(url + 'board'));
  $scope.remoteBoardActive = $firebase(new Firebase(url + 'boardActive'));
  $scope.remoteBoardScore = $firebase(new Firebase(url + 'boardScore'));
  $scope.remoteGameInit = $firebase(new Firebase(url + 'gameInit'));
  $scope.remoteLevel = $firebase(new Firebase(url + 'level'));
  $scope.remotePlayer = $firebase(new Firebase(url + 'player'));
  $scope.remotePlayerInit = $firebase(new Firebase(url + 'player-init'));
  $scope.remoteStatus = $firebase(new Firebase(url + 'status'));
  $scope.remoteWinScore = $firebase(new Firebase(url + 'winScore'));
 
  // Firebase Bindings
  $scope.remoteBoard.$bind($scope, 'board');
  $scope.remoteBoardActive.$bind($scope, 'boardActive');
  $scope.remoteBoardScore.$bind($scope, 'boardScore');
  $scope.remoteGameInit.$bind($scope, 'gameInit');
  $scope.remoteLevel.$bind($scope, 'level');
  $scope.remotePlayer.$bind($scope, 'playerActive');
  $scope.remotePlayerInit.$bind($scope, 'playerInit');
  $scope.remoteStatus.$bind($scope, 'boardStatus');
  $scope.remoteWinScore.$bind($scope, 'winScore');

  // On Disconnect
  boardRef.onDisconnect().remove();
  playerRef.onDisconnect().set(0);
  playerInitRef.onDisconnect().set(0);
  levelRef.onDisconnect().set(3);
  statusRef.onDisconnect().set('Select Difficulty to Start');

  // Notes: Reset Player Tile on Disconnect and Update URL Refs


}]);