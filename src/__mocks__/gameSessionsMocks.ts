import { UUID } from 'crypto';
import { GameSessionStatus } from '@/types/main';
import { mockPlayers } from './playerMocks';

type GameSessionMock = {
  moves: Record<string, unknown>[];
  playerOneID: UUID;
  playerTwoID: UUID;
  status: GameSessionStatus;
};

const playerCombinations = [
  [mockPlayers[0].playerID, mockPlayers[1].playerID],
  [mockPlayers[0].playerID, mockPlayers[2].playerID],
  [mockPlayers[1].playerID, mockPlayers[0].playerID],
  [mockPlayers[1].playerID, mockPlayers[2].playerID],
  [mockPlayers[2].playerID, mockPlayers[0].playerID],
  [mockPlayers[2].playerID, mockPlayers[1].playerID],
];

export const unstartedGameSessions: GameSessionMock[] = playerCombinations.map(
  ([playerOneID, playerTwoID]) => {
    return {
      playerOneID,
      playerTwoID,
      moves: [],
      status: GameSessionStatus.ACTIVE,
    };
  },
);

export const allGameSessionsSeedData: GameSessionMock[] = [...unstartedGameSessions];
