// paintbrush

const c = canvas.getContext('2d');

// score system

let score = 0;
let highScore = 0;

if (localStorage.getItem('highScoreKey') != undefined && localStorage.getItem('highScoreKey') != NaN) {
    highScore = localStorage.getItem('highScoreKey');
}

highScore = parseInt(highScore);

// biox class

class Biox {
    constructor(spawnPointY, width, height, color, isBlue) {
        this.spawnPointX = 515;
        this.spawnPointY = spawnPointY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.executed2 = false;
        this.isBlue = isBlue;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.spawnPointX, this.spawnPointY, this.width, this.height)
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

        this.spawnPointX -= 3;
        let posX = this.spawnPointX;


    }
}

// random spawner engine

export let bioxArray = [];
let crank = 0;

export function spawner() {

    crank = Math.floor(Math.random() * 1000);

    let z;

    if (crank % 65 === 42) {
        bioxArray.push(z = new Biox(245, 25, 25, 'green', false));
    }

    let randYspawnPoint = Math.floor(Math.random() * 120 + 117);

    let i;

    if (crank % 125 === 4) {
        bioxArray.push(i = new Biox(randYspawnPoint,  25, 25, 'green', false));
    }

    for(i = 0; i < bioxArray.length; i++) {
        bioxArray[i].update();
    }

    bioxArray.forEach((element) => {
        if (element.spawnPointX < -30) {
            bioxArray.splice(element, 1)
        }
    });

    if (score > 2) {
        if (crank % 400 === 18) {
            bioxArray.push(i = new Biox(230,  40, 40, 'blue', true));
        }
    }

}


