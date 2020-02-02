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
import updateGhostMovement from "../lib/updateGhostMovement";

export class SimpleScene extends Phaser.Scene {

  preload () {
    this.load.image('bg', 'assets/bg.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.audio('main_background_music', ['assets/the little robot that could.ogg']);
    this.load.audio('victory_music', ['assets/the little robot that won.ogg']);
    this.load.audio('steps', ['assets/Steps.mp3']);
    this.load.audio('spooky', ['assets/spooookieeee.mp3']);
    this.load.image('winSquare', 'assets/script.png');
    this.load.image('playerBase', 'assets/player_base.png');
    this.load.multiatlas('allSprites', 'assets/ggj2020.json', 'assets');
    this.load.image("coyMapTilesImage", "assets/coy-map-tiles.png");
    this.load.tilemapTiledJSON("omegaBuilding", "assets/Omega Building.json");
    this.load.image('spotlight', 'assets/spotlight.png')
  }

  create () {
    this.setupMusic();
    this.setupMap();

    this.winSquare = this.physics.add.sprite(...coordinates(23.5, 4.5), 'winSquare');
    this.drRedNose = drRedNoseCharacter(this, ...coordinates(9, 18));
    this.player = playerCharacter(this, ...coordinates(9, 19));
    this.ghost = ghostCharacter(this, ...coordinates(10, 15));

    this.spotlight = this.physics.add.sprite(...coordinates(9, 19), 'spotlight')

    //The things the player can interact with in the game.  When the player is nearby, they'll be prompted with help text.
    var interactables = [this.drRedNose, this.winSquare];
    for(var i = 0; i < interactables.length; i++){
      this.physics.add.overlap(this.player, interactables[i], () => {
        displayInteractText(this, this.cameras);
      }, null, true);
    }



    // set up interactions between things
    this.physics.add.collider(this.player, this.wallsLayer);

    // setupPlayerMovement(this, this.player, this.steps);

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    // this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


    this.input.keyboard.on('keydown_SPACE', (event) => {
      if (inRange(this.player, this.winSquare) && !this.player.hasWon) {
        this.winner();
      }
    });

    setupDialog(this);
  }

  update (time,delta) {
    this.spotlight.x = this.player.x;
    this.spotlight.y = this.player.y;

    this.cameras.main.centerOn(this.player.x, this.player.y);

    updateGhostMovement(this.ghost, this.player);
  }

  winner() {
    var winningText = this.add.text(700, 100, 'Winner!');
    winningText.setStroke('#000', 8);
    winningText.setShadow(2, 2, "#333333", 2, true, true);
    callText(winningText, 'Winner!');

    this.player.healed = true;
    this.player.anims.play('playerWalkingDown');
    this.player.anims.stop();
    this.backgroundMusic.stop();
    victoryTheme(this);

    //disable winning
    this.player.hasWon = true;
  }

  setupMusic() {
    this.backgroundMusic = this.sound.add('main_background_music');
    this.steps = this.sound.add('steps');
    this.spooky = this.sound.add('spooky');

    // this.backgroundMusic.play({loop: true});
  }


  setupMap() {
    this.map = this.make.tilemap({ key: "omegaBuilding" });

    const tileset = this.map.addTilesetImage('coy-map-tiles', 'coyMapTilesImage');
    this.wallsLayer = this.map.createStaticLayer("Omega Building Main Layer", tileset, 0, 0);
    this.wallsLayer.setCollisionByProperty({ collide: true });
  }
}

function victoryTheme(scene) {
  const victoryMusic = scene.sound.add('victory_music');
  victoryMusic.play();
}
