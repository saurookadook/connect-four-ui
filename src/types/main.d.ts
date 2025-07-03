import { AppDispatch } from '@/store';

export type Message = {
  content: string;
  id: string;
  sender: 'client' | 'server';
  timestamp: number;
};

export type BaseAction = {
  dispatch: AppDispatch;
};

// connect-four
export enum GameSessionStatus {
  ABANDONED = 'ABANDONED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export type GameSessionsHistoryItem = {
  gameSessionID: string;
  status: GameSessionStatus;
  playerOneID: string;
  playerTwoID: string;
};
