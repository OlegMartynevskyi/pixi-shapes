export const ShapeTypes = {
  CIRCLE: "circle",
  ELLIPSE: "ellipse",
  POLYGON: "polygon",
  RANDOM: "random",
} as const;

export type ShapeType = (typeof ShapeTypes)[keyof typeof ShapeTypes];

export interface ShapeParams {
  radius?: number;
  width?: number;
  height?: number;
  size?: number;
  sides?: number;
  [key: string]: number | undefined;
}
