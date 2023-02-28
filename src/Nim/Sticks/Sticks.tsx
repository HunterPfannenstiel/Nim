import { FunctionComponent } from "react";
import Button from "../Button/Button";
import Stick from "./Stick";
import classes from "./Sticks.module.css";

interface SticksProps {
  piles: number[];
  selectedIndex: number;
  selectedSticks: { [p: number]: boolean };
  stickClicked: (pileIndex: number, stickIndex: number) => void;
  removePile: (pileIndex: number) => void;
}

const Sticks: FunctionComponent<SticksProps> = ({
  piles,
  selectedIndex,
  selectedSticks,
  stickClicked,
  removePile,
}) => {
  const sticks = [];
  for (let i = 0; i < piles.length; i++) {
    const pile = [];
    for (let j = 0; j < piles[i]; j++) {
      pile.push(
        <Stick
          key={i.toString() + j}
          selected={i === selectedIndex ? selectedSticks[j] : false}
          onClick={stickClicked.bind(null, i, j)}
        />
      );
    }
    sticks.push(pile);
  }
  return (
    <div className={classes.sticks}>
      {sticks.map((pile, i) => {
        if (pile.length > 0) {
          return (
            <div className={classes.pile_container}>
              <div className={classes.pile}>
                {pile.map((stick, j) => {
                  return stick;
                })}
              </div>
              <Button onClick={removePile.bind(null, i)}>Remove Pile</Button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Sticks;
