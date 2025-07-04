import combineReducers from '@saurookkadookk/react-utils-combine-reducers';

import { REQUEST_GAME_SESSIONS_HISTORY, SET_GAME_SESSIONS_HISTORY } from '@/store';
import { GameSessionsHistoryItem } from '@/types/main';

export type GameSessionsHistoryStateSlice = {
  hasRequestInProgress: boolean;
  sessions: GameSessionsHistoryItem[] | null;
};

type GameSessionsHistorySessionsAction = combineReducers.ReducerAction<{
  hasRequestInProgress?: GameSessionsHistoryStateSlice['hasRequestInProgress'];
  sessions?: GameSessionsHistoryStateSlice['sessions'];
}>;

type CombinedGameSessionsHistoryStateSlice = {
  hasRequestInProgress: combineReducers.ArgsTuple<
    GameSessionsHistoryStateSlice['hasRequestInProgress'],
    GameSessionsHistorySessionsAction
  >;
  sessions: combineReducers.ArgsTuple<
    GameSessionsHistoryStateSlice['sessions'],
    GameSessionsHistorySessionsAction
  >;
};

export const initialGameSessionsHistoryStateSlice = {
  hasRequestInProgress: false,
  sessions: null,
};

export const hasRequestInProgress: CombinedGameSessionsHistoryStateSlice['hasRequestInProgress'] = [
  (stateSlice, action) => {
    switch (action.type) {
      case REQUEST_GAME_SESSIONS_HISTORY:
        return true;
      case SET_GAME_SESSIONS_HISTORY:
        return false;
      default:
        return stateSlice;
    }
  },
  initialGameSessionsHistoryStateSlice.hasRequestInProgress,
];

const sessions: CombinedGameSessionsHistoryStateSlice['sessions'] = [
  (stateSlice, action) => {
    switch (action.type) {
      case SET_GAME_SESSIONS_HISTORY:
        return action.payload.sessions || [];
      default:
        return stateSlice;
    }
  },
  initialGameSessionsHistoryStateSlice.sessions,
];

export default combineReducers({
  hasRequestInProgress,
  sessions,
});
