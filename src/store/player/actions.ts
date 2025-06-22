import { REGISTER_NEW_PLAYER, LOG_IN_PLAYER } from '../actionTypes';
import type { BaseAction } from '@/types/main';

export async function registerNewPlayer({
  dispatch,
  username,
  password,
}: BaseAction & {
  username: string;
  password: string;
}) {
  let responseData;

  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    responseData = await response.json();
  } catch (error: unknown) {
    console.error('Encountered ERROR while registering new player:', error);
    responseData = {
      error: error,
    };
  }

  dispatch({
    type: REGISTER_NEW_PLAYER,
    payload: {
      ...responseData,
    },
  });
  return responseData;
}

export async function logInPlayer({
  dispatch,
  username,
  password,
}: BaseAction & {
  username: string;
  password: string;
}) {
  let responseData;

  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    responseData = await response.json();
  } catch (error: unknown) {
    console.error('Encountered ERROR while logging in:', error);
    responseData = {
      error: error,
    };
  }

  dispatch({
    type: LOG_IN_PLAYER,
    payload: {
      ...responseData,
    },
  });
  return responseData;
}
