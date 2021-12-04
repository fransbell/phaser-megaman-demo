import Phaser from "phaser"
import Player from "./Player"

import Platformer2D from "./Behaviors/Plarformer2D"

import { lerp, clamp } from "../Utils/utils"

const sprite = {
  player: require("../img/sheet.png"),
  tile: require("../img/ground.png"),
  tileset: require("../img/tileset.png"),
}

class MainScene extends Phaser.Scene {
  constructor() {
    super()
  }
  //init method
  init = () => {}

  // preload method
  preload = () => {
    this.load.spritesheet("player", sprite.player, {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.image("tileset", sprite.tileset)
    this.load.tilemapTiledJSON("level01", require("../Map/map_01.json"))
  }

  // create method
  create = () => {
    const map = this.make.tilemap({ key: "level01" })

    const tileset = map.addTilesetImage("tileset")
    map.createLayer("back", tileset, 0, 0).setCullPadding(16, 16)
    const layer = map
      .createLayer("tile", tileset, 0, 0)
      .setCollisionBetween(1, 39)
      .setCullPadding(16, 16)

    this.player = new Player(this, 32, 0)
    this.player.setCollideWorldBounds(true)
    this.physics.world.setBounds(0, 0, 1024, 480)

    this.physics.add.collider(this.player, layer)

    this.cameras.main.setOrigin(0, 0)
    this.cameras.main.setZoom(2)

    const Keycode = Phaser.Input.Keyboard.KeyCodes

    this.input = {
      left: this.input.keyboard.addKey(Keycode.LEFT),
      right: this.input.keyboard.addKey(Keycode.RIGHT),
      jump: this.input.keyboard.addKey(Keycode.SPACE),
      shoot: this.input.keyboard.addKey(Keycode.Z),
    }
    console.log(lerp(0, 360, 0.025))
  }
  // update method
  update = (time, delta) => {
    const input = this.input
    const player = this.player
    // bahavior controller
    Platformer2D(player, input, delta / 15, time)
    if (player.x > 720 / 4 && player.x < 480) {
      this.cameras.main.setScroll(player.x - 720 / 4, 0)
    } else if (player.x > 480) {
      this.cameras.main.setScroll(480, 0)
    } else {
      this.cameras.main.setScroll(0)
    }
  }
}

export default MainScene
