const Scrabble = require('../scrabble');

describe('score', () => {
  test('is defined', () => {
    expect(Scrabble.score).toBeDefined();
  });

  test('correctly scores simple words', () => {
    expect(Scrabble.score('dog')).toBe(5);
    expect(Scrabble.score('cat')).toBe(5);
    expect(Scrabble.score('pig')).toBe(6);
  });

  test('adds 50 points for a 7-letter word', () => {
    expect(Scrabble.score('academy')).toBe(65);
  });

  test('throws on bad characters', () => {
    expect(() => {
      Scrabble.score('char^');
    }).toThrow();
  });

  test('handles all upper- and lower-case letters', () => {
    expect(Scrabble.score('dog')).toBe(5);
    expect(Scrabble.score('DOG')).toBe(5);
    expect(Scrabble.score('DoG')).toBe(5);
  });

  test('does not allow words > 7 letters', () => {
    expect(() => { Scrabble.score('abcdefgh'); }).toThrow();
  });

  test('does not allow empty words', () => {
    expect(() => { Scrabble.score(''); }).toThrow();
  });
});

describe('highestScoreFrom', () => {
  test('is defined', () => {
    expect(Scrabble.highestScoreFrom).toBeDefined();
  });

  test('throws if no words were passed', () => {
    expect(() => { Scrabble.highestScoreFrom([]); }).toThrow();
    expect(() => { Scrabble.highestScoreFrom('not array'); }).toThrow();
  });

  test('returns the only word in a length-1 array', () => {
    expect(Scrabble.highestScoreFrom(['dog'])).toBe('dog');
  });

  test('returns the highest word if there are two words', () => {
    // Check score assumptions
    expect(Scrabble.score('dog')).toBe(5);
    expect(Scrabble.score('pig')).toBe(6);

    // Test the functionality
    expect(Scrabble.highestScoreFrom(['dog', 'pig'])).toBe('pig');
    expect(Scrabble.highestScoreFrom(['pig', 'dog'])).toBe('pig');
  });

  test('if tied, prefer a word with 7 letters', () => {
    const loser = 'zzzzzz';
    const winner = 'iiiiddd';

    // Check score assumptions
    expect(Scrabble.score(loser)).toBe(60);
    expect(Scrabble.score(winner)).toBe(60);

    // Test functionality
    expect(Scrabble.highestScoreFrom([loser, winner])).toBe(winner);
    expect(Scrabble.highestScoreFrom([winner, loser])).toBe(winner);
  });

  test('if tied and no word has 7 letters, prefers the word with fewer letters', () => {
    // Check score assumptions
    expect(Scrabble.score('dog')).toBe(5);
    expect(Scrabble.score('goat')).toBe(5);

    // Test functionality
    expect(Scrabble.highestScoreFrom(['dog', 'goat'])).toBe('dog');
    expect(Scrabble.highestScoreFrom(['goat', 'dog'])).toBe('dog');
  });

  test('returns the first word of a tie with same letter count', () => {
    // Check score assumptions
    expect(Scrabble.score('i')).toBe(1);
    expect(Scrabble.score('dog')).toBe(5);
    expect(Scrabble.score('cat')).toBe(5);

    // Test the functionality
    expect(Scrabble.highestScoreFrom(['dog', 'dog'])).toBe('dog');
    expect(Scrabble.highestScoreFrom(['dog', 'cat'])).toBe('dog');
    expect(Scrabble.highestScoreFrom(['cat', 'dog'])).toBe('cat');
    expect(Scrabble.highestScoreFrom(['i', 'dog', 'cat'])).toBe('dog');
  });
});

describe('Player', () => {
  test('is defined', () => {
    expect(Scrabble.Player).toBeDefined();
  });

  describe('Constructor', () => {
    test('Creates a new player', () => {
      const name = 'test name';
      const player = new Scrabble.Player(name);

      expect(player.name).toBe(name);
    });

    test('Requires a name', () => {
      expect(() => {
        new Scrabble.Player();
      }).toThrow();
    });
  });

  describe('play', () => {
    test('Records the played word', () => {
      const word = 'dog';
      const player = new Scrabble.Player('test player');

      expect(player.plays.length).toBe(0);

      expect(player.play(word)).toBeTruthy();

      expect(player.plays.length).toBe(1);
      expect(player.plays[0]).toBe(word);
    });

    test('Requires a real word', () => {
      const player = new Scrabble.Player('test player');

      expect(player.plays.length).toBe(0);

      expect(() => { player.play(); }).toThrow();
      expect(player.plays.length).toBe(0);

      expect(() => { player.play(44); }).toThrow();
      expect(player.plays.length).toBe(0);
    });

    test('Returns false and does not update plays if the player has already won', () => {
      const player = new Scrabble.Player('test player');

      expect(player.play('zzzzzzz')).toBeTruthy(); // +120 pts
      expect(player.plays.length).toBe(1);
      expect(player.hasWon()).toBeTruthy();

      expect(player.play('dog')).toBe(false);
      expect(player.plays.length).toBe(1);
    });
  });

  describe('totalScore', () => {
    test('Is zero if the player has not played anything', () => {
      const player = new Scrabble.Player('test player');

      expect(player.totalScore()).toBe(0);
    });

    test('Is updated by play', () => {
      // Arrange
      const player = new Scrabble.Player('test player');
      const words = [{word: 'dog', score: 5}, {word: 'cat', score: 5}, {word: 'goat', score: 5}];
      let totalScore = 0;

      expect(player.totalScore()).toBe(0);
      words.forEach((testWords) => {
        // Act
        player.play(testWords.word);
        totalScore += testWords.score;

        // Assert
        expect(player.totalScore()).toBe(totalScore);
      });

    });
  });

  describe('hasWon', () => {
    test('returns false when score < 100', () => {
      const player = new Scrabble.Player('test player');
      player.play('pig')
      expect(player.hasWon()).toBe(false);

    });

    test('returns true when score == 100', () => {
      const player = new Scrabble.Player('test player');

      player.plays = ['zzzzz', 'zzzzz' ]

      expect(player.hasWon()).toBe(true);
    });

    test('returns true when score > 100', () => {
      const player = new Scrabble.Player('test player');

      player.plays = ['zzzzz', 'zzzzz', 'zzzzz' ]

      expect(player.hasWon()).toBe(true);

    });
  });

  describe('highestScoringWord', () => {
    // Tie-breaking logic is already described in the tests
    // for highestWordFrom, so we will not repeat it here.
    test('returns the highest scoring word played', () => {
      const player = new Scrabble.Player('test player');

      player.plays = ['dog', 'pig', 'zzzzz'];
      expect(player.highestScoringWord()).toBe('zzzzz');

    });

    test('throws an error if no words have been played', () => {
      const player = new Scrabble.Player('test player');
      expect(() => { player.highestScoringWord(); }).toThrow();
    });
  });

  describe('highestWordScore', () => {
    test('returns the score of the highest scoring word played', () => {
      const player = new Scrabble.Player('test player');

      player.plays = ['dog', 'pig', 'zzzzz'];
      expect(player.highestWordScore()).toBe(50);

    });

    test('throws an error if no words have been played', () => {
      const player = new Scrabble.Player('test player');
      expect(() => { player.highestScoringWord(); }).toThrow();

    });
  });

  describe('drawTiles', () => {
    test('it throws an error if players hand is already 7 tiles', () => {
      const player = new Scrabble.Player('test player');
      player.hand = ['a', 'a', 'v', 'l', 'h', 'l', 'o'];
      expect(() => { player.drawTiles(); }).toThrow();
    });

    test('increases length of players hand to 7', () => {
      const player = new Scrabble.Player('test player');

      player.hand = ['o', 'e', 'x'];
      player.drawTiles()
      expect(player.hand.length).toBe(7);

    });

    test('decreases the length of board by the same amount as it increases players hand', () => {
      const player = new Scrabble.Player('test player');

      player.hand = ['o', 'e', 'x'];
      let length = Scrabble.board.length

      player.drawTiles()
      expect(player.hand.length).toBe(7);
      expect(Scrabble.board.length).toBe(length - 4);

    });
  });
});
