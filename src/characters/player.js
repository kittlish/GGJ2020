export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, coordX, coordY) {
        super(...arguments, 'playerBase');

        this.healed = true;
        this.hasWon = false;
        this.currentAnim = "down";
        this.stopped = true;
        this.playerSpeed = 160;

        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.body.velocity.normalize().scale(this.playerSpeed);
        this.scene.add.existing(this);

        this.setSize(12, 10);
        this.setOffset(1, 30);
        this.setScale(1.5);
        this.setCollideWorldBounds(true);

        // set up animation frames
        var animationsWithSources = {
            'player-walking-left-default': 'player/left/default/',
            'player-walking-right-default': 'player/right/default/',
            'player-walking-up-default': 'player/up/default/',
            'player-walking-down-default': 'player/down/default/',
            'player-walking-left-gray': 'player/left/gray/',
            'player-walking-right-gray': 'player/right/gray/',
            'player-walking-up-gray': 'player/up/gray/',
            'player-walking-down-gray': 'player/down/gray/',
        }

        Object.keys(animationsWithSources).forEach((animationKey) => {
            var frames = scene.anims.generateFrameNames('allSprites', {
                start: 1, end: 2, zeroPad: 1,
                prefix: animationsWithSources[animationKey], suffix: '.png'
            });
            scene.anims.create({
                key: animationKey,
                frames: frames,
                frameRate: 6,
                repeat: -1
            })
        })

        // Starts the player in the Walking Up animation
        this.anims.play('player-walking-up-default');
    }

    get spriteClass() {
        if (this.healed) {
            return 'default';
        } else {
            return 'gray';
        }
    }

    move(direction) {
        this.currentAnim = direction;
        this.stopped = false;

        if (direction == 'left') {
            this.setVelocityX(-this.playerSpeed);
        } else if (direction == 'right') {
            this.setVelocityX(this.playerSpeed)
        } else if (direction == 'up') {
            this.setVelocityY(-this.playerSpeed)
        } else if (direction == 'down' ) {
            this.setVelocityY(this.playerSpeed)
        }

        this.anims.play(`player-walking-${this.currentAnim}-${this.spriteClass}`)
        walkingSounds.play();
    }

    stop(walkingSounds) {
        this.anims.stop(null, 1);
        walkingSounds.pause();
        this.stopped = true;
    }
}