export default function configText (textObj, container, textColor, shadowColor){
    textObj.setStroke(textColor, 8);
    textObj.setShadow(2, 2, shadowColor, true, true);
    container.add(textObj);
    return textObj;
}