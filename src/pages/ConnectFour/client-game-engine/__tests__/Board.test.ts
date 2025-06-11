import { beforeEach, describe, expect, test } from 'vitest';

import { Board } from '@ConnectFour/client-game-engine';
import { BOARD_COLS, BOARD_ROWS, PlayerColor } from '@ConnectFour/constants';

describe('Board', () => {
  let board: Board;

  describe("'updateBoardState' method", () => {
    test("updates cell state at '(col, row)' coordinate with player color", () => {
      board = new Board();

      const targetColIndex = 4;

      expect(board.state[targetColIndex].at(-1)?.state).toBeNull();

      board.updateBoardState({
        columnIndex: targetColIndex,
        playerColor: PlayerColor.RED,
      });

      expect(board.state[targetColIndex].at(-1)?.state).toBe(PlayerColor.RED);
    });
  });

  describe("'createEmptyBoardState' static method", () => {
    test('creates a new empty board', () => {
      const emptyBoardColumns = Board.createEmptyBoardState();

      expect(emptyBoardColumns).toHaveLength(BOARD_COLS);

      emptyBoardColumns.forEach((row, colIndex) => {
        expect(row).toHaveLength(BOARD_ROWS);

        row.forEach((cell, rowIndex) => {
          expect(cell).toEqual({
            column: colIndex,
            row: rowIndex,
            state: null,
          });
        });
      });
    });
  });
});
