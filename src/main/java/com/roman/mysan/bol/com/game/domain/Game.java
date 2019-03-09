package com.roman.mysan.bol.com.game.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Game {

    private Player firstPlayer;
    private Player secondPlayer;
    private String gameToken;
}
