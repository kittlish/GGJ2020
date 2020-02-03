export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, coordX, coordY) {
        super(...arguments, 'playerBase');

        this.healed = true;
        this.hasWon = false;
        this.currentAnim = "down";
        this.stopped = true;

        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.setSize(12, 10);
        this.setOffset(1, 30);
        this.setScale(1.5);
        this.setCollideWorldBounds(true);

        // set up animation frames
        var animationsWithSources = {
            'playerWalkingLeft': 'player/left/default/',
            'playerWalkingRight': 'player/right/default/',
            'playerWalkingUp': 'player/up/default/',
            'playerWalkingDown': 'player/down/default/',
            'grayPlayerWalkingLeft': 'player/left/gray/',
            'grayPlayerWalkingRight': 'player/right/gray/',
            'grayPlayerWalkingUp': 'player/up/gray/',
            'grayPlayerWalkingDown': 'player/down/gray/',
        }

        Object.keys(animationsWithSources).forEach((animationKey) => {
            var frames = scene.anims.generateFrameNames('allSprites', {
                start: 1, end: 2, zeroPad: 1,
                prefix: animationsWithSources[animationKey], suffix: '.png'
            });
            debugger;
            scene.anims.create({
                key: animationKey,
                frames: frames,
                frameRate: 6,
                repeat: -1
            })
        })

        // Starts the player in the Walking Up animation
        this.anims.play('playerWalkingUp');
    }
}