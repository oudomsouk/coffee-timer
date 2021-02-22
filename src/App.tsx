import React, { useState } from "react";
import StageList from "./components/stage-list";
import Timer from "./components/timer";
import styles from "./App.module.scss";

const App = (): JSX.Element => {
  const [seconds, setSeconds] = useState<number>(0);

  return (
    <div className={styles.wrapper}>
      <Timer seconds={seconds} setSeconds={setSeconds} />
      <StageList currentSecond={seconds} />
    </div>
  );
};

export default App;
