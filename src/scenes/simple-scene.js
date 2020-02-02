import inRange from '../lib/inRange';
import callText from '../lib/callText.js';
import configText from '../lib/configText'


export class SimpleScene extends Phaser.Scene {

  preload () {
    this.load.image('bg', 'assets/bg.png');
    this.load.image('player', 'assets/Healda/standing/default/right.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.audio('main_background_music', ['assets/game jam music draft 1.0.mp3']);
    this.load.audio('steps', ['assets/Steps.mp3']);
    this.load.audio('spooky', ['assets/spooookieeee.mp3']);
    this.load.image('winSquare', 'assets/npc.png');
    this.load.multiatlas('healdaSprites', 'assets/Healda/healda.json', 'assets/Healda');
    this.load.multiatlas('allSprites', 'assets/ggj2020.json', 'assets');
  }
    

  create () {
    this.setupMusic();
    this.setupEnvironmentAndPlayer();
    this.setupMovement();
      
    var drRColor = '#800000';
    var healdaColor = '#000066';
      
    var textContainer = this.add.container(150, 250);
    var dialogueContainer = this.add.container(50, 250);
    var mainText = configText(this.add.text(0,0,'', {align: 'center'}), textContainer, '#000', '#333333');   
    var drRText = configText(this.add.text(0,20,'', {align: 'center'}), dialogueContainer, '#000', drRColor);
    var healdaText = configText(this.add.text(0, 40, '', {align: 'center'}), dialogueContainer, '#000', healdaColor);
     
    var startingLine = 0;
    var myline;

    var lines = [
        {speaker: 'Dr. R', line: 'Hello-ho-ho-ho you, over there! Please, help me!'},
        {speaker: 'Healda', line:  'o.O ...'},
        {speaker: 'Dr. R', line: 'well?'},
        {speaker: 'Healda', line: 'bee boop'},
        {speaker: 'Dr. R', line: 'do you even understand me?'},
        {speaker: 'Healda', line: '[nods]'},
        {speaker: 'Dr. R', line: 'Oh you don\'t speak do you?'} ,
        {speaker: 'Dr. R', line: 'Well never mind that, you must help me!'}, 
        {speaker: 'Dr. R', line: 'That would be the nice thing to do...'},
        {speaker: 'Dr. R', line: '...and you wouldn\'t happen to be one of the naughty ones, would you?'},
        {speaker: 'Dr. R', line: 'You don’t seem the naughty type...'},
        {speaker: 'Healda', line: 'o.o'},
        {speaker: 'Dr. R', line: 'Anywho, my arch nemesis Dr. Blitzen von Vixen has stolen my formula for my medicine!'},
        {speaker: 'Dr. R', line: 'I am deathly ill and I need that cure!'},
        {speaker: 'Dr. R', line: 'Could you please explore this Omega Building and find the formula?'},
        {speaker: 'Dr. R', line: 'Also… there may or may not be evil  deadly robots lurking in here…'},
                
    ]
      
    var helloText = 'Welcome to our game!';
      
    callText(mainText, helloText);
    setTimeout(() => {callText(mainText, '')}, 2000);
      
    var currentTextObj;

      
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

    const spooky = this.sound.add('spooky');
    spooky.play();
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
      this.player.anims.play('grayPlayerWalkingUp');
      this.steps.play();
    });
    this.input.keyboard.on('keydown_DOWN', (event) => {
      this.player.setVelocityY(playerSpeed);
      this.player.anims.play('grayPlayerWalkingDown');
      this.steps.play();
    });
    this.input.keyboard.on('keydown_LEFT', (event) => {
      this.player.setVelocityX(-playerSpeed);
      this.player.anims.play('grayPlayerWalkingLeft');
      this.steps.play();
    });
    this.input.keyboard.on('keydown_RIGHT', (event) => {
      this.player.setVelocityX(playerSpeed);
      this.player.anims.play('grayPlayerWalkingRight');
      this.steps.play();
    });

    const allKeysAreUp = function () { return moveKeys['up'].isUp && moveKeys['down'].isUp && moveKeys['left'].isUp && moveKeys['right'].isUp; }

    // Stops player acceleration on uppress of WASD keys
    this.input.keyboard.on('keyup_UP', (event) => {
      if (moveKeys['down'].isUp) {
        this.player.setVelocityY(0);
      }
      if (allKeysAreUp()) {
        this.player.anims.stop(null, 1)
        this.steps.pause();
      }
    });
    this.input.keyboard.on('keyup_DOWN', (event) => {
      if (moveKeys['up'].isUp) {
        this.player.setVelocityY(0);
      }
      if (allKeysAreUp()) {
        this.player.anims.stop(null, 1)
        this.steps.pause();
      }
    });
    this.input.keyboard.on('keyup_LEFT', (event) => {
      if (moveKeys['right'].isUp) {
        this.player.setVelocityX(0);
      }
      if (allKeysAreUp()) {
        this.player.anims.stop(null, 1)
        this.steps.pause();
      }
    });
    this.input.keyboard.on('keyup_RIGHT', (event) => {
      if (moveKeys['left'].isUp) {
        this.player.setVelocityX(0);
      }
      if (allKeysAreUp()) {
        this.player.anims.stop(null, 1)
        this.steps.pause();
      }
    });

  }

  setupMusic() {
    this.backgroundMusic = this.sound.add('main_background_music');
    this.steps = this.sound.add('steps');
    this.spooky = this.sound.add('spooky');

    // this.backgroundMusic.play();
  }

  setupEnvironmentAndPlayer() {
    this.add.image(400, 320, 'bg');

    //Create walls physics object
    const walls = this.physics.add.staticGroup();
    walls.create(400, 400, 'wall');

    //Create winSquare physics object
    this.winSquare = this.physics.add.sprite(200, 200, 'winSquare');

    this.setupGhost();
    this.setupDrRedNose();
    this.setupPlayer();
    this.physics.add.collider(this.player, walls);
  }

  setupGhost() {
    this.ghost1 = this.physics.add.sprite(500, 300);
 
    var ghostWalkingRightFrames = this.anims.generateFrameNames('allSprites', {
      start: 1, end: 2, zeroPad: 1,
      prefix: 'npc/ghosties/', suffix: '.png'
    });
    this.anims.create({ key: 'ghostWalkingRight', frames: ghostWalkingRightFrames, frameRate: 6, repeat: -1 });
    
    this.ghost1.anims.play('ghostWalkingRight');
    this.ghost1.setScale(2, 2);
  }

  setupDrRedNose() {
    this.drRedNose = this.physics.add.sprite(200, 500);
 
    var drRedNoseFrames = this.anims.generateFrameNames('allSprites', {
      start: 1, end: 2, zeroPad: 1,
      prefix: 'npc/dr-red-nose/', suffix: '.png'
    });
    this.anims.create({ key: 'drRedNoseStanding', frames: drRedNoseFrames, frameRate: 6, repeat: -1 });
    
    this.drRedNose.anims.play('drRedNoseStanding');
    this.drRedNose.setScale(2, 2);

  }

  setupPlayer() {
    //Player Object
    this.player = this.physics.add.sprite(400, 200, 'player');
    this.player.setScale(2, 2);

    var playerWalkingRightFrames = this.anims.generateFrameNames('allSprites', {
      start: 1, end: 2, zeroPad: 1,
      prefix: 'player/right/default/', suffix: '.png'
    });
    this.anims.create({ key: 'playerWalkingRight', frames: playerWalkingRightFrames, frameRate: 6, repeat: -1 });

    var playerWalkingLeftFrames = this.anims.generateFrameNames('allSprites', {
      start: 1, end: 2, zeroPad: 1,
      prefix: 'player/left/default/', suffix: '.png'
    });
    this.anims.create({ key: 'playerWalkingLeft', frames: playerWalkingLeftFrames, frameRate: 6, repeat: -1 });

    var playerWalkingUpFrames = this.anims.generateFrameNames('allSprites', {
      start: 1, end: 2, zeroPad: 1,
      prefix: 'player/up/default/', suffix: '.png'
    });
    this.anims.create({ key: 'playerWalkingUp', frames: playerWalkingUpFrames, frameRate: 6, repeat: -1 });

    var playerWalkingDownFrames = this.anims.generateFrameNames('allSprites', {
      start: 1, end: 2, zeroPad: 1,
      prefix: 'player/down/default/', suffix: '.png'
    });
    this.anims.create({ key: 'playerWalkingDown', frames: playerWalkingDownFrames, frameRate: 6, repeat: -1 });

    // gray player
    var grayPlayerWalkingRightFrames = this.anims.generateFrameNames('allSprites', {
      start: 1, end: 2, zeroPad: 1,
      prefix: 'player/right/gray/', suffix: '.png'
    });
    this.anims.create({ key: 'grayPlayerWalkingRight', frames: grayPlayerWalkingRightFrames, frameRate: 6, repeat: -1 });

    var grayPlayerWalkingLeftFrames = this.anims.generateFrameNames('allSprites', {
      start: 1, end: 2, zeroPad: 1,
      prefix: 'player/left/gray/', suffix: '.png'
    });
    this.anims.create({ key: 'grayPlayerWalkingLeft', frames: grayPlayerWalkingLeftFrames, frameRate: 6, repeat: -1 });

    var grayPlayerWalkingUpFrames = this.anims.generateFrameNames('allSprites', {
      start: 1, end: 8, zeroPad: 1,
      prefix: 'player/up/gray/', suffix: '.png'
    });
    this.anims.create({ key: 'grayPlayerWalkingUp', frames: grayPlayerWalkingUpFrames, frameRate: 6, repeat: -1 });

    var grayPlayerWalkingDownFrames = this.anims.generateFrameNames('allSprites', {
      start: 1, end: 2, zeroPad: 1,
      prefix: 'player/down/gray/', suffix: '.png'
    });
    this.anims.create({ key: 'grayPlayerWalkingDown', frames: grayPlayerWalkingDownFrames, frameRate: 6, repeat: -1 });

    // this.anims.create({ key: 'blueBottom', frames: [{ key: 'allSprites', frame: 'level/Blue bottom.png'}] })
    this.anims.create({ key: 'playerStandingRight', frames: [{ key: 'allSprites', frame: "player/standing/default/right.png" }] })
    this.anims.create({ key: 'playerStandingUp', frames: [{ key: 'allSprites', frame: "player/standing/default/back.png" }] })
    this.anims.create({ key: 'playerStandingLeft', frames: [{ key: 'allSprites', frame: "player/standing/default/left.png" }] })
    this.anims.create({ key: 'playerStandingDown', frames: [{ key: 'allSprites', frame: "player/standing/default/front.png" }] })
    this.anims.create({ key: 'grayPlayerStandingRight', frames: [{ key: 'allSprites', frame: "player/standing/gray/right.png" }] })
    this.anims.create({ key: 'grayPlayerStandingUp', frames: [{ key: 'allSprites', frame: "player/standing/gray/back.png" }] })
    this.anims.create({ key: 'grayPlayerStandingLeft', frames: [{ key: 'allSprites', frame: "player/standing/gray/left.png" }] })
    this.anims.create({ key: 'grayPlayerStandingDown', frames: [{ key: 'allSprites', frame: "player/standing/gray/front.png" }] })

    this.player.anims.play('grayPlayerStandingDown');
    this.player.setCollideWorldBounds(true);
  }
}