import combineReducers from '@saurookkadookk/react-utils-combine-reducers';

import { REQUEST_GAME_SESSION_HISTORY, SET_GAME_SESSION_HISTORY } from '@/store';
import { GameSessionHistoryItem } from '@/types/main';

export type GameSessionHistoryStateSlice = {
  sessions: GameSessionHistoryItem[];
};

type GameSessionHistorySessionsAction = combineReducers.ReducerAction<{
  sessions?: GameSessionHistoryItem[];
}>;

type CombinedGameSessionHistoryStateSlice = {
  sessions: combineReducers.ArgsTuple<
    GameSessionHistoryStateSlice['sessions'],
    GameSessionHistorySessionsAction
  >;
};

export const initialGameSessionHistoryStateSlice = {
  sessions: [],
};

const sessions: CombinedGameSessionHistoryStateSlice['sessions'] = [
  (stateSlice, action) => {
    switch (action.type) {
      case SET_GAME_SESSION_HISTORY:
        return action.payload.sessions || [];
      default:
        return stateSlice;
    }
  },
  initialGameSessionHistoryStateSlice.sessions,
];

export default combineReducers({
  sessions,
});
