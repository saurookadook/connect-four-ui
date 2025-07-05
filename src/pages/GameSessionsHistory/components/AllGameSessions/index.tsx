import { useEffect } from 'react';

import { LoadingState } from '@/components';
import { FlexColumn } from '@/layouts';
import { fetchAllGameSessions } from '@/store/game-sessions/actions';
import { useAppStore } from '@/store';
import './styles.css';

export function AllGameSessions() {
  const { appState, appDispatch } = useAppStore();
  const { gameSessions, player } = appState;

  useEffect(() => {
    if (gameSessions.allPaginated == null) {
      fetchAllGameSessions({ dispatch: appDispatch });
    }
  }, [appDispatch, gameSessions.allPaginated, player.playerID]);

  return (
    <FlexColumn id="all-game-sessions">
      {gameSessions.allPaginated == null ? (
        <LoadingState />
      ) : (
        gameSessions.allPaginated.map((gameSession, index) => {
          const { id, playerOneID, playerTwoID, status } = gameSession;
          return (
            <FlexColumn key={id} className="all-game-sessions-item">
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
