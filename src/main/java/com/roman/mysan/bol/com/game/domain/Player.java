package com.roman.mysan.bol.com.game.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class Player {

    private String username;
    private int[] pits = new int[] {6, 6, 6, 6, 6, 6};
    private int largePit;

    public Player(String username) {
        this.username = username;
    }
}
