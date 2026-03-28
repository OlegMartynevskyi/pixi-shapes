import { GameModel } from "./GameModel";
import { GameView } from "./GameView";
import { GameConfig } from "./GameConfig";
import { GamePresenter } from "./GamePresenter";
import { ShapeGenerator } from "./Shapes/ShapeGenerator.ts";
import { Controls } from "./Controls.ts";

export class GameBuilder {
  public build(): GamePresenter {
    const controls = new Controls();
    const shapeGenerator = new ShapeGenerator(0, 0, GameConfig.GAME_WIDTH, GameConfig.GAME_HEIGHT);
    const gameModel = new GameModel(GameConfig.INITIAL_GRAVITY, GameConfig.SPAWN_INTERVAL_SECONDS);
    const gameView = new GameView(shapeGenerator);
    const game = new GamePresenter(gameView, gameModel, shapeGenerator, controls);
    return game;
  }
}
