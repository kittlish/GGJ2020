import inRange from '../lib/inRange';
import callText from '../lib/callText.js';
import configText from '../lib/configText';
import displayInteractText from '../lib/displayInteractText';
import coordinates from '../lib/coordinates';
import drRedNoseCharacter from '../characters/DrRedNose';
import playerCharacter from '../characters/player';
import ghostCharacter from '../characters/ghost';
import setupPlayerMovement from '../lib/setupPlayerMovement';
import setupDialog from '../lib/setupDialog';

export class SimpleScene extends Phaser.Scene {

  preload () {
    this.load.image('bg', 'assets/bg.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.audio('main_background_music', ['assets/game jam music draft 1.0.mp3']);
    this.load.audio('steps', ['assets/Steps.mp3']);
    this.load.audio('spooky', ['assets/spooookieeee.mp3']);
    this.load.image('winSquare', 'assets/npc.png');
    this.load.image('playerBase', 'assets/player_base.png');
    this.load.multiatlas('allSprites', 'assets/ggj2020.json', 'assets');
    this.load.image("allSpritesImage", "assets/ggj2020.png");
    this.load.tilemapTiledJSON("chadMap", "assets/Chad.json");
  }

  create () {
    this.setupMusic();
    this.displayHelpText();
    this.setupMap();

    //this.setupDialog();    

    this.ghost = ghostCharacter(this, ...coordinates(10, 15));
    this.drRedNose = drRedNoseCharacter(this, ...coordinates(17, 15));
    this.player = playerCharacter(this, ...coordinates(10, 17));
    this.winSquare = this.physics.add.sprite(...coordinates(23, 3), 'winSquare');

    // set up interactions between things
    this.physics.add.collider(this.player, this.wallsLayer);

    setupPlayerMovement(this, this.player, this.steps);

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


    this.input.keyboard.on('keydown_SPACE', (event) => {
      if (inRange(this.player, this.winSquare)) {
        this.displayWinText();
      }
    });

    setupDialog(this);
  }

  update (time,delta) {
    // follow character
    this.cameras.main.centerOn(this.player.x, this.player.y)
  }
    
  displayWinText() {
    var winningText = this.add.text(700, 100, 'Winner!');
    winningText.setStroke('#000', 8);
    winningText.setShadow(2, 2, "#333333", 2, true, true);
    callText(winningText, 'Winner!');

    const spooky = this.sound.add('spooky');
    spooky.play();
  }

  setupMusic() {
    this.backgroundMusic = this.sound.add('main_background_music');
    this.steps = this.sound.add('steps');
    this.spooky = this.sound.add('spooky');

//     this.backgroundMusic.play();
  }

  displayHelpText() {
    // Help text that has a "fixed" position on the screen
    this.add
      .text(20, 16, "Arrow keys to scroll", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
        backgroundColor: "#000000"
      })
      .setScrollFactor(0);
  }

  setupDialog() {
    var drRColor = '#800000';
    var healdaColor = '#000066';

    var textContainer = this.add.container(150, 250);
    var dialogueContainer = this.add.container(50, 250);


    var mainText = configText(this.add.text(0, 0, '', { align: 'center' }), textContainer, '#000', '#333333');
    var drRText = configText(this.add.text(0, 20, '', { align: 'center' }), dialogueContainer, '#000', drRColor);
    var healdaText = configText(this.add.text(0, 40, '', { align: 'center' }), dialogueContainer, '#000', healdaColor);

    //var winningText = configText(this.add.text(10, 10, 'Winner!'), textContainer, '#000', '#333333');

    var startingLine = 0;
    var myline;

    var lines = [
      { speaker: 'Dr. R', line: 'Hello-ho-ho-ho you, over there! Please, help me!' },
      { speaker: 'Healda', line: 'o.O ...' },
      { speaker: 'Dr. R', line: 'well?' },
      { speaker: 'Healda', line: 'bee boop' },
      { speaker: 'Dr. R', line: 'do you even understand me?' },
      { speaker: 'Healda', line: '[nods]' },
      { speaker: 'Dr. R', line: 'Oh you don\'t speak do you?' },
      { speaker: 'Dr. R', line: 'Well never mind that, you must help me!' },
      { speaker: 'Dr. R', line: 'That would be the nice thing to do...' },
      { speaker: 'Dr. R', line: '...and you wouldn\'t happen to be one of the naughty ones, would you?' },
      { speaker: 'Dr. R', line: 'You don’t seem the naughty type...' },
      { speaker: 'Healda', line: 'o.o' },
      { speaker: 'Dr. R', line: 'Anywho, my arch nemesis Dr. Blitzen von Vixen has stolen my formula for my medicine!' },
      { speaker: 'Dr. R', line: 'I am deathly ill and I need that cure!' },
      { speaker: 'Dr. R', line: 'Could you please explore this Omega Building and find the formula?' },
      { speaker: 'Dr. R', line: 'Also… there may or may not be evil  deadly robots lurking in here…' },

    ]

    var helloText = 'Welcome to our game!';

    callText(mainText, helloText);
    setTimeout(() => { callText(mainText, '') }, 2000);

    var currentTextObj;


    this.input.keyboard.on('keydown_SPACE', (event) => {
      if(inRange(this.player, this.drRedNose)){
        if (startingLine > 0) {
          drRText.setText('');
          healdaText.setText('');
        }
  
        if (startingLine < lines.length) {
          myline = lines[startingLine];
          if (myline.speaker == 'Dr. R') {
            callText(drRText, myline.line);
          }
          if (myline.speaker == 'Healda') {
            callText(healdaText, myline.line);
          }
  
        }
        startingLine = (startingLine + 1) % (lines.length + 1);
      }else{
        drRText.setText('');
        healdaText.setText('');
      }
    });
  }

  setupMap() {
    this.map = this.make.tilemap({ key: "chadMap" });

    const tileset = this.map.addTilesetImage('screen', 'allSpritesImage');
    const floorLayer = this.map.createStaticLayer("Floor", tileset, 0, 0);
    this.wallsLayer = this.map.createStaticLayer("Walls", tileset, 0, 0);
    this.wallsLayer.setCollisionByProperty({ collides: true });
  }
}