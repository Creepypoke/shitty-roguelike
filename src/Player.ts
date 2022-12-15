export class Player {
  public static readonly SPRITE_FRAME_WIDTH = 52
  public static readonly SPRITE_FRAME_HEIGHT = 72
  public static readonly SCALE_FACTOR = 1.5

  constructor(
    private sprite: Phaser.GameObjects.Sprite,
    startTilePosX: number,
    startTilePosY: number
  ) {
    this.sprite.scale = Player.SCALE_FACTOR
    this.sprite.setFrame(55)
  }

  private playerOffsetX(): number {
    return 0
  }

  private playerOffsetY(): number {
    return 0
  }

  getPosition(): Phaser.Math.Vector2 {
    return this.sprite.getCenter()
  }

  setPosition(position: Phaser.Math.Vector2): void {
    this.sprite.setPosition(position.x, position.y)
  }
}
