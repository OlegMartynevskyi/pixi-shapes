import { BaseShapeView } from "./BaseShapeView.ts";

export class CircleView extends BaseShapeView {
  constructor(x: number, y: number, radius: number, poolKey: string) {
    super(poolKey);
    this.circle(x, y, radius);
    this.area = Math.PI * radius * radius;
  }
}
