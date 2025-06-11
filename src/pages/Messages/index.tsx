import * as React from 'react';
import { useCallback, useEffect } from 'react';

import { MessageInput, MessageLogContainer } from '@src/components';
import { FlexColumn, FlexRow } from '@src/layouts';
import { setReceiveMessage } from '@src/store/actions';
import { useAppStore } from '@src/store';
import { ws } from '@src/utils';

const messageLogStyles: React.HTMLAttributes<HTMLDivElement>['style'] = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #123456',
  borderRadius: '0.5rem',
  boxSizing: 'border-box',
  height: '100%',
  justifyContent: 'stretch',
  padding: '1rem',
};

export function Messages() {
  const { appState, appDispatch } = useAppStore();
  const { allItems } = appState.messages;

  const wsMessageHandler = useCallback(
    (event: MessageEvent) => {
      // console.log('    [WebSocket] Receiving message!     '.padStart(60, '-').padEnd(120, '-'));
      // console.log('\n');
      console.log({ event });
      // console.log('\n');
      const messageData = JSON.parse(event.data);
      setReceiveMessage({ dispatch: appDispatch, receivedMessage: messageData });
    },
    [appDispatch],
  );

  useEffect(() => {
    ws.addEventListener('message', wsMessageHandler);

    return () => {
      ws.removeEventListener('message', wsMessageHandler);
    };
  }, [wsMessageHandler]);

  return (
    <div className="card">
      <FlexRow
        style={{
          columnGap: '2rem', // force formatting
          height: '30rem',
          maxHeight: '60vh',
        }}
      >
        {allItems.length > 0 ? (
          <MessageLogContainer
            messageConfigs={allItems}
            style={{ ...messageLogStyles, rowGap: '0.25rem' }}
          />
        ) : (
          <FlexColumn
            style={{ ...messageLogStyles, color: '#000000' }}
          >{`ALL OF THE MESSAGES WILL GO HERE`}</FlexColumn>
        )}

        <MessageInput />
      </FlexRow>
    </div>
  );
}
