import { createContext } from "react";
import { Direction } from "./enum";

export let Manipulator = createContext<() => Direction>(() => Direction.NONE);
export let UpdateQueue = createContext<Set<() => void>>(new Set());
export let PadsContext = createContext<() => [Moving<Rect>, Moving<Rect>]>(() => null!);
export let BallContext = createContext<() => Moving<Circ>>(() => null!);
