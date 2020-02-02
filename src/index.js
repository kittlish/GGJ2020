import 'phaser';

import { SimpleScene } from './scenes/simple-scene';
const gameConfig = {
  type: Phaser.AUTO,
  width: 25 * 32,
  height: 20 * 32,
  parent: "game-container",
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0},
      debug: true
    }
  },
  scene: SimpleScene,
};

new Phaser.Game(gameConfig);
