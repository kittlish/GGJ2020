import inRange from '../lib/inRange';
import callText from '../lib/callText.js';
import configText from '../lib/configText'


export class SimpleScene extends Phaser.Scene {

  preload () {
    this.load.image('bg', 'assets/bg.png');
    this.load.image('player', 'assets/Healda/standing/default/right.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.audio('main_background_music', ['assets/game jam music draft 1.0.mp3']);
    this.load.image('winSquare', 'assets/npc.png');
    this.load.multiatlas('healdaSprites', 'assets/Healda/healda.json', 'assets/Healda');
  }
    

  create () {
    this.playMusic();
    this.setupEnvironmentAndPlayer();
    this.setupMovement();
      
    var drRColor = '#800000';
    var healdaColor = '#000066';
      
    var textContainer = this.add.container(150, 250);
    var mainText = configText(this.add.text(0,0,''), textContainer, '#000', '#333333');   
    var drRText = configText(this.add.text(0,20,''), textContainer, '#000', drRColor);
    var healdaText = configText(this.add.text(0, 40, ''), textContainer, '#000', healdaColor);
      
    var lines = [
        {speaker: 'Dr. R', line: 'Hello-ho-ho-ho you, over there! Please, help me!'},
        {speaker: 'Healda', line:  'o.O ...'},
        {speaker: 'Dr. R', line: 'well?'},
        {speaker: 'Healda', line: 'bee boop'},
        {speaker: 'Dr. R', line: 'do you even understand me?'},
        {speaker: 'Healda', line: '[nods]'},
        {speaker: 'Dr. R', line: 'Oh you don\'t speak do you? Well never mind that, you must help me! That would be the nice thing to do and you wouldn\'t happen to be one of the naughty ones, would you? You don’t seem the naughty type...'},
        {speaker: 'Healda', line: 'o.o'},
        {speaker: 'Dr. R', line: 'Anywho, my arch nemesis Dr. Blitzen von Vixen has stolen my formula for my medicine! I am deathly ill and I need that cure!'},
        {speaker: 'Dr. R', line: 'Could you please explore this Omega Building and find the formula?'},
        {speaker: 'Dr. R', line: 'Also… there may or may not be evil  deadly robots lurking in here…'}
                
    ]
      
    var helloText = 'Welcome to our game!';
      
    callText(mainText, helloText);
    setTimeout(() => {callText(mainText, '')});
      
    var currentTextObj;
    var startingLine = 0;
    var myline;
      
    this.input.keyboard.on('keydown_G', (event) => {
        if(startingLine > 0){
            drRText.setText('');
            healdaText.setText('');
        }
        
        if(startingLine < lines.length){
            myline = lines[startingLine];
            if(myline.speaker == 'Dr. R'){
                callText(drRText, myline.line);
            }
            if(myline.speaker == 'Healda'){
                callText(healdaText, myline.line);
            }
            
        }
        startingLine++;
    });
    
    this.input.keyboard.on('keydown_SPACE', (event) => {
      if (inRange(this.player, this.winSquare)) {
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
    this.input.keyboard.on('keydown_UP', (event) => {
      this.player.setVelocityY(-playerSpeed);
      this.player.anims.play('walkingUp');

    });
    this.input.keyboard.on('keydown_DOWN', (event) => {
      this.player.setVelocityY(playerSpeed);
      this.player.anims.play('walkingDown');

    });
    this.input.keyboard.on('keydown_LEFT', (event) => {
      this.player.setVelocityX(-playerSpeed);
      this.player.anims.play('walkingLeft');
    });
    this.input.keyboard.on('keydown_RIGHT', (event) => {
      this.player.setVelocityX(playerSpeed);
      this.player.anims.play('walkingRight');
    });

    const allKeysAreUp = function () { return moveKeys['up'].isUp && moveKeys['down'].isUp && moveKeys['left'].isUp && moveKeys['right'].isUp; }

    // Stops player acceleration on uppress of WASD keys
    this.input.keyboard.on('keyup_UP', (event) => {
      if (moveKeys['down'].isUp) {
        this.player.setVelocityY(0);
      }
      if (allKeysAreUp()) { console.log('lol'); this.player.anims.stop(null, 1) }
    });
    this.input.keyboard.on('keyup_DOWN', (event) => {
      if (moveKeys['up'].isUp) {
        this.player.setVelocityY(0);
      }
      if (allKeysAreUp()) { console.log('lol'); this.player.anims.stop(null, 1) }
    });
    this.input.keyboard.on('keyup_LEFT', (event) => {
      if (moveKeys['right'].isUp) {
        this.player.setVelocityX(0);
      }
      if (allKeysAreUp()) { console.log('lol'); this.player.anims.stop(null, 1) }
    });
    this.input.keyboard.on('keyup_RIGHT', (event) => {
      if (moveKeys['left'].isUp) {
        this.player.setVelocityX(0);
      }
      if (allKeysAreUp()) { console.log('lol'); this.player.anims.stop(null, 1) }
    });

  }

  playMusic() {
     const happyBackgroundMusic = this.sound.add('main_background_music');
      happyBackgroundMusic.play();
  }

  setupEnvironmentAndPlayer() {
    this.add.image(400, 320, 'bg');

    //Create walls physics object
    const walls = this.physics.add.staticGroup();
    walls.create(400, 400, 'wall');

    //Create winSquare physics object
    this.winSquare = this.physics.add.sprite(200, 200, 'winSquare');

    this.setupPlayer();
    this.physics.add.collider(this.player, walls);
  }

  setupPlayer() {
    //Player Object
    this.player = this.physics.add.sprite(400, 200, 'player');
    this.player.setScale(2, 2);

    var walkingRightFrames = this.anims.generateFrameNames('healdaSprites', {
      start: 1, end: 2, zeroPad: 1,
      prefix: 'right/default/', suffix: '.png'
    });
    this.anims.create({ key: 'walkingRight', frames: walkingRightFrames, frameRate: 6, repeat: -1 });

    var walkingLeftFrames = this.anims.generateFrameNames('healdaSprites', {
      start: 1, end: 2, zeroPad: 1,
      prefix: 'left/default/', suffix: '.png'
    });
    this.anims.create({ key: 'walkingLeft', frames: walkingLeftFrames, frameRate: 6, repeat: -1 });

    var walkingUpFrames = this.anims.generateFrameNames('healdaSprites', {
      start: 1, end: 2, zeroPad: 1,
      prefix: 'up/default/', suffix: '.png'
    });
    this.anims.create({ key: 'walkingUp', frames: walkingUpFrames, frameRate: 6, repeat: -1 });

    var walkingDownFrames = this.anims.generateFrameNames('healdaSprites', {
      start: 1, end: 2, zeroPad: 1,
      prefix: 'down/default/', suffix: '.png'
    });
    this.anims.create({ key: 'walkingDown', frames: walkingDownFrames, frameRate: 6, repeat: -1 });

    this.player.anims.play('walkingRight');
    this.player.setCollideWorldBounds(true);
  }
}