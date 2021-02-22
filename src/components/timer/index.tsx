import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./timer.module.scss";

interface TimerProps {
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
}

const Timer = ({ seconds, setSeconds }: TimerProps): JSX.Element => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timerId = setTimeout(() => setSeconds((prev) => prev + 1), 1000);

      return () => clearTimeout(timerId);
    }
  }, [isActive, seconds]);

  return (
    <div className={styles.wrapper}>
      <span className={styles.timerLine}>
        <div className={styles.count}>{seconds}</div>
        <div className={styles.seconds}>s</div>
      </span>
      <span>
        <button
          className={styles.button}
          onClick={() => setIsActive((prev) => !prev)}
        >
          {isActive ? "Stop" : "Start"}
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setIsActive(false);
            setSeconds(0);
          }}
        >
          Reset
        </button>
      </span>
    </div>
  );
};

export default Timer;
