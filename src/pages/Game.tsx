import { FunctionComponent } from "react";
import Nim from "../Nim/Nim";

interface GameProps {}

const Game: FunctionComponent<GameProps> = () => {
  return <Nim></Nim>;
};

export default Game;
