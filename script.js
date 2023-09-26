const box = document.getElementsByClassName("box");

const player_name = document.getElementById('player_name');
const start_home = document.getElementById('start_home');
const restart = document.getElementById('restart');
const Vsplayer = document.getElementById("Vsplayer")
const Vscomputer = document.getElementById("Vscomputer")
const Player1_name = document.getElementById("Player1_name")
const Player2_name = document.getElementById("Player2_name")
const section1 = document.getElementById("section1")
const section2 = document.getElementById("section2")

const ox_icons = ['<i class="fa-regular fa-circle fa-2xl" style="color:orange;"></i>', '<i class="fa-solid fa-xmark fa-2xl" style="color: yellow;"></i>'];
const winner = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];

var players = ["", "", ""];
var player1 = [];
var player2 = [];
var computerplay = [0, 1, 2, 3, 4, 5, 6, 7, 8]
var click = 1;
var player = false;
var startHome = true;
var winnerDecleared = false;
var vscomputer = false;
var computerchance = true
var game = false
var winnerboxes = []

const computer = (v) => {
  if (vscomputer) {
    if (computerchance && !winnerDecleared) {
      computerplay.splice(computerplay.indexOf(v), 1)
      setTimeout(() => {
        var randomno = Math.floor(Math.random() * computerplay.length)
        handleClickInGame(0, 1, player2, computerplay[randomno])
        computerplay.splice(randomno, 1)
      }, 500)
      computerchance = !computerchance
    }
    else {
      computerchance = !computerchance
    }
  }
}

const showwinnerbox = () => {
  if (winnerDecleared) {
    winnerboxes.map((v) => {
      box[v].classList.add("winnerplayer")
    })
  } else {
    winnerboxes.map((v) => {
      box[v].classList.remove('winnerplayer')
    })
  }
}

const checkWinner = (p, p_name, v1) => {
  for (const value of winner) {
    let a = value.map(val => { return p.includes(val) });
    let x = 0;
    a.map(v => v ? x++ : null);
    if (x === 3) winnerDecleared = !winnerDecleared;
    if (winnerDecleared) {
      player_name.innerHTML = players[p_name] + " WIN ";
      winnerboxes = value
      showwinnerbox()
      break
    }
  }
  computer(v1)
}

const handleClickInGame = (v1, v2, v3, v4) => {
  player_name.innerHTML = players[v1];
  box[v4].innerHTML = ox_icons[v2];
  v3.push(v4);
  player = !player;
  click++;
  if (click === 10) player_name.innerHTML = "Match draw";
  checkWinner(v3, v2, v4);
}

const handleReset = (v) => {
  player_name.innerHTML = players[v];
  winnerDecleared = false;
  showwinnerbox()
  winnerboxes = []
  for (const ele of box) ele.innerHTML = "";
  player = false;
  player1 = [];
  player2 = [];
  click = 1;
  computerplay = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  if (computerchance === false) computerchance = true
}

const handleStartHome_btnClick = (v2, v3, v4) => {
  if (Player1_name.value !== "" && Player2_name.value !== "") {
    players[0] = Player1_name.value;
    players[1] = Player2_name.value;
    start_home.innerHTML = v2;
    restart.style.display = v3;
    startHome = !startHome;
    handleReset(v4);
    if (game) {
      section1.style.display = "block"
      section2.style.display = 'none'
    } else {
      section1.style.display = "none"
      section2.style.display = 'block'
    }
    game = !game
  } else {
    alert("Enter the name of the players")
  }
}

const Click = (boxNo) => {
  if (click < 10 && box[boxNo].innerHTML === "" && !winnerDecleared) {
    player ? handleClickInGame(0, 1, player2, boxNo) : handleClickInGame(1, 0, player1, boxNo)
  };
}

start_home.addEventListener('click', () => startHome ? handleStartHome_btnClick('<i class="fa-solid fa-house fa-2xl"style="color: #00C9C8;"></i>', "block", 0) : handleStartHome_btnClick('<i class="fa-solid fa-play fa-2xl"style="color: #00C9C8;"></i>', "none", 2));

restart.addEventListener('click', () => handleReset(0));

Vsplayer.addEventListener('click', () => {
  Player1_name.removeAttribute('disabled')
  Player2_name.removeAttribute('disabled');
  Player1_name.value = ""
  Player2_name.value = ""
  vscomputer = false
  computerchance = false
  Vsplayer.classList.add('choose_opponent')
  Vscomputer.classList.remove('choose_opponent')
})

Vscomputer.addEventListener('click', () => {
  Player1_name.removeAttribute('disabled')
  Player2_name.setAttribute('disabled', ' ');
  Player1_name.value = "You"
  Player2_name.value = "Computer";
  vscomputer = true
  computerchance = true
  Vscomputer.classList.add('choose_opponent')
  Vsplayer.classList.remove('choose_opponent')
})
