export default function setupMovement (scene, player) {
    scene.input.keyboard.on('keydown_UP', (event) => {
        player.updateMovement()
    });
    scene.input.keyboard.on('keydown_DOWN', (event) => {
        player.updateMovement()
    });
    scene.input.keyboard.on('keydown_LEFT', (event) => {
        player.updateMovement()
    });
    scene.input.keyboard.on('keydown_RIGHT', (event) => {
        player.updateMovement()
    });

    scene.input.keyboard.on('keyup_UP', (event) => {
        player.updateMovement()
    });
    scene.input.keyboard.on('keyup_DOWN', (event) => {
        player.updateMovement()
    });
    scene.input.keyboard.on('keyup_LEFT', (event) => {
        player.updateMovement()
    });
    scene.input.keyboard.on('keyup_RIGHT', (event) => {
        player.updateMovement()
    });
}