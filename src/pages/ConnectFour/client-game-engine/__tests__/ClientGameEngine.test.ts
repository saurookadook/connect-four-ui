import { UUID, randomUUID } from 'crypto';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

import { ClientGameEngine, GameSession } from '@ConnectFour/client-game-engine';
import { GameSessionStatus, PlayerColor } from '@ConnectFour/constants';

describe('ClientGameEngine', () => {
  const mockPlayerOneID: UUID = randomUUID();
  const mockPlayerTwoID: UUID = randomUUID();
  let gameEngine: ClientGameEngine;
  let gameSession: GameSession;

  beforeEach(() => {
    gameEngine = new ClientGameEngine();
  });

  afterEach(() => {
    if (gameSession != null) {
      gameSession.board.reset();
    }
  });

  describe('startGame', () => {
    test('creates a new game session with player IDs', () => {
      const newGameSession = gameEngine.startGame({
        playerOneID: mockPlayerOneID,
        playerTwoID: mockPlayerTwoID,
      });

      expect(newGameSession).toBeDefined();
      expect(newGameSession).toBeInstanceOf(GameSession);
      expect(newGameSession.playerOneID).toBe(mockPlayerOneID);
      expect(newGameSession.playerTwoID).toBe(mockPlayerTwoID);
    });
  });

  describe('handleMove', () => {
    beforeEach(() => {
      gameSession = gameEngine.startGame({
        playerOneID: mockPlayerOneID,
        playerTwoID: mockPlayerTwoID,
      });
    });

    // TODO: fix method implementation
    test.skip("updates board state and active player for 'sessionRef'", () => {
      const {
        board: { state: boardState },
      } = gameSession;
      const targetColIndex = 3;

      expect(boardState[targetColIndex].at(-1)?.state).toBeNull();
      expect(gameSession.activePlayer).toBe(PlayerColor.RED);

      gameEngine.handleMove({
        columnIndex: targetColIndex,
        playerID: mockPlayerOneID,
        sessionRef: gameSession,
      });

      expect(boardState[targetColIndex].at(-1)?.state).toBe(PlayerColor.RED);
      expect(gameSession.activePlayer).toBe(PlayerColor.BLACK);

      gameEngine.handleMove({
        columnIndex: targetColIndex,
        playerID: mockPlayerTwoID,
        sessionRef: gameSession,
      });

      expect(boardState[targetColIndex].at(-1)?.state).toBe(PlayerColor.BLACK);
      expect(gameSession.activePlayer).toBe(PlayerColor.RED);
    });

    // TODO: fix method implementation
    test.skip("updates board state with winning move for 'sessionRef'", () => {
      populateBoardWithOneMoveTilWin(gameSession);

      const targetColIndex = 0;

      gameEngine.handleMove({
        columnIndex: targetColIndex,
        playerID: mockPlayerOneID,
        sessionRef: gameSession,
      });

      expect(gameSession.board.state[targetColIndex].at(-1)?.state).toBe(PlayerColor.RED);
      expect(gameSession.activePlayer).toBe(PlayerColor.RED);
    });
  });

  describe('checkForWin', () => {
    describe('no win conditions', () => {
      let gameSession: GameSession;

      beforeEach(() => {
        gameSession = gameEngine.startGame({
          playerOneID: mockPlayerOneID,
          playerTwoID: mockPlayerTwoID,
        });
      });

      test('simple case', () => {
        gameSession.board.updateBoardState({
          columnIndex: 3,
          playerColor: PlayerColor.RED,
        });
        gameSession.board.updateBoardState({
          columnIndex: 2,
          playerColor: PlayerColor.BLACK,
        });
        gameSession.board.updateBoardState({
          columnIndex: 3,
          playerColor: PlayerColor.RED,
        });
        gameSession.board.updateBoardState({
          columnIndex: 3,
          playerColor: PlayerColor.BLACK,
        });
        gameSession.board.updateBoardState({
          columnIndex: 4,
          playerColor: PlayerColor.RED,
        });

        expect(gameEngine.checkForWin(gameSession.board, gameSession.activePlayer)).toBe(false);
      });
    });

    describe('win conditions', () => {
      let gameSession: GameSession;

      beforeEach(() => {
        gameSession = gameEngine.startGame({
          playerOneID: mockPlayerOneID,
          playerTwoID: mockPlayerTwoID,
        });
      });

      test('simple case', () => {
        populateBoardWithSimpleWin(gameSession);

        expect(gameEngine.checkForWin(gameSession.board, gameSession.activePlayer)).toBe(true);
      });
    });
  });

  describe('endGame', () => {
    test('correctly handles a game session with a winning condition', () => {
      const gameSession: GameSession = gameEngine.startGame({
        playerOneID: mockPlayerOneID,
        playerTwoID: mockPlayerTwoID,
      });
      populateBoardWithSimpleWin(gameSession);

      gameEngine.endGame(gameSession);

      expect(gameSession.status).toBe(GameSessionStatus.COMPLETED);
      expect(gameSession.activePlayer).toBe(PlayerColor.RED);
    });
  });
});

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------
function populateBoardWithOneMoveTilWin(gameSessionRef: GameSession): void {
  // RED at (3, 0)
  gameSessionRef.board.updateBoardState({
    columnIndex: 3,
    playerColor: PlayerColor.RED,
  });
  gameSessionRef.board.updateBoardState({
    columnIndex: 2,
    playerColor: PlayerColor.BLACK,
  });
  // RED at (2, 1)
  gameSessionRef.board.updateBoardState({
    columnIndex: 2,
    playerColor: PlayerColor.RED,
  });
  gameSessionRef.board.updateBoardState({
    columnIndex: 1,
    playerColor: PlayerColor.BLACK,
  });
  gameSessionRef.board.updateBoardState({
    columnIndex: 1,
    playerColor: PlayerColor.RED,
  });
  gameSessionRef.board.updateBoardState({
    columnIndex: 0,
    playerColor: PlayerColor.BLACK,
  });
  // RED at (1, 2)
  gameSessionRef.board.updateBoardState({
    columnIndex: 1,
    playerColor: PlayerColor.RED,
  });
  gameSessionRef.board.updateBoardState({
    columnIndex: 0,
    playerColor: PlayerColor.BLACK,
  });
  gameSessionRef.board.updateBoardState({
    columnIndex: 0,
    playerColor: PlayerColor.RED,
  });
  gameSessionRef.board.updateBoardState({
    columnIndex: 3,
    playerColor: PlayerColor.BLACK,
  });
}

/**
 * @example
 * ```txt
 *   0   1   2   3   4   5   6
 * ├───┼───┼───┼───┼───┼───┼───┤
 * │   │   │   │   │   │   │   │ 0
 * ├───┼───┼───┼───┼───┼───┼───┤
 * │   │   │   │   │   │   │   │ 1
 * ├───┼───┼───┼───┼───┼───┼───┤
 * │ R │   │   │   │   │   │   │ 2
 * ├───┼───┼───┼───┼───┼───┼───┤
 * │ R │ R │   │   │   │   │   │ 3
 * ├───┼───┼───┼───┼───┼───┼───┤
 * │ B │ R │ R │ B │   │   │   │ 4
 * ├───┼───┼───┼───┼───┼───┼───┤
 * │ B │ B │ B │ R │   │   │   │ 5
 * └───┴───┴───┴───┴───┴───┴───┘
 * ```
 */
function populateBoardWithSimpleWin(gameSessionRef: GameSession): void {
  populateBoardWithOneMoveTilWin(gameSessionRef);

  // RED at (0, 3)
  gameSessionRef.board.updateBoardState({
    columnIndex: 0,
    playerColor: PlayerColor.RED,
  });
}

/**
 * TEMPLATE
 * @example
 * ```txt
 * ├───┼───┼───┼───┼───┼───┼───┤
 * │   │   │   │   │   │   │   │
 * ├───┼───┼───┼───┼───┼───┼───┤
 * │   │   │   │   │   │   │   │
 * ├───┼───┼───┼───┼───┼───┼───┤
 * │   │   │   │   │   │   │   │
 * ├───┼───┼───┼───┼───┼───┼───┤
 * │   │   │   │   │   │   │   │
 * ├───┼───┼───┼───┼───┼───┼───┤
 * │   │   │   │   │   │   │   │
 * ├───┼───┼───┼───┼───┼───┼───┤
 * │   │   │   │   │   │   │   │
 * └───┴───┴───┴───┴───┴───┴───┘
 * ```
 */
