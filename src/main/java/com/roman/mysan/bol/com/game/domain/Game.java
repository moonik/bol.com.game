package com.roman.mysan.bol.com.game.domain;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Game {

    private Player firstPlayer;
    private Player secondPlayer;
    private GameStatus status;
    private String gameId;

    public enum GameStatus {
        READY,
        WAITING,
        FINISHED
    }
}
