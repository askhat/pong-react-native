import React, { useEffect, useRef } from "react";
import { GestureResponderEvent, View } from "react-native";

import { BallContext, Manipulator, PadsContext, UpdateQueue } from "../ctx";
import { Color, Direction } from "../enum";
import { Circ, Rect } from "./shapes";
import { Computer } from "./Computer";
import { Human } from "./Human";
import { Playground } from "./Playground";

export function Game() {
  let req = useRef<number>(null!);
  let que = useRef<Set<() => void>>(new Set());

  let ball = useRef<Moving<Circ>>(null!);
  let padTop = useRef<Moving<Rect>>(null!);
  let padBtm = useRef<Moving<Rect>>(null!);
  let getPads = (): [Moving<Rect>, Moving<Rect>] => [
    padTop.current!,
    padBtm.current!,
  ];

  let touchStart = useRef<Nullable<{ x: number }>>(null);
  let direction = useRef(Direction.NONE);

  let handleTouchStart = ({
    nativeEvent: { locationX },
  }: GestureResponderEvent) => {
    touchStart.current = { x: locationX };
  };

  let handleTouchMove = ({
    nativeEvent: { locationX: newX },
  }: GestureResponderEvent) => {
    let oldX = touchStart.current!.x;

    if (newX - oldX > 10) {
      direction.current = Direction.RIGHT;
    } else if (oldX - newX > 10) {
      direction.current = Direction.LEFT;
    } else {
      direction.current = Direction.NONE;
    }

    touchStart.current = { x: newX };
  };

  let handleTouchEnd = () => {
    touchStart.current = null;
    direction.current = Direction.NONE;
  };

  let update = () => {
    for (let updateFn of que.current) updateFn();
    req.current = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(req.current);
    };
  };

  useEffect(update, []);

  return (
    <View
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <UpdateQueue.Provider value={que.current}>
        <PadsContext.Provider value={getPads}>
          <Playground
            ref={ball}
            render={(ball) => <Circ color={Color.GREEN} {...ball} />}
          />
        </PadsContext.Provider>
        <BallContext.Provider value={() => ball.current}>
          <Computer
            ref={padTop}
            render={(pad) => <Rect color={Color.BLUE} {...pad} />}
          />
        </BallContext.Provider>
        <Manipulator.Provider value={() => direction.current}>
          <Human
            ref={padBtm}
            render={(pad) => <Rect color={Color.BLUE} {...pad} />}
          />
        </Manipulator.Provider>
      </UpdateQueue.Provider>
    </View>
  );
}
