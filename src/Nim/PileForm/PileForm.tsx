import { FunctionComponent, useRef } from "react";
import classes from "./PileForm.module.css";

interface PileFormProps {
  pileAddHandler: (stickAmount: number) => void;
}

const PileForm: FunctionComponent<PileFormProps> = ({ pileAddHandler }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handlePileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current && +inputRef.current.value > 0) {
      pileAddHandler(Math.min(+inputRef.current.value, 50));
    }
  };
  return (
    <form onSubmit={handlePileSubmit} className={classes.pile_form}>
      <div className={classes.info}>
        <label>Sticks in pile</label>
        <input type="number" ref={inputRef} />
      </div>
      <button>Add Pile</button>
    </form>
  );
};

export default PileForm;
