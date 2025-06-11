import { UUID } from 'crypto';
import { inspect } from 'util';

import {
  BOARD_COLS,
  BOARD_ROWS,
  Cell,
  GameBoard,
  GameSessionStatus,
  PlayerColor,
} from '@ConnectFour/constants';
import { Board, GameSession } from '@ConnectFour/client-game-engine';

export class ClientGameEngine {
  #validatorFuncs: ValidatorFunc[];

  constructor() {
    this.#validatorFuncs = [
      checkTopDownVerticalWin,
      checkTopDownLeftDiagonalWin,
      checkTopDownRightDiagonalWin,
      checkRightToLeftHorizontalWin,
      checkLeftToRightHorizontalWin,
    ];
  }

  // TODO: should maybe be static?
  startGame({
    playerOneID, // force formatting
    playerTwoID,
  }: {
    playerOneID: UUID;
    playerTwoID: UUID;
  }): GameSession {
    try {
      return new GameSession({
        playerOneID,
        playerTwoID,
      });
    } catch (error) {
      console.error(
        '[ClientGameEngine.startGame] Encountered ERROR initializing game session: ',
        error,
      );
      throw error;
    }
  }

  handleMove({
    columnIndex, // force formatting
    playerID,
    sessionRef,
  }: {
    columnIndex: number;
    playerID: UUID;
    sessionRef: GameSession;
  }): GameSession {
    sessionRef.updateBoard({
      column: columnIndex,
      playerID: playerID,
    });

    if (this.checkForWin(sessionRef.board, sessionRef.activePlayer)) {
      return this.endGame(sessionRef);
    }

    sessionRef.changeActivePlayer();

    return sessionRef;
  }

  checkForWin(board: Board, activePlayer: PlayerColor): boolean {
    // console.log('    checkForWin    '.padStart(80, '!').padEnd(140, '!'));
    const lastUpdatedCell = board.lastUpdatedCell as Cell;
    // console.log({ lastUpdatedCell });

    if (lastUpdatedCell == null) return false;

    const activePlayerHasWon = this.#validatorFuncs.some((validatorFunc) =>
      validatorFunc(board.state, lastUpdatedCell.column, lastUpdatedCell.row, activePlayer),
    );
    // console.log(inspect({ board, activePlayerHasWon }, { colors: true, depth: null }));
    // console.log('!'.repeat(140));

    return activePlayerHasWon;
  }

  endGame(sessionRef: GameSession) {
    sessionRef.status = GameSessionStatus.COMPLETED;

    return sessionRef;
  }
}

function isBeyondBoardBounds(
  col: number, // force formatting
  row: number,
) {
  return col < 0 || col >= BOARD_COLS || row < 0 || row >= BOARD_ROWS;
}

type ValidatorFunc = (
  boardState: GameBoard,
  colStart: number,
  rowStart: number,
  playerColor: PlayerColor,
) => boolean;

function checkTopDownVerticalWin(
  boardState: GameBoard,
  colStart: number,
  rowStart: number,
  playerColor: PlayerColor,
): boolean {
  let cell: Cell;

  console.log(`checkTopDownVerticalWin for ${playerColor}`);
  for (let row = rowStart; row <= rowStart + 3; row++) {
    console.log(`---- col: ${colStart} | row: ${row}`);
    if (isBeyondBoardBounds(colStart, row)) return false;

    cell = boardState[colStart][row];
    console.log(`---- cell: ${JSON.stringify(cell)}`);
    if (cell.state !== playerColor) {
      return false;
    }
  }

  return true;
}

function checkTopDownLeftDiagonalWin(
  boardState: GameBoard,
  colStart: number,
  rowStart: number,
  playerColor: PlayerColor,
): boolean {
  let cell: Cell;
  let row = rowStart;

  console.log(`checkTopDownLeftDiagonalWin for ${playerColor}`);
  for (let col = colStart; col >= colStart - 3; col--) {
    console.log(`---- col: ${col} | row: ${row}`);
    if (isBeyondBoardBounds(col, row)) return false;

    cell = boardState[col][row];
    console.log(`---- cell: ${JSON.stringify(cell)}`);
    if (cell.state !== playerColor) {
      return false;
    }
    row++;
  }

  return true;
}

function checkTopDownRightDiagonalWin(
  boardState: GameBoard,
  colStart: number,
  rowStart: number,
  playerColor: PlayerColor,
): boolean {
  let cell: Cell;
  let row = rowStart;

  console.log(`checkTopDownRightDiagonalWin for ${playerColor}`);
  for (let col = colStart; col <= colStart + 3; col++) {
    console.log(`---- col: ${col} | row: ${row}`);
    if (isBeyondBoardBounds(col, row)) return false;

    cell = boardState[col][row];
    console.log(`---- cell: ${JSON.stringify(cell)}`);
    if (cell.state !== playerColor) {
      return false;
    }
    row++;
  }

  return true;
}

function checkLeftToRightHorizontalWin(
  boardState: GameBoard,
  colStart: number,
  rowStart: number,
  playerColor: PlayerColor,
): boolean {
  let cell: Cell;

  console.log(`checkLeftToRightHorizontalWin for ${playerColor}`);
  for (let col = colStart; col <= colStart + 3; col++) {
    console.log(`---- col: ${col} | row: ${rowStart}`);
    if (isBeyondBoardBounds(col, rowStart)) return false;

    cell = boardState[col][rowStart];
    console.log(`---- cell: ${JSON.stringify(cell)}`);
    if (cell.state !== playerColor) {
      return false;
    }
  }

  return true;
}

function checkRightToLeftHorizontalWin(
  boardState: GameBoard,
  colStart: number,
  rowStart: number,
  playerColor: PlayerColor,
): boolean {
  let cell: Cell;

  console.log(`checkRightToLeftHorizontalWin for ${playerColor}`);
  for (let col = colStart; col >= colStart - 3; col--) {
    console.log(`---- col: ${col} | row: ${rowStart}`);
    if (isBeyondBoardBounds(col, rowStart)) return false;

    cell = boardState[col][rowStart];
    console.log(`---- cell: ${JSON.stringify(cell)}`);
    if (cell.state !== playerColor) {
      return false;
    }
  }

  return true;
}
