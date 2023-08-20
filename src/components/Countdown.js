import React, { useEffect, useState } from "react";
// Chakra-UI
import { Button } from "@chakra-ui/react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { decreaseTime } from "../redux/typingSpeedSlice";

const Countdown = () => {
  const start = useSelector((state) => state.typingSpeed.start);
  const timer = useSelector((state) => state.typingSpeed.time);
  const dispatch = useDispatch();

  const timerToString = () => {
    let minutes = Math.floor(timer / 60);
    let seconds = ("0" + (timer % 60)).slice(-2);
    return minutes + ":" + seconds;
  };

  useEffect(() => {
    if (start) {
      if (timer > 0) {
        setTimeout(() => {
          dispatch(decreaseTime());
        }, 1000);
      }
    }
  }, [timer, start]);

  return (
    <Button ml={2} _hover={{ bgColor: "none" }} _active={{ bgColor: "none" }}>
      {timerToString()}
    </Button>
  );
};

export default Countdown;
