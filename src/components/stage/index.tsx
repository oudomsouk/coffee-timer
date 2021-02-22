import { useState } from "react";
import { IStage } from "../../types/stage";
import styles from "./stage.module.scss";

interface IStageProps {
  stage: IStage;
  onDelete: () => void;
  isActive: boolean;
}

const Stage = ({ stage, onDelete, isActive }: IStageProps): JSX.Element => {
  return (
    <div className={`${styles.wrapper} ${isActive ? styles.stageActive : ""}`}>
      {isActive && <div className={styles.activeStageBullet}>{">"}</div>}{" "}
      {stage.name} {stage.time ? `@ ${stage.time}s` : ""}
      <button
        className={styles.deleteButton}
        onClick={onDelete}
        aria-label={`Delete stage: ${stage.name}`}
      >
        <span>+</span>
      </button>
    </div>
  );
};

export default Stage;
