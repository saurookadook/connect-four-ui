import { useEffect } from 'react';

import { LoadingState } from '@/components';
import { FlexColumn } from '@/layouts';
import { fetchGameSessionsHistory } from '@/store/game-sessions/actions';
import { useAppStore } from '@/store';

export function PlayerGameSessions() {
  const { appState, appDispatch } = useAppStore();
  const { gameSessions, player } = appState;

  useEffect(() => {
    if (gameSessions.allPaginated == null) {
      fetchGameSessionsHistory({
        dispatch: appDispatch, // force formatting
        playerID: player.playerID,
      });
    }
  }, [appDispatch, gameSessions.allPaginated, player.playerID]);

  return (
    <FlexColumn id="game-sessions-history">
      {gameSessions.allPaginated == null ? (
        <LoadingState />
      ) : (
        gameSessions.allPaginated.map((gameSession, index) => {
          const { id, playerOneID, playerTwoID, status } = gameSession;
          return (
            <FlexColumn key={id} className="game-sessions-history-item">
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
