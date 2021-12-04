import Phaser from "phaser"
import { clamp, floor } from "../../Utils/utils"

const Platformer2D = (player, input, delta) => {
  let accel = 0
  // megaman design to work with gamepad
  // idealy when no input and both input should result in idle
  const dir = input.right.isDown - input.left.isDown

  const durLeft = input.left.getDuration() / 100
  const durRight = input.right.getDuration() / 100
  const durJump = floor(input.jump.getDuration() / 100)

  switch (dir) {
    case -1:
      // acceleration result in range 0 - 1
      // for easy modifier maxSpeed * accel = velocity
      accel = floor((clamp(1, 2, durLeft) * 100) / 2) / 100
      player.play("walk", true)
      player.setFlip(false)
      break

    case 1:
      // acceleration result in range 0 - 1
      //for easy modifier maxSpeed * accel = velocity
      accel = floor((clamp(1, 2, durRight) * 100) / 2) / 100
      player.play("walk", true)
      player.setFlip(true)
      break

    default:
      player.play("idle", true)
      break
  }

  // jump input
  if (input.jump.isDown && player.body.onFloor() && durJump < 3) {
    player.setVelocityY(-240 * delta)
  }

  //initial maxSpeed
  let maxSpeed = 160

  //capped on air speed for smooth -> better air control
  if (!player.body.onFloor()) {
    player.play("jump", true)
    maxSpeed = 120
  }
  // maxSpeed => max target speed
  // accel => accelration in range 0 - 1 |( percentage / 100)
  const velocity = maxSpeed * accel * delta

  // set velocity if(dir = 0) => no velocity
  // megaman originaly does not have accel
  // for more precise controll ,no lerp/accel require when release input
  player.setVelocityX(dir * velocity)
}

export default Platformer2D
