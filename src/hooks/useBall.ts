import { useEffect, useReducer, useRef } from 'react';

import { BALL_RADIUS, BASE_SPEED, SCREEN_HEIGHT, SCREEN_WIDHT } from '../const';
import { Direction } from '../enum';
import { Point, Segment } from '../geometry';

type Action = { type: Direction; payload?: Partial<Moving<Circ>> };

function reducer(state: Moving<Circ>, { type, payload }: Action): Moving<Circ> {
  switch (type) {
    case Direction.UP:
      return {
        ...state,
        ...payload,
        vy: -state.vy,
      };
    case Direction.RIGHT:
      return {
        ...state,
        ...payload,
        vx: -state.vx,
      };
    case Direction.LEFT:
      return {
        ...state,
        ...payload,
        vx: -state.vx,
      };
    case Direction.DOWN:
      return {
        ...state,
        ...payload,
        vy: -state.vy,
      };
    case Direction.NONE:
      return {
        ...state,
        ...payload,
        cx: state.cx + state.vx,
        cy: state.cy + state.vy,
      };
    default:
      return {
        ...state,
        ...payload,
        cx: SCREEN_WIDHT / 2,
        cy: SCREEN_HEIGHT / 2,
        vx: 0,
        vy: BASE_SPEED,
      };
  }
}

function collision(type: Direction, payload?: Partial<Moving<Circ>>) {
  return { type, payload };
}

let offside = {} as Action;

export function useBall(
  cx: number,
  cy: number,
  r = BALL_RADIUS,
  vx = 0,
  vy = 5
): [Moving<Circ>, (padTop: Moving<Rect>, padBtm: Moving<Rect>) => void] {
  let ref = useRef<Moving<Circ>>({ cx, cy, r, vx, vy });
  let [state, dispatch] = useReducer(reducer, ref.current);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  let update = (padTop: Moving<Rect>, padBtm: Moving<Rect>) => {
    let { cx, cy, r, vx, vy } = ref.current;
    let x1 = cx - r;
    let x2 = cx + r;
    let y1 = cy - r;
    let y2 = cy + r;

    let ballVer = new Segment(y1 + vy, y2 + vy);
    let screenVer = new Segment(0, SCREEN_HEIGHT);

    if (!screenVer.contain(ballVer)) {
      dispatch(offside);
    }

    let minX = new Point(0);
    let maxX = new Point(SCREEN_WIDHT);
    let ballHor = new Segment(x1 + vx, x2 + vx);

    if (ballHor.contain(minX)) {
      dispatch(collision(Direction.LEFT));
    } else if (ballHor.contain(maxX)) {
      dispatch(collision(Direction.RIGHT));
    }

    let padTopVer = new Point(padTop.y + padTop.h);
    let padTopHor = new Segment(padTop.x, padTop.x + padTop.w);
    let padBtmVer = new Point(padBtm.y);
    let padBtmHor = new Segment(padBtm.x, padBtm.x + padBtm.w);

    if (ballVer.contain(padTopVer) && padTopHor.contain(ballHor)) {
      dispatch(collision(Direction.UP, { vx: padTop.vx / 2 }));
    } else if (ballVer.contain(padBtmVer) && padBtmHor.contain(ballHor)) {
      dispatch(collision(Direction.DOWN, { vx: padBtm.vx / 2 }));
    }

    dispatch(collision(Direction.NONE));
  };

  return [state, update];
}
