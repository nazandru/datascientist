
// score system

let score = 0;
let highScore = 0;

if (localStorage.getItem('highScoreKey') != undefined && localStorage.getItem('highScoreKey') != NaN) {
    highScore = localStorage.getItem('highScoreKey');
}

highScore = parseInt(highScore);

// menu functionality

export let bioxArray = [];
import { classGameOver } from "./responsive.js";
import { color } from "./responsive.js";

let playBtn = document.getElementById('playBtn');
let menuWindow = document.getElementById('menu');
let daddy = document.getElementById('daddy');
let thePlay = document.getElementById('theplay');
let replay = document.getElementById('replay');
let scores = document.getElementById('scores');
let justScore = document.getElementById('justScore');
let theHighScore = document.getElementById('HighScore');


if (!classGameOver.playing) {
    playBtn.removeChild(replay);
    scores.removeChild(justScore);
    theHighScore.innerText = "HighScore: " + highScore;
}

playBtn.addEventListener("click", () => {
    playBtn.appendChild(thePlay);
    daddy.removeChild(menuWindow);
    classGameOver.playing = true;
    classGameOver.prevGameOver = false;
    classGameOver.gameover = false;
    bioxArray = [];
    color.color = 'red';
});

// paintbrush

const c = canvas.getContext('2d');

// biox class

class Biox {
    constructor(spawnPointY, width, height, color, isBlue) {
        this.spawnPointX = window.innerWidth + (window.innerWidth / 20);
        this.spawnPointY = spawnPointY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.executed2 = false;
        this.isBlue = isBlue;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.spawnPointX, this.spawnPointY, this.width, this.height);
    }

    update() {

        this.draw();

        if (!this.executed2) {
            if (this.color === 'black') {
                score ++;
                if (this.color === 'black' && this.isBlue) {
                    score ++;
                    score ++;
                }
                console.log('score: ' + score)
                this.executed2 = true;
                if (score > highScore) {    
                highScore = score;
                console.log("highscore: " + highScore);
                localStorage.setItem('highScoreKey', highScore);
                };
                
            }
        }

        // adding speed to game depending on apect ratio


        if (window.innerWidth / window.innerHeight > 2 && window.innerWidth / window.innerHeight < 2.6 && !classGameOver.gameover) {
            this.spawnPointX -= 14;
        } if (window.innerWidth / window.innerHeight > 2.6 && !classGameOver.gameover) {
            this.spawnPointX -= 19;
        } if (window.innerWidth / window.innerHeight < 2 && !classGameOver.gameover) {
            this.spawnPointX -= 11;
        } if (window.innerWidth < 1000 && !classGameOver.gameover) {
            this.spawnPointX += 8;
        } if (window.innerWidth / window.innerHeight < 2 && window.innerWidth < 1000 && !classGameOver.gameover) {
            this.spawnPointX -= 4;
        }

    }
}

// random spawner engine

let crank = 0;

export function spawner() {

    let i;

    for(i = 0; i < bioxArray.length; i++) {
        bioxArray[i].update();
        if (window.innerWidth / window.innerHeight > 1.8 && !bioxArray[i].isBlue) {
            bioxArray[i].width = window.innerHeight / 10;
            bioxArray[i].height = window.innerHeight / 10;
        }
        if (window.innerWidth / window.innerHeight > 1.8 && bioxArray[i].isBlue) {
            bioxArray[i].width = window.innerHeight / 7.5;
            bioxArray[i].height = window.innerHeight / 7.5;
        }
    }

    if (!classGameOver.playing) {
        return;
    }

    crank = Math.floor(Math.random() * 1000);

    let z;

    // ground dwellers
    if (crank % 65 === 42) {
        bioxArray.push(z = new Biox(window.innerHeight / 1.30, window.innerWidth / 20, window.innerWidth / 20, 'green', false));
    }

    let randYspawnPoint = Math.floor(Math.random() * window.innerHeight / 2 + window.innerHeight / 4);
    if (randYspawnPoint < window.innerHeight / 2.5) {
        randYspawnPoint += window.innerHeight / 3.5;
    }

    // flying
    if (crank % 125 === 4) {
        bioxArray.push(i = new Biox(randYspawnPoint,  window.innerWidth / 20, window.innerWidth / 20, 'green', false));
    }

    bioxArray.forEach((element) => {
        if (element.spawnPointX < -200) {
            bioxArray.splice(element, 1)
        }
    });

    // blues 400 === 18 score greater than 10
    if (score >= 0) {
        if (crank % 400 === 18) {
            bioxArray.push(i = new Biox(window.innerHeight / 1.30 + (window.innerWidth / 20 - window.innerWidth / 15),  window.innerWidth / 15, window.innerWidth / 15, 'blue', true));
        }
    }

    if (classGameOver.gameover == true && classGameOver.prevGameOver == false) {
        daddy.appendChild(menuWindow);
        playBtn.removeChild(thePlay);
        playBtn.appendChild(replay);
        scores.removeChild(theHighScore);
        scores.appendChild(justScore);
        scores.appendChild(theHighScore);
        classGameOver.prevGameOver = true;
        classGameOver.playing = false;
        justScore.innerText = "Score: " + score;
        theHighScore.innerText = "HighScore: " + highScore;
        score = 0;
    }

}
