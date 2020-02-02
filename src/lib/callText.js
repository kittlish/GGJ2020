export default function(textObj, textStr, timeout){
    textObj.setText(textStr);
    setTimeout(() => {
        textObj.setText('');
    }, timeout);
}