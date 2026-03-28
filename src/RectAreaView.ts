import { Graphics } from "pixi.js";

export class RectAreaView extends Graphics {
  constructor(x: number, y: number, width: number, height: number, usedAsMask: boolean = false) {
    super();
    this.x = x;
    this.y = y;

    const strokeWidth = 2;

    if (usedAsMask) {
      this.rect(strokeWidth, strokeWidth, width - strokeWidth * 2, height - strokeWidth * 2);
    } else {
      this.rect(0, 0, width, height);
    }

    this.fill({ color: 0x2c3e50 });
    this.stroke({ color: 0xffffff, width: strokeWidth, alignment: 1 });
  }
}
