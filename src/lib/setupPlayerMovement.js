export default function setupMovement (scene, player) {
    // Creates object for input with arrow keys
    const moveKeys = scene.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.UP,
        'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
        'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
        'right': Phaser.Input.Keyboard.KeyCodes.RIGHT
    });

    // Enables movement of player with arrow keys
    scene.input.keyboard.on('keydown_UP', (event) => {
        player.updateMovement(moveKeys)
    });
    scene.input.keyboard.on('keydown_DOWN', (event) => {
        player.updateMovement(moveKeys)
    });
    scene.input.keyboard.on('keydown_LEFT', (event) => {
        player.updateMovement(moveKeys)
    });
    scene.input.keyboard.on('keydown_RIGHT', (event) => {
        player.updateMovement(moveKeys)
    });

    scene.input.keyboard.on('keyup_UP', (event) => {
        player.updateMovement(moveKeys)
    });
    scene.input.keyboard.on('keyup_DOWN', (event) => {
        player.updateMovement(moveKeys)
    });
    scene.input.keyboard.on('keyup_LEFT', (event) => {
        player.updateMovement(moveKeys)
    });
    scene.input.keyboard.on('keyup_RIGHT', (event) => {
        player.updateMovement(moveKeys)
    });
}