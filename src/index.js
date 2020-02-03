import 'phaser';

import { SimpleScene } from './scenes/simple-scene';
const gameConfig = {
  type: Phaser.AUTO,
  width: 27 * 32,
  height: 21 * 32,
  parent: "game-container",
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0},
      debug: false
    }
  },
  scene: SimpleScene,
};

new Phaser.Game(gameConfig);
