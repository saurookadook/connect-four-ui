import { REQUEST_GAME_SESSION_HISTORY, SET_GAME_SESSION_HISTORY } from '@/store';
import type { BaseAction, GameSessionHistoryItem } from '@/types/main';

type GameSessionHistoryData = {
  sessions: GameSessionHistoryItem[];
};

export async function fetchGameSessionHistory({
  dispatch, // force formatting
  playerID,
}: BaseAction & { playerID: string }) {
  dispatch({ type: REQUEST_GAME_SESSION_HISTORY });

  let responseData = null;

  try {
    const response = await fetch(`/game-sessions/${playerID}`);

    if (!response.ok || response.status >= 400) {
      throw new Error(`[ERROR ${response.status}] Failed to fetch game session history`);
    }

    responseData = await response.json();
  } catch (error) {
    console.error(error);
  }

  return setGameSessionHistory({
    dispatch,
    gameSessionHistory: {
      sessions: responseData?.sessions || [],
    },
  });
}

export function setGameSessionHistory({
  dispatch, // force formatting
  gameSessionHistory,
}: BaseAction & { gameSessionHistory: GameSessionHistoryData }) {
  dispatch({
    type: SET_GAME_SESSION_HISTORY,
    payload: {
      gameSessionHistory,
    },
  });
}
