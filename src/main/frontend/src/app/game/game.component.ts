import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from '../shared/notification.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {

    gameId: string;
    gameData = {status: 'WAITING'};

    constructor(private http: HttpClient, private activeRoute: ActivatedRoute, private wsService: WebSocketService) {
    }

    ngOnInit() {
        this.activeRoute.params.subscribe((params: Params) => {
            this.gameId = params['id'];
            this.wsService.initWebSocketConnection();
            this.wsService.subscribeOnNotifications().subscribe(data => {
                this.gameData = data;
            });
        });
    }

    isGameReady() {
        return this.gameData.status === 'READY';
    }
 }