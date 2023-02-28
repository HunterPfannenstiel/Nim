import { useEffect, useRef } from "react";
import {
  getBinaryPiles,
  getNextAIPlay,
  updatePilesForUserMove,
} from "../../utils/AI/kernel";

const useAILogic = (initialPiles: number[]) => {
  const binaryPiles = useRef<number[][]>([[]]);

  const getAIPlay = () => {
    return getNextAIPlay(binaryPiles.current);
  };

  const updateUserSticksRemoved = (pileIndex: number, stickAmount: number) => {
    binaryPiles.current[pileIndex] = updatePilesForUserMove(
      binaryPiles.current[pileIndex],
      stickAmount
    );
  };

  const resetAI = (newPiles: number[]) => {
    binaryPiles.current = getBinaryPiles(newPiles);
  };

  useEffect(() => {
    binaryPiles.current = getBinaryPiles(initialPiles);
  }, []);

  return { getAIPlay, updateUserSticksRemoved, resetAI };
};

export default useAILogic;
