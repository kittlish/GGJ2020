//Displays the help text "Press Z to interact" whenever the player is near an interactable object.

import configText from '../lib/configText';
export default function displayInteractText(scene, player){

    var interactTextContainer = scene.add.container(player.x, player.y);
    var interactText = configText(scene.add.text(600,0,'Press Z to interact'), interactTextContainer, '#000', '#333333');
    setTimeout(() => {interactText.destroy(true)}, 10); 

}