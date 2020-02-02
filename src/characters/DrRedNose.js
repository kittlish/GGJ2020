export default (scene, coordX, coordY) => {
    var drRedNose = scene.physics.add.sprite(coordX, coordY);

    var drRedNoseFrames = scene.anims.generateFrameNames('allSprites', {
        start: 1, end: 2, zeroPad: 1,
        prefix: 'npc/dr-red-nose/', suffix: '.png'
    });
    scene.anims.create({ key: 'drRedNoseStanding', frames: drRedNoseFrames, frameRate: 6, repeat: -1 });

    drRedNose.anims.play('drRedNoseStanding');
    drRedNose.setScale(2, 2);
    return drRedNose;
}