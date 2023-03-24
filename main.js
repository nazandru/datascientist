// defining the canvas

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

// dims of canvas

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// refresh window if user leaves tab

window.addEventListener('blur', function (event) {
    location.reload();
});

// refresh on viewport change

window.onresize = function(event){
    document.location.reload(true);
}

// imports

import { player } from "./dataScientist.js";
import { jumpLimiter } from "./dataScientist.js";
import { kickLimiter } from "./dataScientist.js";
import { shootLimiter } from "./dataScientist.js";

import { spawner } from "./biox.js";

import { killer } from "./dataScientist.js";
import { bulletUpdate } from "./dataScientist.js";

// animation loop

function animate() {

    requestAnimationFrame(animate);
    c.clearRect(0,0, window.innerWidth, window.innerHeight);

    spawner();

    bulletUpdate();

    player.update();


    jumpLimiter();
    kickLimiter();
    shootLimiter();



    killer();

};

animate();



// tasks:

// 1. start adding in art/animation/replacing
// 2. sounds & music?