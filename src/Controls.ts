export class Controls {
  public shapeSpeedAddBtn: HTMLButtonElement | null;
  public shapeSpeedSubtractBtn: HTMLButtonElement | null;
  public gravityAddBtn: HTMLButtonElement | null;
  public gravitySubtractBtn: HTMLButtonElement | null;

  constructor() {
    this.shapeSpeedAddBtn = document.getElementById("shapeSpeedAddBtn") as HTMLButtonElement;
    this.shapeSpeedSubtractBtn = document.getElementById("shapeSpeedSubtractBtn") as HTMLButtonElement;
    this.gravityAddBtn = document.getElementById("gravityAddBtn") as HTMLButtonElement;
    this.gravitySubtractBtn = document.getElementById("gravitySubtractBtn") as HTMLButtonElement;
  }
}
