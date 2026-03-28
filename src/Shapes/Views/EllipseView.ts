import { BaseShapeView } from "./BaseShapeView.ts";

export class EllipseView extends BaseShapeView {
  constructor(x: number, y: number, width: number, height: number, poolKey: string) {
    super(poolKey);
    const rx = width / 2;
    const ry = height / 2;
    this.ellipse(x, y, rx, ry);
    this.area = Math.PI * rx * ry;
  }
}
