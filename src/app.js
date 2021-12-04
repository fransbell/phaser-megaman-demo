import Phaser from "phaser"
import MainScene from "./Scene/MainScene"

const config = {
  type: Phaser.Auto,
  width: 720,
  height: 480,
  backgroundColor: "#111",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  canvas: document.getElementById("content"),
  parent: "phaser",
  scene: [MainScene],
}

const game = new Phaser.Game(config)
