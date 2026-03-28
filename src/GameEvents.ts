import { EventEmitter } from "pixi.js";

export const gameEvents = new EventEmitter();

export const SHAPE_REMOVAL_REQUESTED = "removeShape";
export const SHAPE_ADDITION_REQESTED = "addShape";
