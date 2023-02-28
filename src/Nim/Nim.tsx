import { FunctionComponent } from "react";
import useGameLogic from "../components/hooks/useGameLogic";
import Button from "./Button/Button";
import Controls from "./Controls/Controls";
import classes from "./Nim.module.css";
import PileForm from "./PileForm/PileForm";
import Sticks from "./Sticks/Sticks";

interface NimProps {}

const Nim: FunctionComponent<NimProps> = () => {
  const gameLogic = useGameLogic();
  return (
    <section className={classes.nim}>
      <div className={classes.info}>
        <div className={classes.general_info}>
          <h2>Nim Game</h2>
          <p>{`${gameLogic.sticksRemaining} sticks remaining!`}</p>
        </div>
        <p>{`It is ${gameLogic.currentPlayer}'s turn!`}</p>
        {gameLogic.gameWon && (
          <>
            <h2>{`${gameLogic.currentPlayer} has won the game!`}</h2>
            <Button onClick={gameLogic.resetGame}>Reset Game</Button>
          </>
        )}
      </div>
      <Sticks
        piles={gameLogic.piles}
        selectedIndex={gameLogic.selectedPileIndex}
        stickClicked={gameLogic.stickClicked}
        selectedSticks={gameLogic.selectedSticks}
        removePile={gameLogic.removePile}
      />
      <Controls
        toggleAI={gameLogic.toggleAI}
        removeSticks={gameLogic.removeSticks.bind(null, false)}
      />
      <PileForm pileAddHandler={gameLogic.addNewPile} />
    </section>
  );
};

//Score board
//Player Turn
//Sticks

export default Nim;
