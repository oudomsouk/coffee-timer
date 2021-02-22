import React, { useEffect, useState } from "react";
import { IStage } from "../../types/stage";
import Stage from "../stage";
import styles from "./stage-list.module.scss";

interface IStageListProps {
  currentSecond: number;
}

const StageList = ({ currentSecond }: IStageListProps): JSX.Element => {
  const [stages, setStages] = useState<IStage[]>([]);
  const [stageName, setStageName] = useState<string>("");
  const [stageStart, setStageStart] = useState<number>(0);

  useEffect(() => {
    const savedStages = localStorage.getItem("stages");
    if (savedStages) {
      setStages(JSON.parse(savedStages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stages", JSON.stringify(stages));
  }, [stages]);

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

  const handleDelete = (toDelete: IStage) => {
    setStages((prev) => prev.filter((stage) => stage.name !== toDelete.name));
  };

  const isStageActive = (stage: IStage, nextIndex?: number): boolean =>
    stage.time <= currentSecond &&
    (nextIndex && stages[nextIndex] ? !isStageActive(stages[nextIndex]) : true);

  return (
    <div className={styles.wrapper}>
      {stages.map((stage, index) => (
        <Stage
          key={stage.name}
          stage={stage}
          isActive={isStageActive(stage, index + 1)}
          onDelete={() => handleDelete(stage)}
        />
      ))}
      <div className={styles.addStageWrapper}>
        <div>
          <input
            className={styles.stageName}
            type="text"
            placeholder="stage"
            value={stageName}
            onChange={(event) => setStageName(event.target.value)}
            aria-label="New stage name"
          />
          <input
            className={styles.stageTime}
            type="text"
            pattern="[0-9]"
            value={stageStart || 0}
            onChange={(event) =>
              setStageStart(Number.parseInt(event.target.value))
            }
            aria-label="New stage start time"
          />
        </div>
        <button
          className={styles.addStageButton}
          onClick={handleAddStage}
          aria-label="Add new stage"
        />
      </div>
    </div>
  );
};

export default StageList;
