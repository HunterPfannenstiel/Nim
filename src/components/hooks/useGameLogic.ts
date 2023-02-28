import { useState, useEffect } from "react";
import {
  createTimeoutPromise,
  getSumOfSticks,
  movePileToLastPile,
} from "../../utils/helper";
import useAILogic from "./useAILogic";
import useUserTurn from "./useUserTurn";

const useGameLogic = () => {
  const userTurn = useUserTurn();
  const [initialPiles, setInitialPiles] = useState([5, 13, 12]);
  const [piles, setPiles] = useState(initialPiles);
  const aiLogic = useAILogic(piles);
  const [selectedPileIndex, setSelectedPileIndex] = useState(-1);
  const [selectedSticks, setSelectedSticks] = useState<{
    [p: number]: boolean;
  }>({});
  const [sticksRemaining, setSticksRemaining] = useState(getSumOfSticks(piles));
  const [aiReadyToTake, setAIReadyToTake] = useState(false);
  const [moveWasMade, setMoveWasMade] = useState(false);
  const stickClicked = (
    pileIndex: number,
    stickIndex: number,
    aiSelectingSticks = false
  ) => {
    if (!userTurn.aiTurn || aiSelectingSticks) {
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

  const removeSticks = (aiSelectingSticks = false) => {
    if ((selectedPileIndex !== -1 && !userTurn.aiTurn) || aiSelectingSticks) {
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
      aiLogic.updateUserSticksRemoved(pileToUpdate, sticksToRemove);
    }
    setMoveWasMade(true);
  };

  const resetGame = () => {
    setPiles(initialPiles);
    setSelectedSticks({});
    setSticksRemaining(getSumOfSticks(initialPiles));
    aiLogic.resetAI(initialPiles);
    setMoveWasMade(false);
    if (userTurn.currentPlayerName === "Bob Nim") {
      userTurn.changeCurrentPlayer();
    }
  };

  const isGameWon = () => {
    for (let i = 0; i < piles.length; i++) {
      if (piles[i] > 0) return false;
    }
    return true;
  };

  const aiMove = async (pileIndex: number, stickAmount: number) => {
    await selectSticks(pileIndex, stickAmount);
    await createTimeoutPromise(setAIReadyToTake.bind(null, true), 500);
  };

  const selectSticks = async (pileIndex: number, stickAmount: number) => {
    stickClicked(pileIndex, 0, true);
    let i = 1;
    while (i < stickAmount) {
      await createTimeoutPromise(
        stickClicked.bind(null, pileIndex, i, true),
        500
      );
      i++;
    }
  };

  const addNewPile = (pile: number) => {
    setInitialPiles((prevState) => [...prevState, pile]);
    resetGame();
  };

  const removePile = (pileIndex: number) => {
    setInitialPiles((prevState) => {
      const copyState = [...prevState];
      movePileToLastPile(copyState, pileIndex);
      copyState.pop();
      return copyState;
    });
    resetGame();
  };

  const toggleAI = () => {
    userTurn.setIsAI((prevState) => !prevState);
    resetGame();
  };

  useEffect(() => {
    if (userTurn.currentPlayerName === "Bob Nim") {
      const play = aiLogic.getAIPlay();
      aiMove(play[0], play[1]);
    }
  }, [userTurn.currentPlayerName]);

  useEffect(() => {
    if (aiReadyToTake) {
      removeSticks(true);
      setAIReadyToTake(false);
    }
  }, [aiReadyToTake]);

  useEffect(() => {
    aiLogic.resetAI(initialPiles);
    setPiles(initialPiles);
    setSticksRemaining(getSumOfSticks(initialPiles));
  }, [initialPiles]);

  useEffect(() => {
    if (!isGameWon() && moveWasMade) {
      userTurn.changeCurrentPlayer();
      setMoveWasMade(false);
    }
  }, [moveWasMade]);

  return {
    stickClicked,
    removeSticks,
    sticksRemaining,
    piles,
    selectedSticks,
    selectedPileIndex,
    gameWon: isGameWon(),
    currentPlayer: userTurn.currentPlayerName,
    isAIPlaying: userTurn.isAI,
    toggleAI,
    resetGame,
    addNewPile,
    removePile,
  };
};

export default useGameLogic;
