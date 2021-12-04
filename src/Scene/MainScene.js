import Phaser from "phaser"
import Player from "./Player"
import Map01 from "./Map01"

import Platformer2D from "./Behaviors/Plarformer2D"

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
    this.load.image("tile", sprite.tile)
    this.load.image("tileset", sprite.tileset)
  }

  // create method
  create = () => {
    const level = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 4, 5, 4, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [5, 4, 4, 4, 5, 1, 5, 4, 4, 4, 5],
    ]

    const map = this.make.tilemap({
      data: level,
      tileWidth: 16,
      tileHeight: 16,
    })

    const tile = map.addTilesetImage("tileset")

    const layer = map.createLayer(0, tile, 0, 0)
    layer.setSkipCull(true).setCollisionBetween(1, 48)

    this.player = new Player(this, 32, 200)
    this.physics.add.collider(this.player, layer)

    this.cameras.main.setOrigin(0, 0)
    this.cameras.main.setZoom(2)

    const Keycode = Phaser.Input.Keyboard.KeyCodes

    this.input = {
      left: this.input.keyboard.addKey(Keycode.LEFT),
      right: this.input.keyboard.addKey(Keycode.RIGHT),
      jump: this.input.keyboard.addKey(Keycode.UP),
    }

    console.log(this.physics)
  }
  // update method
  update = (time, delta) => {
    const input = this.input
    const player = this.player
    // bahavior controller
    Platformer2D(player, input, delta / 15)
  }
}

export default MainScene
