import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    username: string;
    gameId: string;
    roomName: string;

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit() {
        
    }

    createGame() {
        this.http.post('/api/bol-game/game/new-game?roomName='+this.roomName, null).subscribe(
            data => {
                localStorage.setItem('gameId', data.gameId);
                localStorage.setItem('username', this.username);
                this.router.navigate(['game/'+ data.gameId + '/creator']);
            }
        );
    }
    
    connect() {
        localStorage.setItem('gameId', this.gameId);
        localStorage.setItem('username', this.username);
        this.router.navigate(['game/'+ this.gameId + '/player']);
    }
 }