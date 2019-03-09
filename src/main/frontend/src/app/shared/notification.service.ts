import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class WebSocketService {

    private stompClient;
    status = null;
    private subject = new Subject<Object>();
    private resolveDisConPromise: (...args: any[]) => void;
    private disconnectPromise: any;

    constructor() {
        this.disconnectPromise = new Promise(
            (resolve, reject) => this.resolveDisConPromise = resolve
          );
    }

    initWebSocketConnection() {
        if (this.status !== 'connected') {
            const ws = new SockJS('/api/bol-game');
            const user = {'user' : localStorage.getItem('gameId')};
            this.stompClient = Stomp.over(ws);
            this.stompClient.connect(user, this.onSuccess, this.onError);
        }
    }

    onSuccess = (frame: any) => {
        this.status = 'connected';
        const gameId = localStorage.getItem('gameId');
        const connection = {gameId: gameId, username: localStorage.getItem('username')};
        this.sendNotification('/app/connect-to', connection);
        this.stompClient.subscribe('/user/'+ gameId +'/queue/notification', (message) => {
            if (message.body) {
                this.subject.next(JSON.parse(message.body));
            }
        });
    }

    onError = (error: string) => {
        console.log(error);
        console.log('Reconnecting...');
        setTimeout(() => {
            this.initWebSocketConnection();
        }, 5000);
    }

    unsubscribe() {
	    this.stompClient.unsubscribe();
    }

    disconnect(): Promise<{}> {
        this.status = null;
		this.stompClient.disconnect(() => this.resolveDisConPromise());
		return this.disconnectPromise;
	}

    sendNotification(url, data) {
        this.stompClient.send(url, {}, JSON.stringify(data));
    }

    subscribeOnNotifications(): Observable<any> {
        return this.subject.asObservable();
    }
}
