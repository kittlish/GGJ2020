export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, coordX, coordY) {
        super(...arguments, 'playerBase');
        
        this.scene = scene;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.setSize(12, 10);
        this.setOffset(1, 30);
        this.setScale(1.5);
        this.healed = true;
        console.log("oh no");
        this.hasWon = false;
        this.currentAnim = "down";
        this.stopped = true;

        var playerWalkingRightFrames = scene.anims.generateFrameNames('allSprites', {
            start: 1, end: 2, zeroPad: 1,
            prefix: 'player/right/default/', suffix: '.png'
        });
        scene.anims.create({ key: 'playerWalkingRight', frames: playerWalkingRightFrames, frameRate: 6, repeat: -1 });

        var playerWalkingLeftFrames = scene.anims.generateFrameNames('allSprites', {
            start: 1, end: 2, zeroPad: 1,
            prefix: 'player/left/default/', suffix: '.png'
        });
        scene.anims.create({ key: 'playerWalkingLeft', frames: playerWalkingLeftFrames, frameRate: 6, repeat: -1 });

        var playerWalkingUpFrames = scene.anims.generateFrameNames('allSprites', {
            start: 1, end: 2, zeroPad: 1,
            prefix: 'player/up/default/', suffix: '.png'
        });
        scene.anims.create({ key: 'playerWalkingUp', frames: playerWalkingUpFrames, frameRate: 6, repeat: -1 });

        var playerWalkingDownFrames = scene.anims.generateFrameNames('allSprites', {
            start: 1, end: 2, zeroPad: 1,
            prefix: 'player/down/default/', suffix: '.png'
        });
        scene.anims.create({ key: 'playerWalkingDown', frames: playerWalkingDownFrames, frameRate: 6, repeat: -1 });

        // gray player
        var grayPlayerWalkingRightFrames = scene.anims.generateFrameNames('allSprites', {
            start: 1, end: 6, zeroPad: 1,
            prefix: 'player/right/gray/', suffix: '.png'
        });
        scene.anims.create({ key: 'grayPlayerWalkingRight', frames: grayPlayerWalkingRightFrames, frameRate: 10, repeat: -1 });

        var grayPlayerWalkingLeftFrames = scene.anims.generateFrameNames('allSprites', {
            start: 1, end: 6, zeroPad: 1,
            prefix: 'player/left/gray/', suffix: '.png'
        });
        scene.anims.create({ key: 'grayPlayerWalkingLeft', frames: grayPlayerWalkingLeftFrames, frameRate: 10, repeat: -1 });

        var grayPlayerWalkingUpFrames = scene.anims.generateFrameNames('allSprites', {
            start: 1, end: 6, zeroPad: 1,
            prefix: 'player/up/gray/', suffix: '.png'
        });
        scene.anims.create({ key: 'grayPlayerWalkingUp', frames: grayPlayerWalkingUpFrames, frameRate: 10, repeat: -1 });

        var grayPlayerWalkingDownFrames = scene.anims.generateFrameNames('allSprites', {
            start: 1, end: 6, zeroPad: 1,
            prefix: 'player/down/gray/', suffix: '.png'
        });
        scene.anims.create({ key: 'grayPlayerWalkingDown', frames: grayPlayerWalkingDownFrames, frameRate: 10, repeat: -1 });

        // scene.anims.create({ key: 'blueBottom', frames: [{ key: 'allSprites', frame: 'level/Blue bottom.png'}] })
        // scene.anims.create({ key: 'playerStandingRight', frames: [{ key: 'allSprites', frame: "player/standing/default/right.png" }] })
        // scene.anims.create({ key: 'playerStandingUp', frames: [{ key: 'allSprites', frame: "player/standing/default/back.png" }] })
        // scene.anims.create({ key: 'playerStandingLeft', frames: [{ key: 'allSprites', frame: "player/standing/default/left.png" }] })
        // scene.anims.create({ key: 'playerStandingDown', frames: [{ key: 'allSprites', frame: "player/standing/default/front.png" }] })
        // scene.anims.create({ key: 'grayPlayerStandingRight', frames: [{ key: 'allSprites', frame: "player/standing/gray/right.png" }] })
        // scene.anims.create({ key: 'grayPlayerStandingUp', frames: [{ key: 'allSprites', frame: "player/standing/gray/back.png" }] })
        // scene.anims.create({ key: 'grayPlayerStandingLeft', frames: [{ key: 'allSprites', frame: "player/standing/gray/left.png" }] })
        // scene.anims.create({ key: 'grayPlayerStandingDown', frames: [{ key: 'allSprites', frame: "player/standing/gray/front.png" }] })

        // this.anims.play('grayPlayerStandingDown');
        this.setCollideWorldBounds(true);

        // Starts the player in the Walking Up animation
        this.anims.play('playerWalkingUp');
    }
}