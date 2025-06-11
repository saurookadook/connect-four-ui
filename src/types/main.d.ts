import { AppDispatch } from '@src/store';

export type Message = {
  content: string;
  id: string;
  sender: 'client' | 'server';
  timestamp: number;
};

export type BaseAction = {
  dispatch: AppDispatch;
};
