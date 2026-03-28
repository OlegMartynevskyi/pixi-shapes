import { IFallingShape } from "./Shapes/IFallingShape";
import { GameConfig } from "./GameConfig";
import { EventEmitter } from "pixi.js";

export class GameModel extends EventEmitter {
  public static readonly SHAPES_COUNT_CHANGED = "shapesCountChanged";
  public static readonly OCCUPIED_AREA_CHANGED = "occupiedAreaChanged";
  public static readonly SHAPES_PER_SECOND_CHANGED = "shapesPerSecondChanged";
  public static readonly GRAVITY_CHANGED = "gravityChanged";

  private scale: number = 1;
  private shapesPerSecond: number = 1;
  private spawnTimer: number = 0;
  private gravity: number;
  private shapes: IFallingShape[] = [];

  public get Scale(): number {
    return this.scale;
  }

  public get ShapesPerSecond(): number {
    return this.shapesPerSecond;
  }

  public get Gravity(): number {
    return this.gravity;
  }

  constructor(gravity: number, shapesPerSecond: number) {
    super();
    this.gravity = gravity;
    this.shapesPerSecond = shapesPerSecond;
  }

  public updateScale(screenWidth: number, screenHeight: number): void {
    this.scale = Math.min(screenWidth / GameConfig.GAME_WIDTH, screenHeight / GameConfig.GAME_HEIGHT);
    this.emitOccupiedAreaChanged();
  }

  public increaseShapeSpeed(): void {
    this.shapesPerSecond += GameConfig.SHAPE_SPEED_STEP;
    this.emitShapesPerSecondChanged();
  }

  public decreaseShapeSpeed(): void {
    this.shapesPerSecond = Math.max(
      this.shapesPerSecond - GameConfig.SHAPE_SPEED_STEP,
      GameConfig.SPAWN_INTERVAL_SECONDS,
    );
    this.emitShapesPerSecondChanged();
  }

  public increaseGravity(): void {
    this.gravity += GameConfig.GRAVITY_STEP;
    this.emitGravityChanged();
  }

  public decreaseGravity(): void {
    this.gravity = Math.max(this.gravity - GameConfig.GRAVITY_STEP, GameConfig.INITIAL_GRAVITY);
    this.emitGravityChanged();
  }

  public update(deltaTime: number): void {
    this.spawnTimer += deltaTime;

    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];
      if (shape.IsDestroyed) {
        this.removeShape(shape);
      } else {
        shape.update(deltaTime, this.gravity);
        if (shape.positionY > GameConfig.GAME_HEIGHT + GameConfig.SHAPE_SIZE) {
          this.removeShape(shape);
          shape.destroy();
        }
      }
    }
  }

  public addShape(shape: IFallingShape): void {
    if (this.shapes.includes(shape)) {
      return;
    }
    this.shapes.push(shape);
    this.emitCountChanged();
  }

  public removeShape(shape: IFallingShape): void {
    const index = this.shapes.indexOf(shape);
    if (index !== -1) {
      this.shapes.splice(index, 1);
      this.emitCountChanged();
    }
  }

  public needNewShape(): boolean {
    const interval = 60 / this.shapesPerSecond;

    if (this.spawnTimer >= interval) {
      this.spawnTimer -= interval;
      return true;
    }
    return false;
  }

  private emitCountChanged(): void {
    this.emit(GameModel.SHAPES_COUNT_CHANGED, this.shapes.length);
    this.emitOccupiedAreaChanged();
  }

  private emitOccupiedAreaChanged(): void {
    const occupiedArea = this.calculateOccupiedArea();
    this.emit(GameModel.OCCUPIED_AREA_CHANGED, occupiedArea);
  }

  private emitShapesPerSecondChanged(): void {
    this.emit(GameModel.SHAPES_PER_SECOND_CHANGED, this.shapesPerSecond);
  }

  private emitGravityChanged(): void {
    this.emit(GameModel.GRAVITY_CHANGED, this.gravity);
  }

  private calculateOccupiedArea(): number {
    let area = 0;
    for (const shape of this.shapes) {
      area += shape.getArea(this.scale);
    }
    return area;
  }
}
