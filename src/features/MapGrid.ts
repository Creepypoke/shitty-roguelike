import * as Phaser from 'phaser'

export interface IMapGrid extends Phaser.GameObjects.Grid {
  gridWidth: number
  gridHeight: number
}

type ConstructorGrid = ConstructorParameters<typeof Phaser.GameObjects.Grid>

export class MapGrid<IMapGrid> extends Phaser.GameObjects.Grid {
  public gridWidth = -1
  public gridHeight = -1
  private isShow = false

  constructor(...args: ConstructorGrid) {
    super(...args)

    this.showCells = false
    this.setDepth(100)
    this.setInteractive()
    this.setupInputHandlers()
    this.setOutlineStyle(0xffffff, 0)
    this.setCellsCount()

    this.scene.add.existing(this)
  }

  private setCellsCount() {
    this.gridWidth = this.width / this.cellWidth
    this.gridHeight = this.height / this.cellHeight
  }

  private calculateCellPosition(localCoordinate: number): number {
    const cellSize = this.scale * this.cellWidth
    return Math.floor(localCoordinate / cellSize)
  }

  private setupInputHandlers() {
    this.scene.input.on('gameobjectup', (pointer, gameObject) => {
      const isLeftMouseClick = pointer.event.which === 1
      if (isLeftMouseClick) {
        const cellX = this.calculateCellPosition(gameObject.input.localX)
        const cellY = this.calculateCellPosition(gameObject.input.localY)

        this.emit('cellClick', [cellX, cellY])
      }
    })

    this.scene.input.keyboard.on('keydown-SPACE', () => {
      const gridOpacity = this.isShow ? 0 : 0.6
      this.isShow = !this.isShow
      this.setOutlineStyle(0xffffff, gridOpacity)
    })
  }
}
