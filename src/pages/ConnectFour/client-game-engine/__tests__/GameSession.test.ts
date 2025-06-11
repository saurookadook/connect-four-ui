import { randomUUID } from 'crypto';
import { inspect } from 'util';
import { beforeEach, describe, expect, test } from 'vitest';

import { GameSession } from '@src/pages/ConnectFour/client-game-engine';
import { BOARD_COLS, BOARD_ROWS, PlayerColor } from '@src/pages/ConnectFour/constants';

describe('GameSession', () => {
  const mockPlayerOneID = randomUUID();
  const mockPlayerTwoID = randomUUID();

  describe('constructor', () => {
    test('should initialize with empty board', () => {
      const session = new GameSession({
        playerOneID: mockPlayerOneID,
        playerTwoID: mockPlayerTwoID,
      });
      const {
        board: { state: boardState },
        playerOneID,
        playerTwoID,
      } = session;

      expect(playerOneID).toBe(mockPlayerOneID);
      expect(playerTwoID).toBe(mockPlayerTwoID);

      expect(boardState).toHaveLength(BOARD_COLS);
      expect(boardState[0]).toHaveLength(BOARD_ROWS);

      for (let i = 0; i < BOARD_COLS; i++) {
        for (let j = 0; j < BOARD_ROWS; j++) {
          expect(boardState[i][j]).toEqual({
            state: null,
            column: i,
            row: j,
          });
        }
      }
    });
  });

  describe('updateBoard', () => {
    let session: GameSession;

    beforeEach(() => {
      session = new GameSession({
        playerOneID: mockPlayerOneID,
        playerTwoID: mockPlayerTwoID,
      });
    });

    test('should update board with player color', () => {
      const columnOne = 0;
      const columnTwo = 1;
      const columnThree = 2;

      const {
        board: { state: boardState },
      } = session;

      session.updateBoard({ column: columnOne, playerID: mockPlayerOneID });
      expect(boardState[columnOne].at(-1)!.state).toBe(PlayerColor.RED);
      session.updateBoard({ column: columnOne, playerID: mockPlayerTwoID });
      expect(boardState[columnOne].at(-2)!.state).toBe(PlayerColor.BLACK);

      session.updateBoard({ column: columnTwo, playerID: mockPlayerOneID });
      expect(boardState[columnTwo].at(-1)!.state).toBe(PlayerColor.RED);
      session.updateBoard({ column: columnThree, playerID: mockPlayerTwoID });
      expect(boardState[columnThree].at(-1)!.state).toBe(PlayerColor.BLACK);

      session.updateBoard({ column: columnTwo, playerID: mockPlayerOneID });
      expect(boardState[columnTwo].at(-2)!.state).toBe(PlayerColor.RED);
      session.updateBoard({ column: columnTwo, playerID: mockPlayerTwoID });
      expect(boardState[columnTwo].at(-3)!.state).toBe(PlayerColor.BLACK);
    });

    test('should throw error for invalid column', () => {
      const negativeColumnValue = -1;
      expect(() => {
        session.updateBoard({ column: negativeColumnValue, playerID: mockPlayerOneID });
      }).toThrowError(
        `Invalid 'columnIndex' value ('${negativeColumnValue}'): Must be between 0 and ${BOARD_COLS - 1}`,
      );

      expect(() => {
        session.updateBoard({ column: BOARD_COLS, playerID: mockPlayerOneID });
      }).toThrowError(
        `Invalid 'columnIndex' value ('${BOARD_COLS}'): Must be between 0 and ${BOARD_COLS - 1}`,
      );
    });

    test('should throw error if column is full', () => {
      for (let i = 0; i < BOARD_ROWS; i++) {
        session.updateBoard({
          column: 0,
          playerID: i % 2 === 0 ? mockPlayerOneID : mockPlayerTwoID,
        });
      }

      expect(() => {
        session.updateBoard({ column: 0, playerID: mockPlayerOneID });
      }).toThrowError('Column 0 is full');
    });

    test('should throw error for unknown player ID', () => {
      const unknownPlayerID = randomUUID();
      expect(() => {
        session.updateBoard({ column: 0, playerID: unknownPlayerID });
      }).toThrowError(`Unknown playerID: '${unknownPlayerID}'`);
    });
  });
});
