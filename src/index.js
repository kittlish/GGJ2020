import 'phaser';

import { SimpleScene } from './scenes/simple-scene';
function preload ()
{
  this.load.image('bg', 'assets/bg.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('wall', 'assets/wall.png');
}

function create ()
{
  this.add.image(400, 320, 'bg');
  this.add.image(400, 400, 'wall');
  this.add.image(400, 200, 'player');
}
const gameConfig = {
  type: Phaser.AUTO,
  width: 680,
  height: 400,
  scene: {
    preload: preload,
    create: create
  }
};

new Phaser.Game(gameConfig);
