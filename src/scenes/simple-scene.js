import inRange from '../lib/inRange';

export class SimpleScene extends Phaser.Scene {

  preload () {
    this.load.image('bg', 'assets/bg.png');
    this.load.image('player', 'assets/botty.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.audio('poppins_quality_whistling', ['assets/Poppins_Quality_Whistling_2.mp3']);
    this.load.image('winSquare', 'assets/npc.png');
  }

  create () {
    this.setupMovement();
    this.playMusic();
    this.setupEnvironmentAndPlayer();
    
    this.input.keyboard.on('keydown_SPACE', (event) => {
      if (inRange(player, winSquare)) {
        this.displayWinText();
      }
    });
  }

  update() {

  }

  displayWinText() {
    var winningText = this.add.text(10, 10, 'Winner!');
    winningText.setStroke('#000', 8);
    winningText.setShadow(2, 2, "#333333", 2, true, true);
  }

  setupMovement() {
    // Creates object for input with arrow keys
    const moveKeys = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.UP,
      'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
      'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
      'right': Phaser.Input.Keyboard.KeyCodes.RIGHT
    });

    const playerSpeed = 160;

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

  }

  playMusic() {
     const happyBackgroundMusic = this.sound.add('poppins_quality_whistling');
      happyBackgroundMusic.play();
  }

  setupEnvironmentAndPlayer() {
    this.add.image(400, 320, 'bg');

    //Create walls physics object
    const walls = this.physics.add.staticGroup();
    walls.create(400, 400, 'wall');

    //Create winSquare physics object
    const winSquare = this.physics.add.sprite(200, 200, 'winSquare');

    //Player Object
    const player = this.physics.add.sprite(400, 200, 'player');
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, walls);
  }
}