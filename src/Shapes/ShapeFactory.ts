import { ShapeType, ShapeParams, ShapeTypes } from "./ShapeType";
import { BaseShapeView } from "./Views/BaseShapeView";
import { CircleView } from "./Views/CircleView";
import { EllipseView } from "./Views/EllipseView";
import { PolygonView } from "./Views/PolygonView";
import { RandomView } from "./Views/RandomView";
import { GameConfig } from "../GameConfig";
import { Color } from "pixi.js";

type ShapeCreator = (key: string, params: ShapeParams) => BaseShapeView;
type ParamGenerator = () => ShapeParams;

export class ShapeFactory {
  private static creators: Map<ShapeType, ShapeCreator> = new Map();
  private static paramGenerators: Map<ShapeType, ParamGenerator> = new Map();

  static {
    // Register default shapes
    this.register(
      ShapeTypes.CIRCLE,
      (key, params) => new CircleView(0, 0, params.radius!, key),
      () => ({ radius: GameConfig.SHAPE_SIZE }),
    );
    this.register(
      ShapeTypes.ELLIPSE,
      (key, params) => new EllipseView(0, 0, params.width!, params.height!, key),
      () => ({
        height: GameConfig.SHAPE_SIZE / 2,
        width: GameConfig.SHAPE_SIZE,
      }),
    );
    this.register(
      ShapeTypes.POLYGON,
      (key, params) => new PolygonView(0, 0, params.size!, params.sides!, key),
      () => ({
        sides: Math.floor(Math.random() * 4) + 3, // 3 to 6 sides
        size: GameConfig.SHAPE_SIZE,
      }),
    );
    this.register(
      ShapeTypes.RANDOM,
      (key, params) => new RandomView(0, 0, params.radius!, key),
      () => ({ radius: GameConfig.SHAPE_SIZE }),
    );
  }

  public static register(type: ShapeType, creator: ShapeCreator, paramGenerator: ParamGenerator) {
    this.creators.set(type, creator);
    this.paramGenerators.set(type, paramGenerator);
  }

  public static createView(type: ShapeType, key: string, params: ShapeParams): BaseShapeView {
    const creator = this.creators.get(type);
    if (!creator) throw new Error(`Unknown shape type: ${type}`);

    const view = creator(key, params);
    view.fill({ color: this.getRandomColor() });
    return view;
  }

  public static generateParams(type: ShapeType): ShapeParams {
    const generator = this.paramGenerators.get(type);
    if (!generator) throw new Error(`Unknown shape type: ${type}`);
    return generator();
  }

  public static getAllRegisteredTypes(): ShapeType[] {
    return Array.from(this.creators.keys());
  }

  private static getRandomColor(): number {
    // Hue: 0-360, Saturation: 90%, Lightness: 60% (vibrant colors consistent with original)
    const h = Math.random() * 360;
    const s = 90;
    const l = 60;

    return new Color({ h, s, l }).toNumber();
  }
}
