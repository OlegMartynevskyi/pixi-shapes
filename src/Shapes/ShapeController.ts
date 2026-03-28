import { IFallingShape } from "./IFallingShape";
import { Container, PoolItem, FederatedPointerEvent } from "pixi.js";
import { BaseShapeView } from "./Views/BaseShapeView";
import { gameEvents, SHAPE_REMOVAL_REQUESTED } from "../GameEvents";

export interface ShapeControllerData {
  velocity: number;
  view: BaseShapeView;
  onRemoved?: (shape: ShapeController) => void;
}

export class ShapeController implements IFallingShape, PoolItem {
  private view: BaseShapeView | null = null;
  private velocityY: number = 0;
  private isDestroyed: boolean = false;
  private onRemoved: ((shape: ShapeController) => void) | null = null;

  get positionY(): number {
    return this.view?.y ?? 0;
  }

  get IsDestroyed(): boolean {
    return this.isDestroyed;
  }

  get View(): BaseShapeView {
    if (!this.view) throw new Error("ShapeController not initialized");
    return this.view;
  }

  getArea(scale: number): number {
    return this.view?.getArea(scale) ?? 0;
  }

  constructor() {}

  init(data: ShapeControllerData) {
    this.velocityY = data.velocity;
    this.view = data.view;
    this.onRemoved = data.onRemoved ?? null;
    this.isDestroyed = false;

    this.view.eventMode = "static";
    this.view.cursor = "pointer";
    this.view.on("pointerdown", this.handlePointerDown);
  }

  private handlePointerDown = (event: FederatedPointerEvent) => {
    event.stopPropagation();
    gameEvents.emit(SHAPE_REMOVAL_REQUESTED, this);
  };

  reset() {
    if (this.view) {
      this.view.off("pointerdown", this.handlePointerDown);
      if (this.view.parent) {
        this.view.parent.removeChild(this.view);
      }
    }
    this.onRemoved = null;
    this.isDestroyed = true;
  }

  resetView() {
    this.view = null;
  }

  spawn(container: Container, x: number, y: number) {
    if (!this.view) return;
    this.view.x = x;
    this.view.y = y;
    container.addChild(this.view);
  }

  update(deltaTime: number, gravity: number) {
    if (!this.view || this.isDestroyed) return;
    this.velocityY += gravity * deltaTime;
    this.view.y += this.velocityY * deltaTime;
  }

  destroy() {
    if (this.isDestroyed) {
      return;
    }

    const callback = this.onRemoved;
    this.reset();

    if (callback) {
      callback(this);
    }
  }
}
