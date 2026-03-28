import { Graphics } from "pixi.js";

export abstract class BaseShapeView extends Graphics {
  private readonly poolKey: string;
  protected area: number = 0;

  constructor(poolKey: string) {
    super();
    this.poolKey = poolKey;
  }

  public getArea(scale: number): number {
    const area = this.area * scale * scale;
    return area;
  }

  public getPoolKey(): string {
    return this.poolKey;
  }
}
