// paintbrush

const c = canvas.getContext('2d');

// defining stuff

import { bioxArray } from "./biox.js";
import { uWidth } from "./responsive.js";
import { uHeight } from "./responsive.js";
canvas.width = uWidth;
canvas.height = uHeight;

const gravity = uHeight / 600;
let isJumping = false;
let color = 'red';
let isKicking = false; 
let isShooting = false;
let isCooling = false;



// key controls!

window.addEventListener('keydown', ({keyCode}) => {
    if (isJumping) return; 
    switch (keyCode) {
        case 87:
            //jump
            player.velocity.y -= uHeight / 30;
            break
    }

});

window.addEventListener('keydown', ({keyCode}) => {
    if (isShooting || isKicking) return; 
    switch (keyCode) {
        case 65:
            //shooter
            setTimeout(()=>{
                let bullet = new Bullet();
                bulletArray.push(bullet);
            }, 600)
            color = 'orange';
            setTimeout(() => {color = 'red'}, 1200)
            break
}
});

window.addEventListener('keydown', ({keyCode}) => {
    if (isKicking || isShooting || isCooling) return;
    switch (keyCode) {
        case 68:
        //kicker
        color = 'grey';
        setTimeout(() => {
            color = 'red';
            isCooling = true;
            setTimeout(()=>{
                isCooling = false;
            }, 500);
        }, 500)
        break
    }
});




// player class

class Player {
    constructor() {
        console.log(window.innerHeight)
        this.position = {            
            x: uWidth / 5,
            y: uHeight / 1.30
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = uWidth / 20;
        this.height = uWidth / 20;
        // we have based the player dims on width and position on both width and height
    }

    draw() {
        c.fillStyle = color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {

        this.draw();

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        // adding gravity 
        if(this.position.y < uHeight / 1.30) {
            this.velocity.y += gravity;

        } else {
            this.velocity.y = 0;
        }
    }
}

// creating new instance of the Player class

export const player = new Player();






// Bullet Class 

class Bullet {
    constructor() {
    this.positionX = player.position.x + uWidth / 40;
    this.positionY = player.position.y + uHeight / 24;
    this.bulletVelocity = 11;
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

    if (player.position.y < uHeight / 1.30) {
    isJumping = true;
    } else {
        isJumping = false;
    }

}

// limit to only one kick 

export let kickLimiter = () => {

    if (color === 'grey') {
        isKicking = true;
    } else {
        isKicking = false;
    }   

}

// limit to only one shot 

export let shootLimiter = () => {

    if (color === 'orange') {
        isShooting = true;
    } else {
        isShooting = false;
    }   

}




// kicking and dying functionality

export function killer() {

    for (let i =0; i < bioxArray.length; i++) {

    if (isKicking && bioxArray[i].spawnPointX - player.position.x < 25 && bioxArray[i].spawnPointX - player.position.x > -25 && 
        bioxArray[i].spawnPointY - player.position.y < 25 && bioxArray[i].spawnPointY - player.position.y > -25 && bioxArray[i].color != 'blue') {
        bioxArray[i].color = 'black';
    }
    if (bioxArray[i].spawnPointX - player.position.x < 25 && bioxArray[i].spawnPointX - player.position.x > -25 && 
        bioxArray[i].spawnPointY - player.position.y < 25 && bioxArray[i].spawnPointY - player.position.y > -25 && bioxArray[i].color != 'black') {
        location.reload();
    }
    if (bioxArray[i].spawnPointX - player.position.x < 25 && bioxArray[i].spawnPointX - player.position.x > -40 && 
        bioxArray[i].spawnPointY - player.position.y < 25 && bioxArray[i].spawnPointY - player.position.y > -25 && bioxArray[i].color != 'black' && bioxArray[i].color === 'blue') {
        location.reload();
    }

    };

};




// shooting functionality

export function bulletUpdate() {

    for (let i = 0; i < bulletArray.length; i++) {
        bulletArray[i].draw();

        for (let z = 0; z < bioxArray.length; z++) {

            if (bioxArray[z].spawnPointX - bulletArray[i].positionX < 15 && bioxArray[z].spawnPointX - bulletArray[i].positionX > 0 && 
            bioxArray[z].spawnPointY - bulletArray[i].positionY < 0 && bioxArray[z].spawnPointY - bulletArray[i].positionY > -27 && bioxArray[z].color != 'black' && bioxArray[z].color != 'blue') {
            bioxArray[z].color = 'black';
            bulletArray[i].bulletVelocity = -3;

            }
            if (bioxArray[z].spawnPointX - bulletArray[i].positionX < 15 && bioxArray[z].spawnPointX - bulletArray[i].positionX > 0 && 
                bioxArray[z].spawnPointY - bulletArray[i].positionY < 0 && bioxArray[z].spawnPointY - bulletArray[i].positionY > -40 && bioxArray[z].color != 'black' && bioxArray[z].color === 'blue') {
                bioxArray[z].color = 'black';
                bulletArray[i].bulletVelocity = -3;

            }
        }

        if (bulletArray[i].positionX < -2000 || bulletArray[i].positionX > 2000) {
            bulletArray.shift();
        }
    }
}





