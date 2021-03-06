import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from '../shared/notification.service';
import { Game } from '../dto/game';
import { Player } from '../dto/player';
import gameStatus from '../constants/game-status';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    gameId: string;
    gameData: Game = new Game();
    role;
    username;
    readonly MESSAGE_URL = '/app/make-turn';

    constructor(private activeRoute: ActivatedRoute, private wsService: WebSocketService, private router: Router) {
    }

    ngOnInit() {
        this.username = localStorage.getItem('username');
        this.activeRoute.params.subscribe((params: Params) => {
            this.gameId = params['id'];
            this.role = params['role'];
            this.wsService.initWebSocketConnection();
            this.wsService.asObservable().subscribe(data => {
                this.gameData = data;
                if (this.gameData.status === gameStatus.FINISHED) {
                    this.leave();
                }
            });
        });
    }

    isMyTurn() {
        if (this.gameData.playerTurn === 'FIRST') {
            return this.username === this.gameData.firstPlayer.username;
        } else {
            return this.username === this.gameData.secondPlayer.username;
        }
    }

    isGameStarted() {
        return this.gameData.status === gameStatus.STARTED;
    }

    isGameReady() {
        return this.gameData.status === gameStatus.READY;
    }

    private getOponent(player) {
        if (player === 'firstPlayer') {
            return 'secondPlayer';
        } else
            return 'firstPlayer';
    }

    sowStones(index, player) {
        let stones = this.gameData[player].pits[index];
        this.gameData[player].pits[index] = 0;
        for (index++; index < 6 && stones > 0; index++) {
            if (stones === 1 && this.gameData[player].pits[index] === 0) {
                this.gameData[player].pits[index] += this.gameData[this.getOponent(player)].pits[index];
                this.gameData[this.getOponent(player)].pits[index] = 0;
            }
            this.gameData[player].pits[index]++;
            stones--;
        }

        let isFinishedTurn = stones === 1 ? false : true;
        if (stones > 0) {
            this.gameData[player].largePit += stones;
        }

        this.checkIfTurnFinished(isFinishedTurn);
        this.checkIsGameFinished();
    }

    checkIfTurnFinished(isFinishedTurn) {
        if (isFinishedTurn) {
            this.finishTurn();
            this.gameData.playerTurn = this.gameData.playerTurn === 'FIRST' ? 'SECOND' : 'FIRST';
        }
    }

    checkIsGameFinished() {
        if (this.isGameFinished()) {
            this.gameData.status = gameStatus.FINISHED;
            this.wsService.sendNotification(this.MESSAGE_URL, this.gameData);
            this.leave();
        }
    }

    private isGameFinished() {
        const firstPlayerEmptyPits = this.gameData.firstPlayer.pits.filter(stones => stones === 0);
        const secondPlayerEmptyPits = this.gameData.secondPlayer.pits.filter(stones => stones === 0);
        if (firstPlayerEmptyPits.length === 6) {
            const sum = this.gameData.secondPlayer.pits.reduce((sum, a) => sum + a);
            this.gameData.secondPlayer.largePit += sum;
        } else if (secondPlayerEmptyPits.length === 6) {
            const sum = this.gameData.firstPlayer.pits.reduce((sum, a) => sum + a);
            this.gameData.firstPlayer.largePit += sum;
        } else
            return false;
        alert('Game is over. Winner: ' + this.getWinner());
        return true;
    }

    private getWinner() {
        return  this.gameData.firstPlayer.largePit > this.gameData.secondPlayer.largePit ?
            this.gameData.firstPlayer.username : this.gameData.secondPlayer.username;
    }

    finishTurn() {
        this.wsService.sendNotification(this.MESSAGE_URL, this.gameData);
    }

    startGame() {
        this.gameData.status = gameStatus.STARTED;
        this.wsService.sendNotification(this.MESSAGE_URL, this.gameData);
    }

    isDisabled(role, pit, player) {
        return !this.isMyTurn() || this.role !== role || this.gameData[player].pits[pit] === 0;
    }

    leave() {
        this.wsService.disconnect();
        this.router.navigate(['/home']);
    }
 }
