import * as Phaser from 'phaser'
import { MapGrid } from '../'

import { IMapGrid } from '../MapGrid'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Main',
}

const SCALE = 4

export class Tilemap extends Phaser.Scene {
  public tileSize?: number = undefined
  public Grid?: IMapGrid = undefined
  public Map?: Phaser.Tilemaps.Tilemap = undefined

  constructor(params: Phaser.Types.Scenes.SettingsConfig) {
    super(params)
  }

  public preload() {
    this.load.image('tiles', 'assets/simples_pimples_tileset.png')
    this.load.tilemapTiledJSON('cloud-city-map', 'assets/simple-map.json')

    console.log('preloaded')
  }

  private setupCameraHandler() {
    this.cameras.main.setZoom(0.8)
    this.cameras.main.setPosition(0, 0)
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (pointer.isDown && pointer.middleButtonDown()) {
        this.cameras.main.scrollX -= (pointer.position.x - pointer.prevPosition.x) * 1.5
        this.cameras.main.scrollY -= (pointer.position.y - pointer.prevPosition.y) * 1.5
      }
    })

    this.input.on('wheel', (e: Phaser.Input.Pointer) => {
      const delta = e.deltaY
      const { zoom } = this.cameras.main

      if (delta > 0 && zoom >= 0.2) {
        this.cameras.main.setZoom(zoom - 0.1)
      }

      if (delta < 0 && zoom <= 3) {
        this.cameras.main.setZoom(zoom + 0.1)
      }
    })
  }

  private setupTilemapLayers() {
    const tilemap = this.make.tilemap({ key: 'cloud-city-map' })
    const tileset = tilemap.addTilesetImage('tiles', 'tiles')

    tilemap.layers.forEach((data, index) => {
      const layer = tilemap.createLayer(index, tileset, data.x, data.y)
      layer.setDepth(index)
      layer.scale = SCALE
    })

    //collision on blockedLayer
    tilemap.setCollisionBetween(1, tilemap.width * tilemap.height, true, true, 'walls')

    return tilemap
  }

  private setupGridOnField() {
    return new MapGrid(
      this,
      this.Map.widthInPixels * 2,
      this.Map.heightInPixels * 2,
      this.Map.widthInPixels * SCALE,
      this.Map.heightInPixels * SCALE,
      this.tileSize * SCALE,
      this.tileSize * SCALE,
      0xff0000,
      1,
      1
    )
  }

  public create() {
    this.Map = this.setupTilemapLayers()
    this.tileSize = this.Map.tileWidth

    this.Grid = this.setupGridOnField()
    this.input.mouse.disableContextMenu()
    this.setupCameraHandler()

    this.Grid.on('cellClick', ([x, y]: [number, number]) => {
      // const dataIndex = y * this.GRID.gridWidth + x

      const walls = this.Map.getLayer(1)
      const object = this.Map.objects[0].objects.filter((o) => {
        return o.x === walls.data[y][x].pixelX && o.y === walls.data[y][x].pixelY
      })
      console.log(walls.data[y][x], object)
    })
  }

  public update(_time: number, delta: number) {
    // console.log(this.input.mousePointer.position)
    // console.log(this.GRID)
  }
}
