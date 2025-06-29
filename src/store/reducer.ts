import combineReducers from '@saurookkadookk/react-utils-combine-reducers';

import connectFourReducer, {
  initialConnectFourStateSlice,
  type ConnectFourStateSlice,
} from '@/store/connect-four/reducer';
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
  messages: MessagesStateSlice;
  player: PlayerStateSlice;
};
// & combineReducers.AmbiguousObject;

export const initialAppState = {
  connectFour: initialConnectFourStateSlice,
  messages: initialMessagesStateSlice,
  player: initialPlayerStateSlice,
};

export default combineReducers({
  connectFour: connectFourReducer,
  messages: messagesReducer,
  player: playerReducer,
});
