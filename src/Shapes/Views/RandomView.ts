import { BaseShapeView } from "./BaseShapeView.ts";

export class RandomView extends BaseShapeView {
  constructor(x: number, y: number, radius: number, poolKey: string) {
    super(poolKey);
    this.x = x;
    this.y = y;
    this.setStrokeStyle({ width: 2, color: 0x333333, alignment: 1 });
    this.drawCloud(radius);
    this.area = Math.PI * radius * radius;
  }

  private drawCloud(r: number): void {
    this.moveTo(-0.4 * r, -0.3 * r);
    this.bezierCurveTo(-0.6 * r, -0.7 * r, -0.2 * r, -0.8 * r, -0.1 * r, -0.5 * r);
    this.bezierCurveTo(0.1 * r, -1.0 * r, 0.6 * r, -0.9 * r, 0.5 * r, -0.4 * r);
    this.bezierCurveTo(0.9 * r, -0.6 * r, 1.0 * r, -0.1 * r, 0.8 * r, 0.2 * r);
    this.bezierCurveTo(1.0 * r, 0.6 * r, 0.7 * r, 1.0 * r, 0.3 * r, 0.7 * r);
    this.bezierCurveTo(-0.1 * r, 1.0 * r, -0.8 * r, 0.9 * r, -0.7 * r, 0.3 * r);
    this.bezierCurveTo(-1.0 * r, 0.1 * r, -0.8 * r, -0.2 * r, -0.4 * r, -0.3 * r);
  }
}
