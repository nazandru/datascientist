
// paintbrush

const c = canvas.getContext('2d');

// defining stuff & imports

import { classGameOver } from "./responsive.js";

import { bioxArray } from "./biox.js";
import { otherDaddy } from "./responsive.js";
import { flipPhone } from "./responsive.js";
import { widenScreen } from "./responsive.js";

import { color } from "./responsive.js";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = window.innerHeight / 600;
export let isJumping = false;
color.color = 'red';
export let isKicking = false; 
export let isShooting = false;
export let isCooling = false;


// key controls!

window.addEventListener('keydown', ({keyCode}) => {
    if (isJumping || !classGameOver.playing) return; 
    switch (keyCode) {
        case 87:
            //jump
            player.velocity.y -= window.innerHeight / 30;
            break
    }

});

window.addEventListener('keydown', ({keyCode}) => {
    if (isShooting || isKicking  || !classGameOver.playing) return; 
    switch (keyCode) {
        case 65:
            //shooter
            setTimeout(()=>{
                let bullet = new Bullet();
                bulletArray.push(bullet);
            }, 200)
            color.color = 'orange';
            setTimeout(() => {color.color = 'red'}, 1200)
            break
}
});

window.addEventListener('keydown', ({keyCode}) => {
    if (isKicking || isShooting || isCooling  || !classGameOver.playing) return;
    switch (keyCode) {
        case 68:
        //kicker
        color.color = 'grey';
        setTimeout(() => {
            color.color = 'red';
            isCooling = true;
            setTimeout(()=>{
                isCooling = false;
            }, 500);
        }, 500)
        break
    }
});

// MOBILE CHECK and MOBILE CONTROL

let InstDaddy = document.getElementById('instructionsDaddy');
let instP = document.getElementById('instructionsP');
let instK = document.getElementById('instructionsK');

if (!is_touch_enabled()) {
    InstDaddy.removeChild(instP);
}

function is_touch_enabled() {
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}

if (is_touch_enabled() && window.innerWidth < window.innerHeight) {
    otherDaddy.appendChild(flipPhone);
};

if (window.innerWidth < window.innerHeight && !is_touch_enabled()) {
    otherDaddy.appendChild(widenScreen);
};

if (is_touch_enabled()) {

    InstDaddy.removeChild(instK);

    let kick = document.getElementById('kick');
    kick.style.width = window.innerWidth / 20 + "px";
    kick.style.height = window.innerWidth / 20 + "px";
    kick.style.left = window.innerWidth / 12 + "px";
    kick.style.top = window.innerHeight / 1.4 + "px";

    kick.onclick = () => {
        if (isKicking || isShooting || isCooling || !classGameOver.playing) return;
        color.color = 'grey';
        setTimeout(() => {
            color.color = 'red';
            isCooling = true;
            setTimeout(()=>{
                isCooling = false;
            }, 500);
        }, 500)
    }

    let shoot = document.getElementById('shoot');
    shoot.style.width = window.innerWidth / 20 + "px";
    shoot.style.height = window.innerWidth / 20 + "px";
    shoot.style.left = window.innerWidth / 12 + "px";
    shoot.style.top = window.innerHeight / 1.9 + "px";

    shoot.onclick = () => {
        if (isShooting || isKicking  || !classGameOver.playing) return; 
        setTimeout(()=>{
            let bullet = new Bullet();
            bulletArray.push(bullet);
        }, 200)
        color.color = 'orange';
        setTimeout(() => {color.color = 'red'}, 1200)
    }

    let jumpButton = document.getElementById('jumpButton');
    jumpButton.style.width = window.innerWidth / 20 + "px";
    jumpButton.style.height = window.innerWidth / 20 + "px";
    jumpButton.style.left = window.innerWidth / 1.15 + "px";
    jumpButton.style.top = window.innerHeight / 1.4 + "px";

    jumpButton.onclick = () => {
        if (isJumping || !classGameOver.playing) return; 
        player.velocity.y -= window.innerHeight / 30;
    }
    
} else {
    let k = document.getElementById('k')
    let s = document.getElementById('s')
    let j = document.getElementById('j')
    shoot.style.width = 0 + "px";
    kick.style.width = 0 + "px";
    jumpButton.style.width = 0 + "px";
    kick.removeChild(k);
    shoot.removeChild(s);
    jumpButton.removeChild(j);
}




// player class

class Player {
    constructor() {
        this.position = {            
            x: window.innerWidth / 5,
            y: window.innerHeight / 1.30
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = window.innerWidth / 20;
        this.height = window.innerWidth / 20;

        if (window.innerWidth / window.innerHeight > 1.8) {
            this.width = window.innerHeight / 10;
            this.height = window.innerHeight / 10;
        }
    }

    draw() {
        c.fillStyle = color.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {

        this.draw();

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        // adding gravity 
        if(this.position.y < window.innerHeight / 1.30) {
            this.velocity.y += gravity;

        } else {
            this.velocity.y = 0;
        }
        if (classGameOver.gameover) {
            this.velocity.y = 0;
        }
        if (this.position.y > window.innerHeight / 1.30) {
            this.position.y = window.innerHeight / 1.30;
        }
    }
}

// creating new instance of the Player class

export const player = new Player();






// Bullet Class 

class Bullet {
    constructor() {
    this.positionX = player.position.x + (player.width / 2);
    this.positionY = player.position.y + (player.height / 2);
    this.bulletVelocity = window.innerWidth / 70;
    }

    draw() {
        c.beginPath();
        c.arc(this.positionX += this.bulletVelocity, this.positionY, 3, 0, 2 * Math.PI, false)
        c.fillStyle = 'orange';
        c.fill();
    }
}

let bulletArray = [];








// limit to only one jump 

export let jumpLimiter = () => {

    if (player.position.y < window.innerHeight / 1.30) {
    isJumping = true;
    } else {
        isJumping = false;
    }

}

// limit to only one kick 

export let kickLimiter = () => {

    if (color.color === 'grey') {
        isKicking = true;
    } else {
        isKicking = false;
    }   

}

// limit to only one shot 

export let shootLimiter = () => {

    if (color.color === 'orange') {
        isShooting = true;
    } else {
        isShooting = false;
    }   

}




// kicking and dying functionality

export function killer() {

    if (classGameOver.gameover) {
        color.color = 'black';
    }

    for (let i =0; i < bioxArray.length; i++) {

    if (isKicking && bioxArray[i].spawnPointX - player.position.x < player.width && bioxArray[i].spawnPointX - player.position.x > -player.width && 
        bioxArray[i].spawnPointY - player.position.y < player.height && bioxArray[i].spawnPointY - player.position.y > -player.height && bioxArray[i].color != 'blue') {
        bioxArray[i].color = 'black';
    }
    if (bioxArray[i].spawnPointX - player.position.x < player.width && bioxArray[i].spawnPointX - player.position.x > -player.width && 
        bioxArray[i].spawnPointY - player.position.y < player.height && bioxArray[i].spawnPointY - player.position.y > -player.height && bioxArray[i].color != 'black') {
        classGameOver.gameover = true;
        
    }
    if (bioxArray[i].spawnPointX - player.position.x < player.width && bioxArray[i].spawnPointX - player.position.x > -bioxArray[i].width && 
        bioxArray[i].spawnPointY - player.position.y < player.height && bioxArray[i].spawnPointY - player.position.y > -bioxArray[i].height && bioxArray[i].color != 'black' && bioxArray[i].color === 'blue') {
        classGameOver.gameover = true;
    }

    };

};

// aspect ratio checker in order to update bullet stop at enemy

let magicNumber = 0;

if (window.innerWidth / window.innerHeight > 2 && window.innerWidth / window.innerHeight < 2.6) {
    magicNumber -= 14
} if (window.innerWidth / window.innerHeight > 2.6) {
    magicNumber -= 19
} if (window.innerWidth / window.innerHeight < 2) {
    magicNumber -= 11;
} if (window.innerWidth < 1000) {
    magicNumber += 8;
} if (window.innerWidth / window.innerHeight < 2 && window.innerWidth < 1000) {
    magicNumber -= 4;
}

// shooting functionality

export function bulletUpdate() {

    if (classGameOver.gameover) {
        bulletArray = [];
    } 

    for (let i = 0; i < bulletArray.length; i++) {
        bulletArray[i].draw();

        for (let z = 0; z < bioxArray.length; z++) {

            if (bioxArray[z].spawnPointX - bulletArray[i].positionX < bioxArray[z].width / 5 && bioxArray[z].spawnPointX - bulletArray[i].positionX > -(bioxArray[z].width) && 
            bioxArray[z].spawnPointY - bulletArray[i].positionY < 0 && bioxArray[z].spawnPointY - bulletArray[i].positionY > -bioxArray[z].width && bioxArray[z].color != 'black' && bioxArray[z].color != 'blue') {
                
                bioxArray[z].color = 'black';

                bulletArray[i].bulletVelocity = magicNumber;

            }

            if (bioxArray[z].spawnPointX - bulletArray[i].positionX < bioxArray[z].width / 7 && bioxArray[z].spawnPointX - bulletArray[i].positionX > -(bioxArray[z].width / 2) && 
                bioxArray[z].spawnPointY - bulletArray[i].positionY < 0 && bioxArray[z].spawnPointY - bulletArray[i].positionY > -bioxArray[z].width && bioxArray[z].color != 'black' && bioxArray[z].color === 'blue') {
                
                bioxArray[z].color = 'black';
                
                bulletArray[i].bulletVelocity = magicNumber;


            }
        }

        if (bulletArray[i].positionX < -2000 || bulletArray[i].positionX > 6000) {
            bulletArray.shift();
        }
    }
}





