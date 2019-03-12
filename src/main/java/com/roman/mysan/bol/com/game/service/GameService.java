package com.roman.mysan.bol.com.game.service;

import com.roman.mysan.bol.com.game.domain.Connection;
import com.roman.mysan.bol.com.game.domain.Game;
import com.roman.mysan.bol.com.game.domain.Game.GameStatus;
import com.roman.mysan.bol.com.game.domain.Game.PlayerTurn;
import com.roman.mysan.bol.com.game.domain.Player;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Service
@AllArgsConstructor
public class GameService {

    private final Map<String, Game> games;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public Game createNewGame(String gameName) {
        String gameId = createGameId(gameName);
        Game game = Game.builder().status(GameStatus.WAITING).gameId(gameId).build();
        games.put(gameId, game);
        return game;
    }

    public void connectTo(Connection connection) {
        Game game = addPlayer(connection.getGameId(), connection.getUsername());
        sendMessage(game);
    }

    public void sendMessage(Game game) {
        simpMessagingTemplate.convertAndSendToUser(
                game.getGameId(),
                "/queue/notification",
                game
        );
    }

    private Game addPlayer(String gameId, String username) {
        Game game = games.get(gameId);
        Player player = new Player(username);
        if (game.getFirstPlayer() == null) {
            game.setFirstPlayer(player);
        } else {
            game.setSecondPlayer(player);
            game.setStatus(GameStatus.READY);
            int playerTurn = ThreadLocalRandom.current().nextInt(1, 3);
            game.setPlayerTurn(playerTurn == 1 ? PlayerTurn.FIRST : PlayerTurn.SECOND);
        }
        games.put(gameId, game);
        return game;
    }

    private static String createGameId(String username) {
        return UUID.randomUUID().toString() + Objects.hash(System.currentTimeMillis(), username);
    }
}
