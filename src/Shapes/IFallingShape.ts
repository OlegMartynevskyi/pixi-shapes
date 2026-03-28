export interface IFallingShape {
  positionY: number;
  IsDestroyed: boolean;
  update(deltaTime: number, gravity: number): void;
  destroy(): void;
  getArea(scale: number): number;
}
