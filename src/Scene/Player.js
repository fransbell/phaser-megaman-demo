import Phaser from "phaser"

const sprite = {
  player: require("../img/sheet.png"),
}

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player")

    scene.add.existing(this)
    scene.physics.add.existing(this)

    const createanims = (scene, key, start, end) => {
      scene.anims.create({
        key: key,
        frames: this.anims.generateFrameNumbers("player", {
          start: start,
          end: end,
        }),
        frameRate: 8,
        repeat: -1,
      })
    }

    createanims(scene, "walk", 2, 5)
    createanims(scene, "idle", 0, 0)
    createanims(scene, "jump", 11, 11)
    createanims(scene, "idle_shoot", 1, 1)
    createanims(scene, "jump_shoot", 10, 10)
    createanims(scene, "run_shoot", 6, 9)

    this.setSize(18, 32)
    this.setGravityY(400)
    this.setFlip(true)
    this.debugShowBody = true
    this.debugBodyColor = 333
    this.setDisplayOrigin(0, 0)

    this.delay = 0

    this.play({ key: "idle", startFrame: 0 })
  }
}

export default Player
