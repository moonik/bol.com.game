package com.roman.mysan.bol.com.game.controller;

import com.roman.mysan.bol.com.game.domain.Game;
import com.roman.mysan.bol.com.game.domain.Player;
import com.roman.mysan.bol.com.game.service.GameService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.roman.mysan.bol.com.game.ApplicationConstants.API_URL;

@RestController
@RequestMapping(API_URL)
@AllArgsConstructor
public class GameController {

    private final Map<String, Game> games;
    private final GameService gameService;

    @PostMapping("/new-game")
    public String createNewGame(@RequestBody Player player) {
        String token = gameService.createNewGame(player);
        games.put(token, new Game(player, null, token));
        return token;
    }

    @MessageMapping("/connect")
    public Game connect(@RequestParam String token, @RequestBody Player player) {
        if (games.containsKey(token)) {
            Game game = games.get(token);
            game.setSecondPlayer(player);
            games.put(token, game);

            gameService.onMessageReceive(player, token);
            return game;
        } else
            return null;
    }
}
