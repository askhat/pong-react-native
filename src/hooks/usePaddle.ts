import { useEffect, useRef, useState } from "react";

import { PADDLE_HEIGHT, PADDLE_WIDTH, SCREEN_WIDHT } from "../const";
import { Point, Segment } from "../geometry";

export function usePaddle(
  x: number,
  y: number,
  w = PADDLE_WIDTH,
  h = PADDLE_HEIGHT,
  vx = 0,
  vy = 0
): [Moving<Rect>, (dx: number) => void] {
  let ref = useRef<Moving<Rect>>({ x, y, w, h, vx, vy });
  let [state, setState] = useState(ref.current);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  let move = (dx: number) => {
    let { x, w } = ref.current;
    let padHor = new Segment(x + dx, x + w + dx);
    let minX = new Point(0);
    let maxX = new Point(SCREEN_WIDHT);

    if (padHor.contain(minX)) {
      setState((state) => ({ ...state, x: 0, vx: 0 }));
    } else if (padHor.contain(maxX)) {
      setState((state) => ({ ...state, x: SCREEN_WIDHT - w, vx: 0 }));
    } else {
      setState((state) => ({ ...state, x: state.x + dx, vx: dx }));
    }
  };

  return [state, move];
}
