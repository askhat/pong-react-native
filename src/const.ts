import { Dimensions } from "react-native";

export const PADDLE_WIDTH = 100;
export const PADDLE_HEIGHT = 20;
export const BALL_RADIUS = 15;
export const BASE_SPEED = 10;
export const SCREEN_PADDING = 40;
export const { width: SCREEN_WIDHT, height: SCREEN_HEIGHT } = Dimensions.get("screen");
export const VIEWPORT = { x: 0, y: 0, w: SCREEN_WIDHT, h: SCREEN_HEIGHT };