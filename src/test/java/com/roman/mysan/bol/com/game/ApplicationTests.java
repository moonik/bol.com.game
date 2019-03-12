package com.roman.mysan.bol.com.game;

import com.roman.mysan.bol.com.game.domain.Connection;
import com.roman.mysan.bol.com.game.domain.Game;
import com.roman.mysan.bol.com.game.domain.Game.GameStatus;
import com.roman.mysan.bol.com.game.service.GameService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Map;

import static com.sun.javaws.JnlpxArgs.verify;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationTests {

	@Mock
	private SimpMessagingTemplate simpMessagingTemplate;
	private Map<String, Game> games;
	private GameService gameService;

	@Before
	public void setup() {
		games.put("gameId", Game.builder().status(GameStatus.WAITING).gameId("gameId").build());
		gameService = new GameService(games, simpMessagingTemplate);
	}

	@Test
	public void should_add_player_to_the_game() {
		//given
		Connection connection = new Connection("gameId", "firstPlayer");

		//when
		gameService.connectTo(connection);

		//then
		verify();
	}

}
