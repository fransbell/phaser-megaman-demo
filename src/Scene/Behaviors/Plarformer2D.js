import Phaser from "phaser"
import { clamp, floor } from "../../Utils/utils"

const Platformer2D = (player, input, delta, time) => {
  const SHOOT_DELAY = 200

  let accel = 0
  let delay = clamp(0, SHOOT_DELAY, floor(time - player.delay))

  // megaman design to work with gamepad
  // idealy when no input and both input should result in idle
  const dir = input.right.isDown - input.left.isDown

  const durLeft = input.left.getDuration() / 100
  const durRight = input.right.getDuration() / 100
  const durJump = floor(input.jump.getDuration() / 100)

  let frame = player.anims.currentFrame.index - 1

  switch (dir) {
    case -1:
      // acceleration result in range 0 - 1
      // for easy modifier maxSpeed * accel = velocity
      accel = floor((clamp(1, 2, durLeft) * 100) / 2) / 100
      frame = player.anims.currentFrame.index - 1

      if (input.shoot.isDown && delay == SHOOT_DELAY) {
        if (input.shoot._justDown) {
          player.delay = time
        }
        player.play(
          {
            key: "run_shoot",
            startFrame: frame,
          },
          true
        )
        if (player.body.onFloor()) {
          player.setDisplayOrigin(4, 0)
        }
      } else if (delay == SHOOT_DELAY) {
        player.play("walk", true)
        player.setDisplayOrigin(0)
      }
      player.setFlip(false)
      break

    case 1:
      // acceleration result in range 0 - 1
      //for easy modifier maxSpeed * accel = velocity
      accel = floor((clamp(1, 2, durRight) * 100) / 2) / 100
      if (input.shoot.isDown && delay == SHOOT_DELAY) {
        if (input.shoot._justDown) {
          player.delay = time
        }
        player.play(
          {
            key: "run_shoot",
            startFrame: frame,
          },
          true
        )
        if (player.body.onFloor()) {
          player.setDisplayOrigin(-4, 0)
        }
      } else if (delay == SHOOT_DELAY) {
        player.play("walk", true)
        player.setDisplayOrigin(0)
      }
      player.setFlip(true)
      break

    default:
      if (input.shoot.isDown && delay == SHOOT_DELAY) {
        if (input.shoot._justDown) {
          player.delay = time
        }
        player.play("idle_shoot", true)
        if (player.body.onFloor()) {
          if (!player.flipX) {
            player.setDisplayOrigin(4, 0)
          } else {
            player.setDisplayOrigin(-4, 0)
          }
        }
      } else if (delay == SHOOT_DELAY) {
        player.play("idle", true)
        player.setDisplayOrigin(0)
      }
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
    if (input.shoot.isDown) {
      player.play("jump_shoot", true)
    } else {
      player.play("jump", true)
    }
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
