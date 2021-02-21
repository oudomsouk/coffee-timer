import React, { useEffect, useState } from "react";
import "./App.css";

const App = (): JSX.Element => {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timerId = setTimeout(() => setCount((prev) => prev + 1), 1000);

      return () => clearTimeout(timerId);
    }
  }, [isActive, count]);

  return (
    <div className="wrapper">
      <span className="timerLine">
        <div className="count">{count}</div>
        <div className="seconds">s</div>
      </span>
      <button
        className="timerButton"
        onClick={() => setIsActive((prev) => !prev)}
      >
        {isActive ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default App;
