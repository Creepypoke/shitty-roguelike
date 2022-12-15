import * as Phaser from 'phaser'

import { MainScene } from './Scenes'
import { GAME_SETTINGS } from './constants'

const config: Phaser.Types.Core.GameConfig = {
  title: 'Sample',
  render: {
    antialias: false,
  },
  type: Phaser.AUTO,
  scene: MainScene,
  scale: {
    width: GAME_SETTINGS.CANVAS.WIDTH,
    height: GAME_SETTINGS.CANVAS.HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },

  parent: 'game',
  backgroundColor: '#5a5268',
}

export const Game = new Phaser.Game(config)
