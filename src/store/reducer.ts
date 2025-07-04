import combineReducers from '@saurookkadookk/react-utils-combine-reducers';

import connectFourReducer, {
  initialConnectFourStateSlice,
  type ConnectFourStateSlice,
} from '@/store/connect-four/reducer';
import gameSessionsHistoryReducer, {
  initialGameSessionsHistoryStateSlice,
  type GameSessionsHistoryStateSlice,
} from '@/store/game-sessions-history/reducer';
import messagesReducer, {
  initialMessagesStateSlice,
  type MessagesStateSlice,
} from '@/store/messages/reducer';
import playerReducer, {
  initialPlayerStateSlice,
  type PlayerStateSlice,
} from '@/store/player/reducer';

export type AppState = {
  connectFour: ConnectFourStateSlice;
  gameSessionsHistory: GameSessionsHistoryStateSlice;
  messages: MessagesStateSlice;
  player: PlayerStateSlice;
};
// & combineReducers.AmbiguousObject;

export const initialAppState = {
  connectFour: initialConnectFourStateSlice,
  gameSessionsHistory: initialGameSessionsHistoryStateSlice,
  messages: initialMessagesStateSlice,
  player: initialPlayerStateSlice,
};

export default combineReducers({
  connectFour: connectFourReducer,
  gameSessionsHistory: gameSessionsHistoryReducer,
  messages: messagesReducer,
  player: playerReducer,
});
