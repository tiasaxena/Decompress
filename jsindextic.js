var turn = 1;//1 for player 1 and 2 for player 2
var clickCounter = 0;//to keep a check of number of clicks which are 9 at maximum
var win = -1;

var matrix = [
    [-1,-1,-1],
    [-1,-1,-1],
    [-1,-1,-1]
]
function game(element, row, col) {
console.log(element);
    if(element.innerHTML != "") {                               
        return;
    }
    //above if can be replaced as well.
    // if(matrix[row][col] != -1) {
    //         return;
    //     }

    if(win != -1) {
        return;
    }

    clickCounter++;
    matrix[row][col] = turn;

    console.log(matrix);
    if(turn == 1) {
        element.innerHTML = "X";
        document.getElementById("text").innerHTML = "Player 2 Turn.";
        turn = 2;
        playSound(1);
    }
    
    else if(turn == 2) {
        element.innerHTML = "O";
        document.getElementById("text").innerHTML = "Player 1 Turn.";
        turn = 1;
        playSound(2);
    }

    
    //row check
    if(matrix[row][0] === matrix[row][1] && matrix[row][1] === matrix[row][2]) {
        win = matrix[row][0];
    }

    //column check 
    else if(matrix[0][col] === matrix[1][col]  && matrix[1][col] === matrix[2][col]) {
        win = matrix[0][col];
    }

    //diagonal check
    if(win === -1) {
        if(matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2]) {
            win = matrix[1][1];
        }
    
        else if(matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0]) {
            win = matrix[1][1];
        }
    }

    if(win !== -1) {
        if(win === 1) {
            document.getElementById("text").innerHTML = "🏆 Player 1 Won!";
            var audio = new Audio("soundstic/won.mp3");
            audio.play();
        }
        else if(win === 2) {
            document.getElementById("text").innerHTML = "Player 2 Won! 🏆";
            var audio = new Audio("soundstic/won.mp3");
            audio.play();
        }
    }

    else if(clickCounter === 9) {
        document.getElementById("text").innerHTML = "Draw! 🏳️";
        var audio = new Audio("soundstic/draw.mp3");
        audio.play();
    } 
    console.log(win);
    // alert(clickCounter);
}

function playSound(playerturn) {
    var audio = new Audio("soundstic/player" + playerturn + ".mp3");
    audio.play();
}