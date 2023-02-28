import { createContext, FunctionComponent, useContext, useState } from "react";
import useUserTurn from "../hooks/useUserTurn";

const NimGame = createContext({
  piles: new Array(),
  sticksRemaining: 0,
  selectedSticks: {},
  selectedPileIndex: 0,
  isGameWon: false,
  currentPlayer: "Player 1",
  setAIIsPlaying: (isPlaying: boolean) => {},
  resetGame: () => {},
  stickClicked: (pileIndex: number, stickIndex: number) => {},
  removeSticks: () => {},
  // updatePiles: (pileToUpdate: number, sticksToRemove: number) => {},
});

export const NimGameProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const userTurn = useUserTurn();
  const [piles, setPiles] = useState([5, 13, 12]);
  const [selectedPileIndex, setSelectedPileIndex] = useState(-1);
  const [selectedSticks, setSelectedSticks] = useState<{
    [p: number]: boolean;
  }>({});
  const getSumOfSticks = (piles: number[]) => {
    let count = 0;
    piles.forEach((amount) => {
      count += amount;
    });
    return count;
  };
  const [sticksRemaining, setSticksRemaining] = useState(getSumOfSticks(piles));

  const stickClicked = (pileIndex: number, stickIndex: number) => {
    if (!userTurn.aiTurn) {
      if (selectedPileIndex === -1) {
        setSelectedPileIndex(pileIndex);
      } else if (pileIndex !== selectedPileIndex) return;

      setSelectedSticks((prevState) => {
        if (!selectedSticks[stickIndex]) {
          return { ...prevState, [stickIndex]: true };
        } else {
          const copyState = { ...prevState };
          delete copyState[stickIndex];
          if (Object.keys(copyState).length === 0) setSelectedPileIndex(-1);
          return copyState;
        }
      });
    }
  };

  const removeSticks = () => {
    if (selectedPileIndex !== -1 && !userTurn.aiTurn) {
      const stickAmount = Object.keys(selectedSticks).length;
      updatePiles(selectedPileIndex, stickAmount);
    }
  };

  const updatePiles = (pileToUpdate: number, sticksToRemove: number) => {
    setPiles((prevState) => {
      const copyState = [...prevState];
      copyState[pileToUpdate] -= sticksToRemove;
      setSelectedPileIndex(-1);
      setSelectedSticks({});
      return copyState;
    });
    setSticksRemaining((prevState) => prevState - sticksToRemove);
    if (userTurn.currentPlayerName === "Player 1" && userTurn.isAI) {
      // aiLogic.updateUserSticksRemoved(pileToUpdate, sticksToRemove);
    }
    userTurn.changeCurrentPlayer();
  };

  const isGameWon = () => {
    for (let i = 0; i < piles.length; i++) {
      if (piles[i] > 0) return false;
    }
    return true;
  };

  const resetGame = () => {
    setPiles([5, 13, 12]);
    setSelectedSticks({});
    setSticksRemaining(getSumOfSticks([5, 13, 12]));
    // setMaxSelectedSticks(0);
  };

  const value = {
    piles,
    sticksRemaining,
    selectedSticks,
    selectedPileIndex,
    isGameWon: isGameWon(),
    currentPlayer: userTurn.currentPlayerName,
    setAIIsPlaying: userTurn.setIsAI,
    resetGame,
    stickClicked,
    removeSticks,
  };
  return <NimGame.Provider value={value}>{children}</NimGame.Provider>;
};

const useNimGame = () => {
  return useContext(NimGame);
};

export default useNimGame;
