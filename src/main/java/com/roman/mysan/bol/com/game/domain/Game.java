package com.roman.mysan.bol.com.game.domain;

import lombok.*;

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
        FINISHED
    }
}
