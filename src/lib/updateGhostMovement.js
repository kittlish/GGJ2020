export default function updateGhostMovement(ghost, player) {
  const ghostXDiff = Math.round(player.x - ghost.x);
  const ghostYDiff = Math.round(player.y - ghost.y);

  if (ghostXDiff < 0) {
    if (ghostYDiff > 0)
      ghost.setVelocity(-50, 50);
    else
      ghost.setVelocity(-50, -50);
  } else {
    if (ghostYDiff > 0)
      ghost.setVelocity(50, 50);
    else
      ghost.setVelocity(50, -50);
  }
}