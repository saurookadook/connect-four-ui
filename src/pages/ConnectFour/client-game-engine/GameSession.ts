import { UUID } from 'crypto';

import { GameBoard, GameSessionStatus, PlayerColor } from '@ConnectFour/constants';
import { Board } from '@ConnectFour/client-game-engine/Board';
import { isUUID } from '@src/utils';

export class GameSession {
  #activePlayer: PlayerColor;
  #board: Board;
  // players: UUID[]; // TODO: maybe this would be simpler...?
  #playerOneID: UUID;
  #playerTwoID: UUID;
  #status: GameSessionStatus;

  constructor({
    activePlayer, // force formatting
    boardState,
    playerOneID,
    playerTwoID,
    status,
  }: {
    activePlayer?: PlayerColor;
    boardState?: GameBoard;
    playerOneID: UUID;
    playerTwoID: UUID;
    status?: GameSessionStatus;
  }) {
    this.#activePlayer = activePlayer ?? PlayerColor.RED;
    this.#board = new Board({ state: boardState });
    this.#playerOneID = playerOneID;
    this.#playerTwoID = playerTwoID;
    this.#status = status ?? GameSessionStatus.ACTIVE;
  }

  changeActivePlayer() {
    this.#activePlayer =
      this.#activePlayer === PlayerColor.RED ? PlayerColor.BLACK : PlayerColor.RED;
  }

  // TODO: maybe this is unnecessary?
  updateBoard({
    column, // force formatting
    playerID,
  }: {
    column: number;
    playerID: UUID;
  }): GameBoard {
    return this.#board.updateBoardState({
      columnIndex: column,
      playerColor: this._getPlayerColorByID(playerID),
    });
  }

  _getPlayerColorByID(playerID: UUID): PlayerColor {
    switch (playerID) {
      case this.#playerOneID:
        return PlayerColor.RED;
      case this.#playerTwoID:
        return PlayerColor.BLACK;
      default:
        throw new Error(`Unknown playerID: '${playerID}'`);
    }
  }

  get activePlayer(): PlayerColor {
    return this.#activePlayer;
  }

  set activePlayer(playerColor: PlayerColor) {
    if (!(playerColor in PlayerColor)) {
      throw new Error(`Invalid player color: '${playerColor}'`);
    }

    this.#activePlayer = playerColor;
  }

  get board(): Board {
    return this.#board;
  }

  set board(boardValue: Board) {
    if (!(boardValue instanceof Board)) {
      throw new TypeError(`Invalid argument: 'board' must be an instance of 'Board'`);
    }

    this.#board = boardValue;
  }

  get playerOneID(): UUID {
    return this.#playerOneID;
  }

  set playerOneID(playerID: UUID) {
    if (!isUUID(playerID)) {
      throw new TypeError(`Invalid argument: 'playerID' must be a valid UUID`);
    }

    this.#playerOneID = playerID;
  }

  get playerTwoID(): UUID {
    return this.#playerTwoID;
  }

  set playerTwoID(playerID: UUID) {
    if (!isUUID(playerID)) {
      throw new TypeError(`Invalid argument: 'playerID' must be a valid UUID`);
    }

    this.#playerTwoID = playerID;
  }

  get status(): GameSessionStatus {
    return this.#status;
  }

  set status(statusValue: GameSessionStatus) {
    if (!(statusValue in GameSessionStatus)) {
      throw new TypeError(`Invalid status: argument must be a member of 'GameSessionStatus'`);
    }

    this.#status = statusValue;
  }
}
