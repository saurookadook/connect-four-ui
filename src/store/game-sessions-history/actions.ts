import { BASE_API_SERVER_URL } from '@/constants';
import { REQUEST_GAME_SESSIONS_HISTORY, SET_GAME_SESSIONS_HISTORY } from '@/store';
import type { BaseAction, GameSessionsHistoryItem } from '@/types/main';

type GameSessionsHistoryData = {
  sessions: GameSessionsHistoryItem[];
};

export async function fetchGameSessionsHistory({
  dispatch, // force formatting
  playerID,
}: BaseAction & { playerID: string | null }) {
  dispatch({ type: REQUEST_GAME_SESSIONS_HISTORY });

  let responseData = null;

  try {
    // TODO: break `all` and `history` calls into separate actions
    const requestPath =
      playerID != null ? `/api/game-sessions/history/${playerID}` : '/api/game-sessions/all';
    const requestURL = new URL(requestPath, BASE_API_SERVER_URL);
    const response = await fetch(requestURL);

    if (!response.ok || response.status >= 400) {
      throw new Error(`[ERROR ${response.status}] Failed to fetch game session history`);
    }

    responseData = await response.json();
  } catch (error) {
    console.error(error);
  }

  return setGameSessionsHistory({
    dispatch,
    gameSessionsHistory: {
      sessions: responseData?.sessions || [],
    },
  });
}

export function setGameSessionsHistory({
  dispatch, // force formatting
  gameSessionsHistory,
}: BaseAction & { gameSessionsHistory: GameSessionsHistoryData }) {
  dispatch({
    type: SET_GAME_SESSIONS_HISTORY,
    payload: {
      gameSessionsHistory,
    },
  });
}
