package com.roman.mysan.bol.com.game.service;

import com.roman.mysan.bol.com.game.domain.Player;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@Service
@AllArgsConstructor
public class GameService {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public String createNewGame(Player player) {
        return createGameToken(player.getUsername());
    }

    public void onMessageReceive(Player player, String token) {
        String messageContent = "Player " + player.getUsername() + " has connected.";
        simpMessagingTemplate.convertAndSendToUser(token, "/queue/reply", messageContent);
    }

    private static String createGameToken(String username) {
        return UUID.randomUUID().toString() + Objects.hash(System.currentTimeMillis(), username);
    }
}
