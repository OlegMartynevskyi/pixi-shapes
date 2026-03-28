import { Container } from "pixi.js";
import { GameConfig } from "./GameConfig";

export class GameView extends Container {
  private numberOfShapesText: HTMLElement | null;
  private occupiedAreaText: HTMLElement | null;
  private shapeGenerationSpeedText: HTMLElement | null;
  private gravityText: HTMLElement | null;

  constructor(shapeContainer: Container) {
    super();
    this.addChild(shapeContainer);
    this.numberOfShapesText = document.querySelector("#numberOfShapes");
    this.occupiedAreaText = document.querySelector("#occupiedArea");
    this.shapeGenerationSpeedText = document.querySelector("#shapeGenerationSpeedText");
    this.gravityText = document.querySelector("#gravityText");
  }

  updateNumberOfShapesDisplay(count: number): void {
    if (this.numberOfShapesText) {
      this.numberOfShapesText.textContent = `Number of shapes: ${count}`;
    }
  }

  updateOccupiedAreaDisplay(area: number): void {
    if (this.occupiedAreaText) {
      this.occupiedAreaText.textContent = `Occupied area: ${area.toFixed(2)}px^2`;
    }
  }

  updateShapesGenerationSpeedDisplay(shapesPerSecond: number): void {
    if (this.shapeGenerationSpeedText) {
      this.shapeGenerationSpeedText.textContent = `Generation speed: ${shapesPerSecond}`;
    }
  }

  updateGravityDisplay(gravity: number): void {
    if (this.gravityText) {
      this.gravityText.textContent = `Gravity: ${gravity.toFixed(2)}`;
    }
  }

  resize(screenWidth: number, screenHeight: number, scale: number): void {
    this.scale.set(scale);
    this.x = (screenWidth - GameConfig.GAME_WIDTH * scale) / 2;
    this.y = (screenHeight - GameConfig.GAME_HEIGHT * scale) / 2;
  }
}
