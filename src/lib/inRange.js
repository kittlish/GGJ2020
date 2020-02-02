export default function (objectOne, objectTwo, distance = 32) {
    var nearOnX = (Math.abs(objectOne.x - objectTwo.x) <= distance);
    var nearOnY = (Math.abs(objectOne.y - objectTwo.y) <= distance);
    return nearOnX && nearOnY;
}