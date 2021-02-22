import React, { useState } from "react";
import Stages from "./components/stages";
import Timer from "./components/timer";
import styles from "./App.module.scss";

const App = (): JSX.Element => {
  const [seconds, setSeconds] = useState<number>(0);

  return (
    <div className={styles.wrapper}>
      <Timer seconds={seconds} setSeconds={setSeconds} />
      <Stages currentSecond={seconds} />
    </div>
  );
};

export default App;
