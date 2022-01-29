let realWidth; resizeElem(); var player = "X"; var counter = 0;

var allWins = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

// for (let i of document.getElementsByTagName("td")) {i.innerHTML="X"};
// document.getElementById("sqr1").innerHTML = "X";

window.addEventListener('resize', resizeElem);

function resizeElem(){
    realWidth = window.innerWidth < window.innerHeight ? window.innerWidth*0.95 : window.innerHeight*0.95;
    realWidth = realWidth > 600 ? 600 : realWidth;
    document.getElementById("container").style.width = realWidth+"px";
    document.getElementById("container").style.height = realWidth+"px";
    document.getElementById("container").style.fontSize = realWidth*0.25+"px";
    for (let i of document.getElementsByTagName("td")) {i.style.width = realWidth*0.30+"px"};
    for (let i of document.getElementsByTagName("td")) {i.style.height = realWidth*0.30+"px"};
}

const onClick = function() {
    if (this.innerHTML == "") {
        player == 'X' ? this.innerHTML = "X" : this.innerHTML = "O";
        if (checkWin(player) == true) {endGame(player);
        } else { player = player == "X" ? "O" : "X";
        }
        if (counter == 9){endGame(0)}
    }
}

for (let i of document.getElementsByTagName("td")) {i.onclick = onClick}

function sqr(i) {return document.getElementById("sqr"+i).innerHTML}

function checkWin(player){
    let checkBoard = allWins.some(i => {
        return sqr(i[0]) == player && sqr(i[1]) == player && sqr(i[2]) == player;
    })
    return checkBoard;
}

function endGame(z) {
    if (z == 0) {
        document.getElementById("modal_text").innerHTML = "Tie  game !";
        document.getElementById("modal").style.display = "block";
    } else {
        document.getElementById("modal_text").innerHTML = `Player  ${z}  wins !`;
        document.getElementById("modal").style.display = "block";
    }
}

document.getElementById("restartBtn").onclick = function(){
    for (let i of document.getElementsByTagName("td")) {i.innerHTML=""};
    player = "X";
    counter = 0;
    document.getElementById("modal").style.display = "none";
}

function ShowAndHide() {
    var x = document.getElementById("btndisclaimer");
    if (x.style.color == 'white') {
        x.style.color = 'transparent';
    } else {
        x.style.color = 'white';
    }
}


