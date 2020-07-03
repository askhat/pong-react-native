import { forwardRef, useContext, useEffect } from "react";

import {
  BASE_SPEED,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_PADDING,
  SCREEN_WIDHT,
} from "../const";
import { Manipulator, UpdateQueue } from "../ctx";
import { Direction } from "../enum";
import { usePaddle } from "../hooks";

interface Props {
  render(state: Moving<Rect>): JSX.Element;
}

export const Human = forwardRef<Moving<Rect>, Props>(({ render }, ref) => {
  let que = useContext(UpdateQueue);
  let getDirection = useContext(Manipulator);

  let [paddle, move] = usePaddle(
    (SCREEN_WIDHT - PADDLE_WIDTH) / 2,
    SCREEN_HEIGHT - PADDLE_HEIGHT - SCREEN_PADDING * 0.75
  );

  useEffect(() => {
    if (ref !== null && "current" in ref) ref.current = paddle;
  }, [paddle]);

  useEffect(() => {
    que.add(() => {
      let direction = getDirection();
      switch (direction) {
        case Direction.RIGHT:
          move(BASE_SPEED * 2);
          break;
        case Direction.LEFT:
          move(-BASE_SPEED * 2);
          break;
        default:
          move(0);
      }
    });
  }, []);

  return render(paddle);
});
