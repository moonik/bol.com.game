import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from '../shared/notification.service';
import { Game } from '../dto/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    gameId: string;
    gameData: Game = new Game();
    role;

    constructor(private activeRoute: ActivatedRoute, private wsService: WebSocketService) {
    }

    ngOnInit() {
        this.activeRoute.params.subscribe((params: Params) => {
            this.gameId = params['id'];
            this.role = params['role'];
            this.wsService.initWebSocketConnection();
            this.wsService.asObservable().subscribe(data => {
                this.gameData = data;
            });
        });
    }

    isMyTurn() {
        if (this.gameData.playerTurn === 'FIRST') {
            return localStorage.getItem('username') === this.gameData.firstPlayer.username;
        } else {
            return localStorage.getItem('username') === this.gameData.secondPlayer.username;
        }
    }

    isGameStarted() {
        return this.gameData.status === 'STARTED';
    }

    isGameReady() {
        return this.gameData.status === 'READY';
    }

    sowStones(index, player) {
        let stones = this.gameData[player].pits[index];
        this.gameData[player].pits[index] = 0;
        for (index++; index < 6 && stones > 0; index++) {
            this.gameData[player].pits[index]++;
            stones--;
        }

        let isFinished = stones == 1 ? false : true;
        if (stones > 0) {
            this.gameData[player].largePit = stones;
        }
        if (isFinished) {
            this.finishTurn();
            this.gameData.playerTurn = this.gameData.playerTurn === 'FIRST' ? 'SECOND' : 'FIRST';
        }
    }

    finishTurn() {
        this.wsService.sendNotification('/app/make-turn', this.gameData);
    }

    startGame() {
        this.gameData.status = 'STARTED';
        this.wsService.sendNotification('/app/make-turn', this.gameData);
    }
 }