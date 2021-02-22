import { useState } from "react";
import styles from "./stages.module.scss";

interface Stage {
  name: string;
  time: number;
}

interface StagesProps {
  currentSecond: number;
}

const Stages = ({ currentSecond }: StagesProps): JSX.Element => {
  const [stages, setStages] = useState<Stage[]>([{ name: "default", time: 0 }]);
  const [stageName, setStageName] = useState<string>("");
  const [stageStart, setStageStart] = useState<number>(0);

  const resetInputs = () => {
    setStageName("");
    setStageStart(0);
  };

  const handleAddStage = () => {
    if (stageName) {
      setStages((prev) =>
        prev
          .concat({ name: stageName, time: stageStart || 0 })
          .sort((a, b) => a.time - b.time)
      );
      resetInputs();
    }
  };

  const isStageActive = (stage: Stage) => stage.time <= currentSecond;

  return (
    <div className={styles.wrapper}>
      {stages.map((stage) => (
        <div
          className={`${styles.stage} ${
            isStageActive(stage) ? styles.stageActive : ""
          }`}
        >
          {isStageActive(stage) && (
            <div className={styles.activeStageBullet}>•</div>
          )}{" "}
          {stage.name} {stage.time ? `@ ${stage.time}s` : ""}
        </div>
      ))}
      <div className={styles.addStageWrapper}>
        <div>
          <input
            className={styles.stageName}
            type="text"
            placeholder="stage"
            value={stageName}
            onChange={(event) => setStageName(event.target.value)}
          />
          <input
            className={styles.stageTime}
            type="text"
            pattern="[0-9]"
            value={stageStart || 0}
            onChange={(event) =>
              setStageStart(Number.parseInt(event.target.value))
            }
          />
        </div>
        <button className={styles.addStageButton} onClick={handleAddStage} />
      </div>
    </div>
  );
};

export default Stages;
