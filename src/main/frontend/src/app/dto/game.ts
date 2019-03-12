import { Player } from "./player";

export class Game {
    firstPlayer: Player;
    secondPlayer: Player;
    status: string = 'WAITING';
    gameId: string;
    playerTurn: string;
}