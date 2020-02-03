export default function (scene, animationsWithSources) {
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
}