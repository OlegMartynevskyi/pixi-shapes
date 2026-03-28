import { Pool } from "pixi.js";
import { ShapeController, ShapeControllerData } from "./ShapeController";
import { BaseShapeView } from "./Views/BaseShapeView";
import { ShapeType, ShapeParams } from "./ShapeType";
export class ShapePoolManager {
  private shapePool: Pool<ShapeController> = new Pool(ShapeController);
  private viewPool: Map<string, BaseShapeView[]> = new Map();

  constructor(initialPoolSize: number) {
    this.shapePool.prepopulate(initialPoolSize);
  }

  public static getPoolKey(type: ShapeType, params: ShapeParams): string {
    if (!params || Object.keys(params).length === 0) return type;
    // params are constructed in alphabetical order to ensure consistent key generation without sorting
    return `${type}:${JSON.stringify(params)}`;
  }

  /**
   * Obtains a ShapeController from the pool and initializes it.
   */
  public getShape(data: ShapeControllerData): ShapeController {
    return this.shapePool.get(data);
  }

  /**
   * Returns a ShapeController and its associated view to their respective pools.
   */
  public returnShape(shape: ShapeController) {
    this.returnView(shape.View);
    shape.resetView();
    this.shapePool.return(shape);
  }

  public getView(key: string): BaseShapeView | null {
    const viewList = this.viewPool.get(key);
    if (viewList && viewList.length > 0) {
      return viewList.pop()!;
    }
    return null;
  }

  private returnView(view: BaseShapeView) {
    const key = view.getPoolKey();
    let viewList = this.viewPool.get(key);
    if (!viewList) {
      viewList = [];
      this.viewPool.set(key, viewList);
    }
    viewList.push(view);
  }
}
