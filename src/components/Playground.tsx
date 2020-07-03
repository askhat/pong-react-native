import React, { forwardRef, useContext, useEffect } from "react";

import { SCREEN_HEIGHT, SCREEN_WIDHT } from "../const";
import { PadsContext, UpdateQueue } from "../ctx";
import { Color } from "../enum";
import { useBall } from "../hooks";
import { Rect } from "./shapes";

type Props = {
  render(state: Moving<Circ>): JSX.Element;
};

export const Playground = forwardRef<Moving<Circ>, Props>((props, ref) => {
  let que = useContext(UpdateQueue);
  let getPads = useContext(PadsContext);

  let [ball, update] = useBall(SCREEN_WIDHT / 2, SCREEN_HEIGHT / 2);

  useEffect(() => {
    if (ref !== null && "current" in ref) ref.current = ball;
  }, [ball]);

  useEffect(() => {
    que.add(() => {
      update(...getPads());
    });
  }, []);

  return (
    <>
      <Rect
        x={0}
        y={0}
        w={SCREEN_WIDHT}
        h={SCREEN_HEIGHT}
        color={Color.BLACK}
      />
      {props.render(ball)}
    </>
  );
});
