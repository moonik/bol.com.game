package com.roman.mysan.bol.com.game.controller;

import com.roman.mysan.bol.com.game.domain.Connection;
import com.roman.mysan.bol.com.game.domain.Game;
import com.roman.mysan.bol.com.game.domain.Game.PlayerTurn;
import com.roman.mysan.bol.com.game.service.GameService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.roman.mysan.bol.com.game.utils.ApplicationConstants.API_URL;

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
        PlayerTurn playerTurn = game.getPlayerTurn();
        game.setPlayerTurn(playerTurn == PlayerTurn.FIRST ? PlayerTurn.SECOND : PlayerTurn.FIRST);
        gameService.sendMessage(game);
    }
}
