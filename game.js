var config = {
    type: Phaser.AUTO,
    width: 25 * 32,
    height: 20 * 32,
    //scene: scenes;
    physics: {
    default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: true
        }
    },

    scene: {
        preload: preload,
        create: create
    }
};

//var scenes = [];
//scenes.push(LoadScene);
//scenes.push(TitleScene);
//scenes.push()
var game = new Phaser.Game(config);
var playerSpeed = 160;

function preload ()
{
    this.load.image('bg', 'assets/bg.png');
    this.load.image('player', 'assets/botty.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.audio('poppins_quality_whistling', ['assets/Poppins_Quality_Whistling_2.mp3']);
}

function create ()
{
    this.add.image(400, 320, 'bg');
    //this.add.image(400, 400, 'wall');
    //this.add.image(400, 200, 'player');
    happyBackgroundMusic = this.sound.add('poppins_quality_whistling');
    happyBackgroundMusic.play();


    //Create walls physics object
    walls = this.physics.add.staticGroup();
    walls.create(400, 400, 'wall');

    //Player Object
    player = this.physics.add.sprite(400, 200, 'player');
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, walls);


    // Creates object for input with WASD kets


    moveKeys = this.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'down': Phaser.Input.Keyboard.KeyCodes.S,
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'right': Phaser.Input.Keyboard.KeyCodes.D
    });

    // Enables movement of player with WASD keys
    this.input.keyboard.on('keydown_W', function (event) {
        player.setVelocityY(-playerSpeed);
    });
    this.input.keyboard.on('keydown_S', function (event) {
        player.setVelocityY(playerSpeed);
    });
    this.input.keyboard.on('keydown_A', function (event) {
        player.setVelocityX(-playerSpeed);
    });
    this.input.keyboard.on('keydown_D', function (event) {
        player.setVelocityX(playerSpeed);
    });

    // Stops player acceleration on uppress of WASD keys
    this.input.keyboard.on('keyup_W', function (event) {
        if (moveKeys['down'].isUp)
            player.setVelocityY(0);
    });
    this.input.keyboard.on('keyup_S', function (event) {
        if (moveKeys['up'].isUp)
            player.setVelocityY(0);
    });
    this.input.keyboard.on('keyup_A', function (event) {
        if (moveKeys['right'].isUp)
            player.setVelocityX(0);
    });
    this.input.keyboard.on('keyup_D', function (event) {
        if (moveKeys['left'].isUp)
            player.setVelocityX(0);
    });

}
