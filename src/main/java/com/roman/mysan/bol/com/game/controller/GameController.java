package com.roman.mysan.bol.com.game.controller;

import com.roman.mysan.bol.com.game.domain.Game;
import com.roman.mysan.bol.com.game.service.GameService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.roman.mysan.bol.com.game.ApplicationConstants.API_URL;

@RestController
@RequestMapping(API_URL + "/game")
@AllArgsConstructor
public class GameController {

    private final GameService gameService;

    @PostMapping("/new-game")
    public Game createNewGame(@RequestParam  String roomName) {
        return gameService.createNewGame(roomName);
    }
}
