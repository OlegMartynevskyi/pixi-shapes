import { Graphics, Container, FederatedPointerEvent } from "pixi.js";
import { ShapeController } from "./ShapeController";
import { GameConfig } from "../GameConfig";
import { ShapeParams, ShapeType } from "./ShapeType";
import { RectAreaView } from "../RectAreaView";
import { BaseShapeView } from "./Views/BaseShapeView";
import { gameEvents, SHAPE_ADDITION_REQESTED } from "../GameEvents";
import { ShapeFactory } from "./ShapeFactory";
import { ShapePoolManager } from "./ShapePoolManager";

export class ShapeGenerator extends Container {
  private shapeMask: Graphics;
  private poolManager: ShapePoolManager;

  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
    this.position.set(x, y);

    this.poolManager = new ShapePoolManager(GameConfig.INITIAL_POOL_SIZE);
    this.shapeMask = new RectAreaView(0, 0, width, height, true);
    this.addChild(this.shapeMask);

    const rectAreaView = new RectAreaView(0, 0, width, height, false);
    rectAreaView.eventMode = "static";
    rectAreaView.cursor = "default";
    rectAreaView.on("pointerdown", (event: FederatedPointerEvent) => {
      const localPos = rectAreaView.toLocal(event.global);
      gameEvents.emit(SHAPE_ADDITION_REQESTED, localPos.x, localPos.y);
    });
    this.addChild(rectAreaView);
  }

  public createRandomShape(x?: number, y?: number): ShapeController {
    const finalX = x ?? this.getRandomInt(GameConfig.SHAPE_SIZE, this.width - GameConfig.SHAPE_SIZE);
    const finalY = y ?? -GameConfig.SHAPE_SIZE;

    const registeredTypes = ShapeFactory.getAllRegisteredTypes();
    const type = registeredTypes[this.getRandomInt(0, registeredTypes.length)];
    const params = ShapeFactory.generateParams(type);

    const view = this.getView(type, params);
    const shape = this.poolManager.getShape({
      velocity: GameConfig.INITIAL_SHAPE_SPEED,
      view: view,
      onRemoved: (s) => this.poolManager.returnShape(s),
    });

    shape.spawn(this, finalX, finalY);
    shape.View.mask = this.shapeMask;
    return shape;
  }

  private getView(type: ShapeType, params: ShapeParams): BaseShapeView {
    const key = ShapePoolManager.getPoolKey(type, params);
    const pooledView = this.poolManager.getView(key);

    if (pooledView) {
      return pooledView;
    }

    return ShapeFactory.createView(type, key, params);
  }

  // Returns an integer from min (inclusive) to max (exclusive)
  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
