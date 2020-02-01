export class SimpleScene extends Phaser.Scene {

  preload () {
    this.load.image('bg', 'assets/bg.png');
    this.load.image('player', 'assets/botty.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.audio('poppins_quality_whistling', ['assets/Poppins_Quality_Whistling_2.mp3']);
    this.load.image('winSquare', 'assets/npc.png');
  }

  create () {
    this.add.image(400, 320, 'bg');
    this.add.image(200, 200, 'winSquare');
    //this.add.image(400, 400, 'wall');
    //this.add.image(400, 200, 'player');
    const happyBackgroundMusic = this.sound.add('poppins_quality_whistling');
    happyBackgroundMusic.play();


    //Create walls physics object
    const walls = this.physics.add.staticGroup();
    walls.create(400, 400, 'wall');

    //Player Object
    const player = this.physics.add.sprite(400, 200, 'player');
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, walls);


    // Creates object for input with arrow keys
    const moveKeys = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.UP,
      'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT
    });

    const playerSpeed = 160;

    //interaction.add.text(10, 10, '', { font: '48px Arial', fill: '#000000' });


    // Enables movement of player with arrow keys
    this.input.keyboard.on('keydown_UP', function (event) {
      player.setVelocityY(-playerSpeed);
    });
    this.input.keyboard.on('keydown_DOWN', function (event) {
      player.setVelocityY(playerSpeed);
    });
    this.input.keyboard.on('keydown_LEFT', function (event) {
      player.setVelocityX(-playerSpeed);
    });
    this.input.keyboard.on('keydown_RIGHT', function (event) {
      player.setVelocityX(playerSpeed);
    });

    // Stops player acceleration on uppress of WASD keys
    this.input.keyboard.on('keyup_UP', function (event) {
      if (moveKeys['down'].isUp)
        player.setVelocityY(0);
    });
    this.input.keyboard.on('keyup_DOWN', function (event) {
      if (moveKeys['up'].isUp)
        player.setVelocityY(0);
    });
    this.input.keyboard.on('keyup_LEFT', function (event) {
      if (moveKeys['right'].isUp)
        player.setVelocityX(0);
    });
    this.input.keyboard.on('keyup_RIGHT', function (event) {
      if (moveKeys['left'].isUp)
        player.setVelocityX(0);
    });

    this.input.keyboard.on('keydown_SPACE', function (event){
      this.add.text(10,10,'Hello');
    });
  }

  update() {

  }
}
