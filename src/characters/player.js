export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, coordX, coordY) {
        super(...arguments, 'playerBase');

        this._healed = true;
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

        this.setUpAnimations();

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

    updateMovement() {
        // Creates object for input with arrow keys
        const moveKeys = this.scene.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.UP,
            'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT
        });

        const allMoveKeysAreUp = moveKeys['up'].isUp && moveKeys['down'].isUp && moveKeys['left'].isUp && moveKeys['right'].isUp;

        if (allMoveKeysAreUp) {
            this.stop();
        } else {
            this.stopped = false;
            if (moveKeys['up'].isDown == moveKeys['down'].isDown) {
                this.setVelocityY(0);
            } else if (moveKeys['up'].isDown) {
                this.setVelocityY(-this.playerSpeed)
                this.currentAnim = 'up';
            } else {
                this.setVelocityY(this.playerSpeed);
                this.currentAnim = 'down';
            }
            if (moveKeys['left'].isDown == moveKeys['right'].isDown) {
                this.setVelocityX(0);
            } else if (moveKeys['left'].isDown) {
                this.setVelocityX(-this.playerSpeed);
                this.currentAnim = 'left';
            } else {
                this.setVelocityX(this.playerSpeed);
                this.currentAnim = 'right';
            }

            this.updateAnimation();
            this.walkingSounds.play();
        }
    }

    updateAnimation() {
        this.anims.play(`player-walking-${this.currentAnim}-${this.spriteClass}`)

        if (this.stopped) {
            this.anims.stop();
        }
    }

    stop() {
        this.setVelocity(0, 0);
        this.anims.stop(null, 1);
        this.walkingSounds.pause();
        this.stopped = true;
    }

    get healed() {
        return this._healed;
    }

    set healed(newhealed) {
        if (this._healed == newhealed) return;
        this._healed = newhealed;

        this.updateAnimation();
    }

    setUpAnimations() {
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
            var frames = this.scene.anims.generateFrameNames('allSprites', {
                start: 1, end: 2, zeroPad: 1,
                prefix: animationsWithSources[animationKey], suffix: '.png'
            });
            this.scene.anims.create({
                key: animationKey,
                frames: frames,
                frameRate: 6,
                repeat: -1
            })
        })
    }
}