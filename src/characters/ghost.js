export default (scene, coordX, coordY) => {
    var ghost1 = scene.physics.add.sprite(500, 300);

    var ghostWalkingRightFrames = scene.anims.generateFrameNames('allSprites', {
        start: 1, end: 2, zeroPad: 1,
        prefix: 'npc/ghosties/', suffix: '.png'
    });
    scene.anims.create({ key: 'ghostWalkingRight', frames: ghostWalkingRightFrames, frameRate: 6, repeat: -1 });

    // var ghostHealedWalkingRightFrames = scene.anims.generateFrameNames('allSprites', {
    //     start: 1, end: 3, zeroPad: 1,
    //     prefix: 'npc/ghosties/healed/', suffix: '.png'
    // });
    // scene.anims.create({ key: 'ghostHealedWalkingRight', frames: ghostHealedWalkingRightFrames, frameRate: 6, repeat: -1 });

    ghost1.anims.play('ghostWalkingRight');
    ghost1.setScale(2, 2);
    ghost1.setCollideWorldBounds(true);
    return ghost1;
}