import * as Phaser from 'phaser'
import { Tilemap } from '../features'


const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Main',
}

export const MainScene = new Tilemap(sceneConfig)
