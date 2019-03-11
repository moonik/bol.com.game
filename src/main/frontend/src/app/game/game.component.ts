import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from '../shared/notification.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    gameId: string;
    gameData = {status: 'WAITING'};

    constructor(private activeRoute: ActivatedRoute, private wsService: WebSocketService) {
    }

    ngOnInit() {
        this.activeRoute.params.subscribe((params: Params) => {
            this.gameId = params['id'];
            this.wsService.initWebSocketConnection();
            this.wsService.asObservable().subscribe(data => {
                this.gameData = data;
            });
        });
    }

    isMyTurn() {
        console.log(this.gameData.playerTurn);
        if (this.gameData.playerTurn === 'FIRST') {
            return localStorage.getItem('username') === this.gameData.firstPlayer.username;
        } else {
            return localStorage.getItem('username') === this.gameData.secondPlayer.username;
        }
    }

    isMyPit(player) {
        return localStorage.getItem('username') === this.gameData[player].username;
    }

    isGameReady() {
        return this.gameData.status === 'READY';
    }

    sowStones(index, player) {
        let stones = this.gameData[player].pits[index];
        for (index++; index < 6 && stones > 0; index++) {
            this.gameData[player].pits[index]++;
        }
        if (stones > 0) {

        }
    }
 }