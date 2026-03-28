import { BaseShapeView } from "./BaseShapeView.ts";

export class PolygonView extends BaseShapeView {
  constructor(x: number, y: number, size: number, sides: number, poolKey: string) {
    super(poolKey);
    this.x = x;
    this.y = y;
    this.regularPoly(0, 0, size, sides);
    this.area = (sides * Math.pow(size, 2) * Math.sin((2 * Math.PI) / sides)) / 2;
  }
}
