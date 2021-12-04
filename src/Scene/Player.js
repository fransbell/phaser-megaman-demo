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
        frameRate: 6,
        repeat: -1,
      })
    }

    createanims(scene, "walk", 2, 5)
    createanims(scene, "idle", 0, 0)
    createanims(scene, "jump", 9, 9)

    this.setSize(18, 32)
    this.setGravityY(400)
    this.setFlip(true)
    this.debugShowBody = true
    this.debugBodyColor = 333
  }
}

export default Player
