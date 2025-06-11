let ws: WebSocket;

try {
  ws = new WebSocket('ws://localhost:8080/connect');

  ws.addEventListener('open', (event) => {
    console.log(
      '    [WebSocket] Opening WebSocket connection    '.padStart(60, '-').padEnd(120, '-'),
    );
    console.log('\n');
    console.log({ event });
    console.log('\n');
  });

  ws.addEventListener('message', (event) => {
    console.log('    [WebSocket] Receiving message!     '.padStart(60, '-').padEnd(120, '-'));
    console.log('\n');
    console.log({ event });
    console.log('\n');
  });
} catch (error: unknown) {
  console.error('ERROR creating WebSocket instance', error);
}

const closeWSConn = () => {
  console.log(
    '    [WebSocket] Closing WebSocket connection    '.padStart(60, '-').padEnd(120, '-'),
  );
  ws.close();
};

export { ws, closeWSConn };
export * from './deeplyMerge';
export * from './typeGuards';
