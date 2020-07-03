import { forwardRef, MutableRefObject, useContext, useEffect } from "react";

import {
  BASE_SPEED,
  PADDLE_WIDTH,
  SCREEN_PADDING,
  SCREEN_WIDHT,
} from "../const";
import { BallContext, UpdateQueue } from "../ctx";
import { usePaddle } from "../hooks";

interface Props {
  render(state: Moving<Rect>): JSX.Element;
}

export const Computer = forwardRef<Moving<Rect>, Props>(({ render }, ref) => {
  let que = useContext(UpdateQueue);
  let getBall = useContext(BallContext);

  let [paddle, move] = usePaddle(
    (SCREEN_WIDHT - PADDLE_WIDTH) / 2,
    SCREEN_PADDING
  );

  useEffect(() => {
    if (ref !== null && "current" in ref) ref.current = paddle;
  }, [paddle]);

  useEffect(() => {
    que.add(() => {
      let ball = getBall();
      let { current } = ref as MutableRefObject<Moving<Rect>>;
      let diff = -(current.x + current.w / 2 - ball.cx);
      if (diff > BASE_SPEED) diff = BASE_SPEED;
      else if (diff < -BASE_SPEED) diff = -BASE_SPEED;
      move(diff);
    });
  }, []);

  return render(paddle);
});
