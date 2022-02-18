let realWidth; resizeElem(); let player = "X"; let gameMode = '2 players';
let origBoard; const aiPlayer = '🤖'; const huPlayer = 'X';
const winCombos = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[6, 4, 2]]
origBoard = Array.from(Array(9).keys());
$(window).resize(resizeElem);
$('#aibtn').html("Game mode: " + gameMode);
gameMode == 'AI' ? $("#info").html("Player X vs A.I.") : $("#info").html("Next player: " + player);

$('#restartBtn').click(restart)

$('.switch-button').click( () => {
  if (gameMode == '2 players') {
    gameMode = 'AI';
    restart();
    $("#info").html("Player X vs A.I.");
  } else {
    gameMode = '2 players'
    restart();
  }
});

$('.cell').click(onClick)

function onClick() {
  if (gameMode == '2 players') {
    if (this.innerHTML == "") {
      player == 'X' ? this.innerHTML = "X" : this.innerHTML = "O";
      origBoard[this.id] = player;
      let gameWon = checkWin(origBoard, player)
      if (gameWon) {
        endGame(gameWon);
      } else {
        player = player == "X" ? "O" : "X";
        if (emptyCells().length == 0) { endGame(gameWon) };
        $("#info").html("Next player: " + player);
      }
    }
  } else { // AI gameMode
    if (this.innerHTML == "") {
      this.innerHTML = huPlayer;
      origBoard[this.id] = huPlayer;
      let gameWon = checkWin(origBoard, huPlayer);
      if (gameWon || emptyCells().length == 0) {
        endGame(gameWon);
      } else { // AI turn
        setTimeout(AIturn, 200);
        function AIturn() {
          sqr(bestSpot()).innerHTML = aiPlayer;
          origBoard[bestSpot()] = aiPlayer;
          let gameWon = checkWin(origBoard, aiPlayer);
          if (gameWon) endGame(gameWon);
        }
      }
    }
  }
}

function sqr(i) {return document.getElementById(i)}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) =>
      (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
          gameWon = { index: index, player: player };
          break;
      }
  }
  return gameWon;
}

function endGame(checkWin) {
  if (emptyCells().length == 0) {
      $("#modal_text").html("Tie  game !");
      $("#modal").css({display: "block"});
  } else {
    for (let i of winCombos[checkWin.index]) sqr(i).style.background = "rgba(255, 0, 0, 0.3)";
    $("#modal_text").html(`Player  ${checkWin.player}  wins !`);
    $("#modal").css({display: "block"});
  }
}

function restart() {
  $('.cell').html("");
  $('.cell').css({background: 'rgba(255, 255, 255, 0.2)'});
  player = "X";
  $("#modal").css({display: "none"});
  origBoard = Array.from(Array(9).keys());
  gameMode == 'AI' ? $("#info").html("Player X vs A.I.") : $("#info").html("Next player: " + player);
}

function emptyCells() {
  return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
  return minimax(origBoard, aiPlayer).index;
}

function minimax(newBoard, player) {
  var availSpots = emptyCells();

  if (checkWin(newBoard, huPlayer)) {
      return { score: -10 };
  } else if (checkWin(newBoard, aiPlayer)) {
      return { score: 10 };
  } else if (availSpots.length === 0) {
      return { score: 0 };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
      var move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player;

      if (player == aiPlayer) {
          var result = minimax(newBoard, huPlayer);
          move.score = result.score;
      } else {
          var result = minimax(newBoard, aiPlayer);
          move.score = result.score;
      }

      newBoard[availSpots[i]] = move.index;

      moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
      var bestScore = -10000;
      for (var i = 0; i < moves.length; i++) {
          if (moves[i].score > bestScore) {
              bestScore = moves[i].score;
              bestMove = i;
          }
      }
  } else {
      var bestScore = 10000;
      for (var i = 0; i < moves.length; i++) {
          if (moves[i].score < bestScore) {
              bestScore = moves[i].score;
              bestMove = i;
          }
      }
  }

  return moves[bestMove];
}

function resizeElem() {
  realWidth = window.innerWidth * 0.95;
  realWidth = realWidth > 600 ? 600 : realWidth;
  realWidth = realWidth * 1.3 > window.innerHeight ? window.innerHeight / 1.2 : realWidth;
  $('.container').css({width: realWidth + "px"});
  $('.container').css({height: realWidth * 1.2 + "px"});
  $('.wrapper').css({fontSize: realWidth * 0.18 + "px"});
  $('.wrapper').css({width: realWidth + "px"});
  $('.wrapper').css({height: realWidth + "px"});
  $('td').css({width: realWidth * 0.25 + "px"});
  $('td').css({height: realWidth * 0.25 + "px"});
  $('.switch-button').css({zoom: realWidth * 0.22 + "%"});
  $('#info').css({fontSize: realWidth * 0.06 + "px"});
}

$('#btndisclaimer').click( () => {
  if ($('#btndisclaimer').css('color') == 'rgb(255, 255, 255)') {
    $('#btndisclaimer').css({color: 'transparent'});
  } else { $('#btndisclaimer').css({color: 'white'}) }
})
