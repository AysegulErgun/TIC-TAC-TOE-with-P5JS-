let cols=3; // # of cols
let rows = 3; //# of rows
let size; //size for each cell
let board = []; // tic tac toe board
let players = ['X', 'O']; // symbols for players
let currentPlayer; // to indicate current player
let winner = false;  // to check winner
let winnerLoc = []; // to indicate winner location
let winnerText; // to write winner
let whoseTurn; // to indicate whose turn is it
let xPoint = 0; // initial point is 0 for player X
let oPoint = 0; // initial point is 0 for player O
const width = 400; // will use in size
let backgroundMusic; // will use in preload
let musicButton; // music on/off button
let xImage; // will use in preload
let oImage ; //will use in preload
let volumeSlider; // to turn the volume down or up
let countRound = 1; //round will start from 1
let img; // will use in preload
function preload() {
  backgroundMusic = loadSound('assets/sound.mp4'); // load background music
  oImage = loadImage('assets/123.gif'); //load symbol for player 'O'
  xImage = loadImage('assets/giphy.gif'); //load symbol for player 'X' 
  img=loadImage('assets/background.jpg'); //load background image
}
function setup() {
  createCanvas(800, 400); //canvas size
  size = 400 / cols; //size for each cell
  currentPlayer = players[floor(random(2))]; //randomizing first player
  // Start playing background music
  backgroundMusic.play();
  backgroundMusic.loop(); // Loop the music so it plays continuously
  let musicButton; // Create a button to toggle music on/off
  musicButton = createButton('Music on/off'); //create button for the music
  musicButton.position(450, 350); // the location of music button
  musicButton.mousePressed(toggleMusic); //go toggleMusic function
  whoseTurn = createDiv('').size(200, 25); //arrange space for whoseTurn
  whoseTurn.html(currentPlayer + "'s Turn!"); //will display whose turn is
  whoseTurn.style('color', 'blue'); // whose turn font color
  whoseTurn.style('font-size', '30px'); //whose turn font size
  whoseTurn.position(530, 0); // whose turn font location
  
  for (let i = 0; i < cols; i++) { //making each cell as empty initially
    board[i] = [];
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
    }
  }
  volumeSlider = createSlider(0, 1, 0.5, 0.01); //volumeslider for the music
  volumeSlider.position(550, 350); // volumesliderı konumlandırın
  volumeSlider.style('width', '200px'); // wolumeslider genişliğini ayarlayın
}
function draw() {
  background(img); //background image for the right of the board
  drawBoard(); //call drawBoard() function
  drawWinner(); //call drawWinner function contiunally
  drawScoreTable(); //call/update scoreboard contiunally
  backgroundMusic.setVolume(volumeSlider.value()); // Set volume based on slider
}
function drawBoard() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      rect(i * size, j * size, size, size); //drawing each cell total 3x3(locx,locy,width,height)
      if (board[i][j] === 'X') { //if move is X then put X symbol img
        
        image(xImage, i * size, j * size, size, size); //img,locx,locy,w,h
      } else if (board[i][j] === 'O') { //if move is O then put O symbol img 
        
        image(oImage, i * size, j * size, size, size); //img,locx,locy,w,h
      }
    }
  }
}

function mousePressed() {
  if (!winner) { //if there is no winner
    //index= calculates the index of the cell where the mouse was pressed
    // floor(mouseX / size) calculates the coloumn index of the cell
    // floor(mouseY/size) calculates the row index of the cell
    let index = [floor(mouseX / size), floor(mouseY / size)]; 
    placePieces(index[0], index[1]); //passes the calculated column and row indices to the placePieces() function
    checkWinner(); //After placing the piece, it checks for a winner by calling the checkWinner() function
  } else { // if there is a winner, reset the game
    resetGame();
  }
}
function placePieces(x, y) {
  // Board dizisinin tanımlı olduğunu kontrol et
  if (board && board[x] && board[x][y] === 0) { //if spot is available
    board[x][y] = currentPlayer; //put player's symbol to the selected cell
    winnerText = currentPlayer; //updates the winnerText variable to indicate the current player's symbol
    if (currentPlayer == 'X') { //change the current player with X
      currentPlayer = 'O'; //change the current player with O
      whoseTurn.html(currentPlayer + "'s Turn!"); //print whose turn is it
    } else { 
      currentPlayer = 'X'; //change the current player
      whoseTurn.html(currentPlayer + "'s Turn!"); //print whose turn is it
    }
  } else { //if spot is not available
    print("Spot is not available");
  }
}
function checkWinner() { //checking winner conditions
  for (let i = 0; i < cols; i++) { 
    if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != 0) { //horizontal winner conditions
      winner = true; //set winner as true if condition holds
      winnerLoc = [1, i]; //stores the winner conditions
      if (currentPlayer === 'O') { //if it's O's turn, then winner must be X. 
        return xPoint += 3; // add 3 points to O
      } else if (currentPlayer === 'X') { //if it's X's turn, then winner must be O.
        return oPoint += 3; // add 3 points to O.
      }
    }
  }
  for (let i = 0; i < cols; i++) {
    if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != 0) { //vertical winner conditions
      winner = true; //set winner as true if conditions holds
      winnerLoc = [2, i]; //stores the winning location
      if (currentPlayer === 'O') { // if it's O's turn, then winner must be X
        return xPoint += 3; //add 3points to X.
      } else if (currentPlayer === 'X') { //if it's X's turn, then winner must be O.
        return oPoint += 3; //add 3points to O
      }
    }
  }
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != 0) {//diagonal win conditions(left top to right bottom)
    winner = true;//set winner as true if conditions holds
    winnerLoc = [3, 0]; //stores the winning location
    if (currentPlayer === 'O') { //if it's O's turn, then winner must be X.
      return xPoint += 3; // add 3 points to X.
    } else if (currentPlayer === 'X') { // if it's X's turn, then winner must be O.
      return oPoint += 3; //add 3 points to O.
    }
  }
  if (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[2][0] != 0) { //diagonal win conditions(right top to left bottom)
    winner = true; // set winner as true if condition holds
    winnerLoc = [4, 0]; //stores the winning location
    if (currentPlayer === 'O') { //if it's O's turn, then winner must be X.
      return xPoint += 3; //add 3 points to X.
    } else if (currentPlayer === 'X') { //if it's X's turn, then winner must be O.
      return oPoint += 3; // add 3 points to O.
    }
  }
  let draw = true; // if none of them holds, go draw condition. //set draw as true.
  for (let i = 0; i < cols; i++) { //checking all of the rows and columns 
    for (let j = 0; j < rows; j++) { 
      if (board[i][j] == 0) { //checks if there is a empty cell
        draw = false; //if there is a empty cell, then the game is not over yet.
        break;
      }
    }
  }
  if (!winner && draw) { //if there is no winner, and draw=true
    winner = true;
    winnerText = "Draw!";
    xPoint += 1; // add 1 point to each player
    oPoint += 1; // add 1 point to each player
  }
}
function drawWinner() {
  if (winner) { //if winner is true
    textAlign(CENTER);  // locate draw text at the center 
    textSize(100); // arrange draw text size
    strokeWeight(5); // text kalınlığı
    if (winnerText === "Draw!") { //if game is draw
      text("Draw!", width+400 / 2, height-100); //display draw text
    } else {
      text(winnerText + " wins!", width + 400 / 2, height - 100); //if it is not draw, write the winner.
    }
    if (winnerLoc[0] == 1) { //horizontal winning
      line(size / 2 + winnerLoc[1] * size, size / 2 + 0 * size, size / 2 + winnerLoc[1] * size, size / 2 + 2 * size); //draw the line along the winning cells 
    } else if (winnerLoc[0] == 2) { //vertical winning
      line(size / 2 + 0 * size, size / 2 + winnerLoc[1] * size, size / 2 + 2 * size, size / 2 + winnerLoc[1] * size); //draw the line along the winning cells
    } else if (winnerLoc[0] == 3) {//diagonal winning (left-top to right bottom)
      line(size / 2, size / 2, size / 2 + 2 * size, size / 2 + 2 * size);// draw the line along the wining cells.
    } else if (winnerLoc[0] == 4) { //diagonal winning (left-bottom to right top)
      line(size / 2 + 2 * size, size / 2, size / 2, size / 2 + 2 * size);//draw line along the winning cells
    }
  }
  strokeWeight(1); //line kalınlığı
}
function resetGame() { //after winner becomes true, enter here
  //reset game states variables
  winner = false;
  winnerText = '';
  winnerLoc = [];
  for (let i = 0; i < cols; i++) { //clearing cells
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
    }
  }
  currentPlayer = players[floor(random(2))]; //randomizing player
  whoseTurn.html(currentPlayer + "'s Turn!"); //printing whose turn is it
  countRound++; //increasing round
}
function drawScoreTable() {//drawing score table
  const tableWidth = 150; //width of the score table
  const tableHeight = 100; //height of the scoretable
  
  rect(500, 100, tableWidth, tableHeight); //shape of the score table will be rectangle(locx, locy, w,h)
  
  textSize(20);
  textAlign(CENTER);
  text("Scoreboard", 574, 90); //the 'scoreboard' text and location
  text("X:", 530, 130);//the 'X:' text and location
  text("O:", 530, 170);//the 'O:' text and location
  text(xPoint, 550, 130);//to indicate point f the x
  text(oPoint, 550, 170);//to indicate point f the o
  text("Round: " + countRound, 570, 70); //to indicate the round
}
function toggleMusic() { //when you press the music button enter this function
  if (backgroundMusic.isPlaying()) { //if music is playing, stop the music
    backgroundMusic.stop();
  } else {
    backgroundMusic.loop();//if music is not playing, play the music continuously
  }
}