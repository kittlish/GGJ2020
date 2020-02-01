export class SimpleScene extends Phaser.Scene {
  preload ()
  {
    this.load.image('bg', 'assets/bg.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('wall', 'assets/wall.png');
  }
  create ()
  {
    this.add.image(400, 320, 'bg');
    this.add.image(400, 400, 'wall');
    this.add.image(400, 200, 'player');
  }
}
