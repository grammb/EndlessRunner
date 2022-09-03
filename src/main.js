//Graham Miller 



'use strict';

// global variables
let cursors;
let timeText;
let HPText;
//let currentScene = 0;
const SCALE = 0.65;
const tileSize = 35;

// main game object
let config = {
    type: Phaser.AUTO, //phaser can decide what to use
    width: 1040, //+200 here? WAS 840
    height: 525, // +200 here? WAS 525
    //backgroundColor: 0x444444,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play, GameOver]
};

let game = new Phaser.Game(config);

//remember can set UI sizes here, as well as 