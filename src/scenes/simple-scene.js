import inRange from '../lib/inRange';

let controls;
let player;

export class SimpleScene extends Phaser.Scene {

  preload () {
    this.load.image('bg', 'assets/bg.png');
    this.load.image('player', 'assets/botty.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.audio('poppins_quality_whistling', ['assets/Poppins_Quality_Whistling_2.mp3']);
    this.load.image('winSquare', 'assets/npc.png');

    this.load.image("tiles", "assets/tilesets/pretty_boy.png");
    this.load.tilemapTiledJSON("map", "assets/tilesets/pretty_boy.json");
  }

  create () {
    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage('Untitled-4', 'tiles');
    const floorLayer = map.createStaticLayer("Floors", tileset, 0, 0);
    const wallsLayer = map.createStaticLayer("Walls", tileset, 0, 0);
    wallsLayer.setCollisionByProperty({ collides: true });
    wallsLayer.setCollisionBetween(12, 44);

    const debugGraphics = this.add.graphics().setAlpha(0.75);
    wallsLayer.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });

    const camera = this.cameras.main;

    player = this.physics.add.sprite(400, 350, "atlas", "misa-front");

    // Set up the arrows to control the camera
    const cursors = this.input.keyboard.createCursorKeys();
    controls = new Phaser.Cameras.Controls.FixedKeyControl({
      camera: camera,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.5
    });

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Help text that has a "fixed" position on the screen
    this.add
      .text(20, 16, "Arrow keys to scroll", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
        backgroundColor: "#000000"
      })
      .setScrollFactor(0);
    this.playMusic();
    this.setupEnvironmentAndPlayer();
    this.setupMovement();
    
    this.input.keyboard.on('keydown_SPACE', (event) => {
      if (inRange(this.player, this.winSquare)) {
        this.displayWinText();
      }
    });
    this.physics.add.collider(player, wallsLayer);
  }

  update (time,delta) {
    const speed = 175;
    controls.update(delta);

    player.body.setVelocity(0);


    // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);
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
    this.input.keyboard.on('keydown_UP', (event) => {
      this.player.setVelocityY(-playerSpeed);
    });
    this.input.keyboard.on('keydown_DOWN', (event) => {
      this.player.setVelocityY(playerSpeed);
    });
    this.input.keyboard.on('keydown_LEFT', (event) => {
      this.player.setVelocityX(-playerSpeed);
    });
    this.input.keyboard.on('keydown_RIGHT', (event) => {
      this.player.setVelocityX(playerSpeed);
    });

    // Stops player acceleration on uppress of WASD keys
    this.input.keyboard.on('keyup_UP', (event) => {
      if (moveKeys['down'].isUp)
        this.player.setVelocityY(0);
    });
    this.input.keyboard.on('keyup_DOWN', (event) => {
      if (moveKeys['up'].isUp)
        this.player.setVelocityY(0);
    });
    this.input.keyboard.on('keyup_LEFT', (event) => {
      if (moveKeys['right'].isUp)
        this.player.setVelocityX(0);
    });
    this.input.keyboard.on('keyup_RIGHT', (event) => {
      if (moveKeys['left'].isUp)
        this.player.setVelocityX(0);
    });

  }

  playMusic() {
     const happyBackgroundMusic = this.sound.add('poppins_quality_whistling');
      // happyBackgroundMusic.play();
  }

  setupEnvironmentAndPlayer() {
    //Create walls physics object
    // const walls = this.physics.add.staticGroup();
    // walls.create(400, 400, 'wall');

    //Create winSquare physics object
    // this.winSquare = this.physics.add.sprite(200, 200, 'winSquare');

    //Player Object
    this.player = this.physics.add.sprite(400, 200, 'player');
    this.player.setCollideWorldBounds(true);
    //
    // this.physics.add.collider(this.player, walls);
  }
}