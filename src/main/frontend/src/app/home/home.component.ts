import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Game } from '../dto/game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    username: string;
    game: any = {};
    roomName: string;

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit() {
        
    }

    createGame() {
        this.http.post('/api/bol-game/game/new-game?roomName='+this.roomName, null).subscribe(
            data => {
                this.game = data;
                localStorage.setItem('gameId', this.game.gameId);
                localStorage.setItem('username', this.username);
                this.router.navigate(['game/'+ this.game.gameId + '/creator']);
            }
        );
    }
    
    connect() {
        localStorage.setItem('gameId', this.game.gameId);
        localStorage.setItem('username', this.username);
        this.router.navigate(['game/'+ this.game.gameId + '/player']);
    }
 }