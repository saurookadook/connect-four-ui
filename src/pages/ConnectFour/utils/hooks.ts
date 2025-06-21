import { useEffect, type Dispatch, type SetStateAction } from 'react';

type SetStateFunction = Dispatch<SetStateAction<string | null>>;

export function useLoadGame({
  gameSessionID, // force formatting
  setGameSessionID,
  playerID,
  setPlayerID,
}: {
  gameSessionID: string | null;
  setGameSessionID: SetStateFunction;
  playerID: string | null;
  setPlayerID: SetStateFunction;
}) {
  useEffect(() => {
    if (playerID != null) {
      return;
    }

    const storedPlayerID = window.localStorage.getItem('cfPlayerID');

    if (storedPlayerID != null) {
      setPlayerID(storedPlayerID);
    } else {
      const newPlayerId = window.crypto.randomUUID();
      window.localStorage.setItem('cfPlayerID', newPlayerId);
      setPlayerID(newPlayerId);
    }
  }, [playerID, setPlayerID]);

  useEffect(() => {
    if (gameSessionID != null) {
      return;
    }

    const storedGameSessionID = window.localStorage.getItem('cfGameSessionID');

    if (storedGameSessionID != null) {
      setGameSessionID(storedGameSessionID);
    } else {
      const newGameSessionID = window.crypto.randomUUID();
      window.localStorage.setItem('cfGameSessionID', newGameSessionID);
      setGameSessionID(newGameSessionID);
    }
  }, [gameSessionID, setGameSessionID]);
}
