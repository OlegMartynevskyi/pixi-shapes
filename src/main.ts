import { Application } from "pixi.js";
import { GameBuilder } from "./GameBuilder";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({
    background: "#1099bb",
    resizeTo: document.getElementById("pixi-container")!,
  });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const game = new GameBuilder().build();
  app.stage.addChild(game.View);

  window.addEventListener("resize", () => {
    app.resize();
    game.resize(app.screen.width, app.screen.height);
  });

  game.resize(app.screen.width, app.screen.height);

  app.ticker.add((time) => {
    game.update(time.deltaTime);
  });
})();
