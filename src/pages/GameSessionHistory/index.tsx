import { useEffect } from 'react';

import { LoadingState } from '@/components';
import { FlexColumn } from '@/layouts';
import { fetchGameSessionsHistory } from '@/store/game-sessions-history/actions';
import { useAppStore } from '@/store';
import './styles.css';

export function GameSessionHistory() {
  const { appState, appDispatch } = useAppStore();
  const { gameSessionsHistory, player } = appState;

  useEffect(() => {
    if (gameSessionsHistory.sessions == null) {
      fetchGameSessionsHistory({
        dispatch: appDispatch,
        playerID: player.playerID,
      });
    }
  }, [appDispatch, gameSessionsHistory.sessions, player.playerID]);

  return (
    <FlexColumn id="game-session-history">
      <h2>{`🗒️ Game Session History 🗒️`}</h2>

      {gameSessionsHistory.sessions == null ? (
        <LoadingState />
      ) : (
        gameSessionsHistory.sessions.map((gameSession, index) => {
          const { id, playerOneID, playerTwoID, status } = gameSession;
          return (
            <FlexColumn key={id} className="game-session-history-item">
              <h3>{`Game Session ID: ${id}`}</h3>
              <span>{`Player 1 -- '${playerOneID}'`}</span>
              <span>{`Player 2 -- '${playerTwoID}'`}</span>
              <span>{`Status: ${status}`}</span>
            </FlexColumn>
          );
        })
      )}
    </FlexColumn>
  );
}
