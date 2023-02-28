import { useRef, useState } from "react";

const useUserTurn = () => {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [currentPlayerName, setCurrentPlayerName] = useState("Player 1");
  const aiTurn = useRef(false);
  const [isAI, setIsAI] = useState(false);

  const changeCurrentPlayer = () => {
    if (currentPlayer === 1) {
      if (isAI) {
        aiTurn.current = true;
        setCurrentPlayerName("Bob Nim");
      } else {
        setCurrentPlayerName("Player 2");
      }
      setCurrentPlayer(2);
    } else {
      aiTurn.current = false;
      setCurrentPlayerName("Player 1");
      setCurrentPlayer(1);
    }
  };

  return {
    changeCurrentPlayer,
    currentPlayerName,
    setIsAI,
    aiTurn: aiTurn.current,
    isAI,
  };
};

export default useUserTurn;
