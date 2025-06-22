import { REGISTER_NEW_PLAYER, LOG_IN_PLAYER } from '../actionTypes';
import type { BaseAction } from '@/types/main';

async function handleAuthRequest({
  dispatch,
  actionType,
  playerDetails,
}: BaseAction & {
  actionType: typeof REGISTER_NEW_PLAYER | typeof LOG_IN_PLAYER;
  playerDetails: { username: string; password: string };
}) {
  const { errorMessage, requestPath } = (function () {
    if (actionType === REGISTER_NEW_PLAYER) {
      return {
        requestPath: '/auth/register',
        errorMessage: 'Encountered ERROR while registering new player:',
      };
    } else if (actionType === LOG_IN_PLAYER) {
      return {
        requestPath: '/auth/login',
        errorMessage: 'Encountered ERROR while logging in:',
      };
    } else {
      throw new Error('Invalid action type provided');
    }
  })();

  let responseData;

  try {
    const requestURL = new URL(requestPath);
    const response = await fetch(requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: playerDetails.username,
        password: playerDetails.password,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    responseData = await response.json();
  } catch (error: unknown) {
    console.error(errorMessage, error);
    responseData = {
      error: error,
    };
  }

  dispatch({
    type: actionType,
    payload: {
      ...responseData,
    },
  });

  return responseData;
}

export async function registerNewPlayer({
  dispatch,
  username,
  password,
}: BaseAction & {
  username: string;
  password: string;
}) {
  return await handleAuthRequest({
    dispatch,
    actionType: REGISTER_NEW_PLAYER,
    playerDetails: { username, password },
  });
}

export async function logInPlayer({
  dispatch,
  username,
  password,
}: BaseAction & {
  username: string;
  password: string;
}) {
  return await handleAuthRequest({
    dispatch,
    actionType: LOG_IN_PLAYER,
    playerDetails: { username, password },
  });
}
