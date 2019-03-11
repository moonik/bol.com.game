package com.roman.mysan.bol.com.game.controller;

import com.roman.mysan.bol.com.game.domain.Connection;
import com.roman.mysan.bol.com.game.domain.Game;
import com.roman.mysan.bol.com.game.service.GameService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.roman.mysan.bol.com.game.ApplicationConstants.API_URL;

@RestController(API_URL)
@AllArgsConstructor
public class ConnectionController {

    private final GameService gameService;

    @MessageMapping("/connect-to")
    public void connectTo(Connection connection) {
        gameService.connectTo(connection);
    }

    @MessageMapping("/make-turn")
    public void makeTurn(Game game) {
        gameService.sendMessage(game);
    }
}
