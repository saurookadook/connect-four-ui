import combineReducers from '@saurookkadookk/react-utils-combine-reducers';

import connectFourReducer, {
  type ConnectFourStateSlice,
  initialConnectFourStateSlice,
} from '@src/store/connect-four/reducer';
import messagesReducer, {
  type MessagesStateSlice,
  initialMessagesStateSlice,
} from '@src/store/messages/reducer';

export type AppState = {
  connectFour: ConnectFourStateSlice;
  messages: MessagesStateSlice;
};
// & combineReducers.AmbiguousObject;

export const initialAppState = {
  connectFour: initialConnectFourStateSlice,
  messages: initialMessagesStateSlice,
};

export default combineReducers({
  connectFour: connectFourReducer,
  messages: messagesReducer,
});
