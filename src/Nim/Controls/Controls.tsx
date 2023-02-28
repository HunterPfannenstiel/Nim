import { FunctionComponent } from "react";
import Button from "../Button/Button";
import classes from "./Controls.module.css";

interface ControlsProps {
  toggleAI: () => void;
  removeSticks: () => void;
}

const Controls: FunctionComponent<ControlsProps> = ({
  toggleAI,
  removeSticks,
}) => {
  return (
    <div className={classes.controls}>
      <Button onClick={removeSticks}>Confirm Selection</Button>
      <div>
        <input type="checkbox" name="ai" id="ai" onChange={toggleAI} />
        <label htmlFor="ai">Play against Bob Nim?</label>
      </div>
    </div>
  );
};

export default Controls;
