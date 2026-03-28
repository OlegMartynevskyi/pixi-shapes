import { GameModel } from "./GameModel";
import { GameView } from "./GameView";
import { ShapeGenerator } from "./Shapes/ShapeGenerator.ts";
import { ShapeController } from "./Shapes/ShapeController.ts";
import { Controls } from "./Controls.ts";
import { gameEvents, SHAPE_REMOVAL_REQUESTED, SHAPE_ADDITION_REQESTED } from "./GameEvents";

export class GamePresenter {
  private model: GameModel;
  private view: GameView;
  private shapeGenerator: ShapeGenerator;
  private controls: Controls;

  get View(): GameView {
    return this.view;
  }

  constructor(gameView: GameView, gameModel: GameModel, shapeGenerator: ShapeGenerator, controls: Controls) {
    this.model = gameModel;
    this.view = gameView;
    this.shapeGenerator = shapeGenerator;
    this.controls = controls;

    this.model.on(GameModel.SHAPES_COUNT_CHANGED, (count: number) => {
      this.view.updateNumberOfShapesDisplay(count);
    });
    this.model.on(GameModel.OCCUPIED_AREA_CHANGED, (area: number) => {
      this.view.updateOccupiedAreaDisplay(area);
    });
    this.controls.shapeSpeedAddBtn?.addEventListener("click", () => {
      this.model.increaseShapeSpeed();
    });
    this.controls.shapeSpeedSubtractBtn?.addEventListener("click", () => {
      this.model.decreaseShapeSpeed();
    });
    this.controls.gravityAddBtn?.addEventListener("click", () => {
      this.model.increaseGravity();
    });
    this.controls.gravitySubtractBtn?.addEventListener("click", () => {
      this.model.decreaseGravity();
    });
    this.model.on(GameModel.SHAPES_PER_SECOND_CHANGED, (shapesPerSecond: number) => {
      this.view.updateShapesGenerationSpeedDisplay(shapesPerSecond);
    });
    this.model.on(GameModel.GRAVITY_CHANGED, (gravity: number) => {
      this.view.updateGravityDisplay(gravity);
    });
    this.view.updateShapesGenerationSpeedDisplay(this.model.ShapesPerSecond);
    this.view.updateGravityDisplay(this.model.Gravity);

    gameEvents.on(SHAPE_ADDITION_REQESTED, (x: number, y: number) => {
      this.createNewShape(x, y);
    });

    gameEvents.on(SHAPE_REMOVAL_REQUESTED, (shape: ShapeController) => {
      this.model.removeShape(shape);
      shape.destroy();
    });
  }

  public update(deltaTime: number): void {
    if (this.model.needNewShape()) {
      this.createNewShape();
    }
    this.model.update(deltaTime);
  }

  public resize(screenWidth: number, screenHeight: number): void {
    this.model.updateScale(screenWidth, screenHeight);
    this.view.resize(screenWidth, screenHeight, this.model.Scale);
  }

  private createNewShape(x?: number, y?: number): void {
    const shape = this.shapeGenerator.createRandomShape(x, y);
    this.model.addShape(shape);
  }
}
