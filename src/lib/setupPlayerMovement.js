export default function setupMovement (scene, player) {
    const walkingSounds = player.walkingSounds;
    // Creates object for input with arrow keys
    const moveKeys = scene.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.UP,
        'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
        'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
        'right': Phaser.Input.Keyboard.KeyCodes.RIGHT
    });

    // Enables movement of player with arrow keys
    scene.input.keyboard.on('keydown_UP', (event) => {
        player.move('up', walkingSounds, moveKeys)
    });
    scene.input.keyboard.on('keydown_DOWN', (event) => {
        player.move('down', walkingSounds, moveKeys)
    });
    scene.input.keyboard.on('keydown_LEFT', (event) => {
        player.move('left', walkingSounds, moveKeys)
    });
    scene.input.keyboard.on('keydown_RIGHT', (event) => {
        player.move('right', walkingSounds, moveKeys)
    });

    scene.input.keyboard.on('keyup_UP', (event) => {
        player.move('up', walkingSounds, moveKeys)
    });
    scene.input.keyboard.on('keyup_DOWN', (event) => {
        player.move('down', walkingSounds, moveKeys)
    });
    scene.input.keyboard.on('keyup_LEFT', (event) => {
        player.move('left', walkingSounds, moveKeys)
    });
    scene.input.keyboard.on('keyup_RIGHT', (event) => {
        player.move('right', walkingSounds, moveKeys)
    });


    // const allKeysAreUp = function () { return moveKeys['up'].isUp && moveKeys['down'].isUp && moveKeys['left'].isUp && moveKeys['right'].isUp; }

    // // Stops player acceleration on uppress of WASD keys
    // scene.input.keyboard.on('keyup_UP', (event) => {
    //     if (moveKeys['down'].isUp) {
    //         player.setVelocityY(0);
    //     }
    //     if (allKeysAreUp()) {
    //         player.stop()
    //     }
    // });
    // scene.input.keyboard.on('keyup_DOWN', (event) => {
    //     if (moveKeys['up'].isUp) {
    //         player.setVelocityY(0);
    //     }
    //     if (allKeysAreUp()) {
    //         player.stop()
    //     }
    // });
    // scene.input.keyboard.on('keyup_LEFT', (event) => {
    //     if (moveKeys['right'].isUp) {
    //         player.setVelocityX(0);
    //     }
    //     if (allKeysAreUp()) {
    //         player.stop()
    //     }
    // });
    // scene.input.keyboard.on('keyup_RIGHT', (event) => {
    //     if (moveKeys['left'].isUp) {
    //         player.setVelocityX(0);
    //     }
    //     if (allKeysAreUp()) {
    //         player.stop()
    //     }
    // });
}