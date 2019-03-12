package com.roman.mysan.bol.com.game.service;

import com.roman.mysan.bol.com.game.domain.Connection;
import com.roman.mysan.bol.com.game.domain.Game;
import com.roman.mysan.bol.com.game.domain.Game.GameStatus;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import static com.roman.mysan.bol.com.game.service.GameService.DESTINATION_MESSAGE_URL;
import static org.junit.Assert.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.initMocks;

public class GameServiceTest {

	@Mock
	private SimpMessagingTemplate simpMessagingTemplate;
	private Map<String, Game> games;
	private GameService gameService;
	private static final String GAME_ID = "gameId";
	private static final String FIRST_PLAYER = "firstPlayer";
	private static final String SECOND_PLAYER = "secondPlayer";

	@Before
	public void setup() {
		initMocks(this);
		games = new HashMap<>();
		games.put(GAME_ID, Game.builder().status(GameStatus.WAITING).gameId(GAME_ID).build());
		gameService = new GameService(games, simpMessagingTemplate);
	}

	@Test
	public void should_add_players_to_the_game() {
		//given
		Connection firstPlayerConnection = new Connection(GAME_ID, FIRST_PLAYER);
		int messages = 2;

		//when
		gameService.connectTo(firstPlayerConnection);

		//then
		Game game = games.get(GAME_ID);
		assertNotNull(game.getFirstPlayer());
		assertNull(game.getSecondPlayer());
		assertEquals(game.getStatus(), GameStatus.WAITING);
		assertEquals(game.getFirstPlayer().getUsername(), FIRST_PLAYER);

		//given
		Connection secondPlayerConnection = new Connection(GAME_ID, SECOND_PLAYER);

		//when
		gameService.connectTo(secondPlayerConnection);

		//then
		assertNotNull(game.getFirstPlayer());
		assertNotNull(game.getSecondPlayer());
		assertEquals(game.getSecondPlayer().getUsername(), SECOND_PLAYER);
		assertEquals(game.getStatus(), GameStatus.READY);

		verify(simpMessagingTemplate, times(messages)).convertAndSendToUser(GAME_ID, DESTINATION_MESSAGE_URL, games.get(GAME_ID));
	}

	@Test(expected = NoSuchElementException.class)
	public void should_throw_exception_when_game_with_given_id_not_found() {
		//given
		Connection connection = new Connection("", FIRST_PLAYER);

		//when
		gameService.connectTo(connection);

		//then throws exception
	}
}
