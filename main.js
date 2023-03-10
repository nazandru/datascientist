// defining the canvas

const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

// universal dims of canvas

import { uWidth } from "./responsive.js";
import { uHeight } from "./responsive.js";
canvas.width = uWidth;
canvas.height = uHeight;

// MOBILE

// function is_touch_enabled() {
//     return ( 'ontouchstart' in window ) ||
//            ( navigator.maxTouchPoints > 0 ) ||
//            ( navigator.msMaxTouchPoints > 0 );
// }

// if (is_touch_enabled()) {
//     canvas.width = 500;
//     canvas.height = 300;
// }




// enforce gameplay

window.addEventListener('blur', function (event) {
    location.reload();
});





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
    c.clearRect(0,0, uWidth, uHeight);

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

// 1. make game responsive, dynamic to each screensize and mobile friendly

//    base player and enemy positions based on width and height
//    overcompensate the art in order to accomidate all viewport aspect ratios (official aspect ratio is 1.28)
//    base the background art layers off the posisiton of the player but maintain the art aspect ratio to one ratio
//    the speed of x of all participants including the background must be dependant on width
//    the speed of y of all participants must be dependant on height

// center the canvas



// 2 start adding in art and animating it

