package com.roman.mysan.bol.com.game.domain;

import lombok.*;

import java.util.Objects;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Game {

    private Player firstPlayer;
    private Player secondPlayer;
    private GameStatus status;
    private String gameId;
    private PlayerTurn playerTurn;

    public enum PlayerTurn {
        FIRST,
        SECOND
    }

    public enum GameStatus {
        READY,
        WAITING,
        FINISHED,
        STARTED
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Game game = (Game) o;
        return firstPlayer.equals(game.firstPlayer) &&
                secondPlayer.equals(game.secondPlayer) &&
                status == game.status &&
                gameId.equals(game.gameId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(firstPlayer, secondPlayer, status, gameId);
    }
}
