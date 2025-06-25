import { vi } from 'vitest';

import { mockPlayers } from '@/__mocks__/playerMocks';

const originalFetch = global.fetch;

function findPlayerByUsernameAndPassword(username: string, password: string) {
  return mockPlayers.find(function (player) {
    return player.username === username && player.password === password;
  });
}

function handlePostRequest(url: string, options: RequestInit) {
  const jsonBody =
    typeof options.body === 'string' // force formatting
      ? JSON.parse(options.body)
      : options.body;

  let responseData;
  let playerDetails;

  switch (url) {
    case `${window.location.origin}/auth/register`:
      playerDetails = findPlayerByUsernameAndPassword(jsonBody.username, jsonBody.password);
      if (playerDetails) {
        responseData = {
          message: 'Registration successful!',
          playerId: playerDetails.playerID,
          username: playerDetails.username,
        };
      } else {
        responseData = {
          message: 'Invalid username or password.',
          statusCode: 401,
        };
      }
      break;
    case `${window.location.origin}/auth/login`:
      playerDetails = findPlayerByUsernameAndPassword(jsonBody.username, jsonBody.password);
      if (playerDetails) {
        responseData = {
          message: 'Login successful!',
          playerId: playerDetails.playerID,
          username: playerDetails.username,
        };
      } else {
        responseData = {
          message: 'Invalid username or password.',
          statusCode: 401,
        };
      }
      break;
    default:
      responseData = {
        message: `[handlePostRequest] Unhandled endpoint '${url}'`,
        statusCode: 500,
      };
  }

  const status = responseData?.statusCode || 200;

  return Promise.resolve({
    ok: status >= 200 && status < 400,
    status: status,
    headers: {
      'Content-Type': 'application/json',
    },
    json: async () => responseData,
  });
}

export function createFetchMock() {
  const mockFetch = vi.fn((url: RequestInfo | URL, options?: RequestInit) => {
    const urlString = url.toString();

    switch (options?.method) {
      // TODO: is there constant for these?
      case 'POST':
        return handlePostRequest(urlString, options);
      default:
        return originalFetch(url, options);
    }
  });

  // vi.stubGlobal('fetch', mockFetch);
  // // @ts-expect-error: I know the type doesn't match exactly but that's ok :]
  // global.fetch = mockFetch;

  return mockFetch;
}
