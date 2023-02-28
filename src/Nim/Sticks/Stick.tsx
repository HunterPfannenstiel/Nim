import { FunctionComponent, HTMLAttributes } from "react";
import classes from "./Stick.module.css";

interface StickProps extends HTMLAttributes<HTMLDivElement> {
  selected: boolean;
}

const Stick: FunctionComponent<StickProps> = ({ selected, ...props }) => {
  const selectedClass = selected ? classes.selected : "";
  return (
    <div className={classes.stick + " " + selectedClass} {...props}>
      <div className={classes.upper_stick} />
      <div className={classes.lower_stick} />
    </div>
  );
};

export default Stick;
