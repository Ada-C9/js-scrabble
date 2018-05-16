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
      const word = 'dog';
      const player = new Scrabble.Player('test player');
      expect(player.play(word)).toBeTruthy();
      expect(player.plays.length).toBe(1);
      expect(player.hasWon()).toBe(false);
    });

    test('returns true when score == 100', () => {
      const player = new Scrabble.Player('test player');
      const word = 'zzzzz';
      const word2 = 'qqqqq';
      expect(player.play(word)).toBeTruthy();
      expect(player.play(word2)).toBeTruthy();
      expect(player.plays.length).toBe(2);
      expect(player.totalScore()).toBe(100);
      expect(player.hasWon()).toBeTruthy();
    });

    test('returns true when score > 100', () => {
      const player = new Scrabble.Player('test player');
      const word = 'jukebox';
      const word2 = 'quizzes';
      expect(player.play(word)).toBeTruthy();
      expect(player.play(word2)).toBeTruthy();
      expect(player.totalScore()).toBeGreaterThan(100);
      expect(player.hasWon()).toBeTruthy();
    });
  });

  describe('highestScoringWord', () => {
    // Tie-breaking logic is already described in the tests
    // for highestWordFrom, so we will not repeat it here.
    test('returns the highest scoring word played', () => {
      const player = new Scrabble.Player('test player');
      const word = 'jukebox';
      const word2 = 'dog';
      expect(player.play(word)).toBeTruthy();
      expect(player.play(word2)).toBeTruthy();
      expect(player.highestScoringWord()).toEqual(word);
    });

    test('throws an error if no words have been played', () => {
      const player = new Scrabble.Player('test player');
      expect(player.plays.length).toBe(0);
      expect(() => { player.highestScoringWord(); }).toThrow();
    });
  });

  describe('highestWordScore', () => {
    test('returns the score of the highest scoring word played', () => {
      const player = new Scrabble.Player('test player');
      const word = 'zzzzz';
      const word2 = 'dog';
      expect(player.play(word)).toBeTruthy();
      expect(player.play(word2)).toBeTruthy();
      expect(player.highestWordScore()).toEqual(50);
    });

    test('throws an error if no words have been played', () => {
      const player = new Scrabble.Player('test player');
      expect(player.plays.length).toBe(0);
      expect(() => { player.highestWordScore(); }).toThrow();
    });
  });
});

describe('TileBag', () => {
  test('is defined', () => {
    expect(Scrabble.TileBag).toBeDefined();
  });

  describe('Constructor', () => {
    test('Creates a new TileBag instance', () => {
      const myBag = new Scrabble.TileBag();
      expect(myBag).toBeDefined();
    });
  });

  describe('drawTile', () => {
    test('is defined', () => {
      const myBag = new Scrabble.TileBag();
      expect(myBag.drawTile).toBeDefined();
    });

    test('drawTile returns letter (as string) & count descreases', () => {
      const myBag = new Scrabble.TileBag();
      const num = 5;
      expect(myBag.remainingTiles()).toEqual(98);
      // expect(myBag.drawTile()).toMatch(/\w{1}/);
      expect(myBag.drawTile(num).length).toEqual(num);
      expect(myBag.remainingTiles()).toEqual(98 - num);
    });

    test('throws an error if there is no parameter given', () => {
      const myBag = new Scrabble.TileBag();
      expect(() => { myBag.drawTile(); }).toThrow();
    });

    // throws error for more than 7 letters
    test('throws error for more than 7 letters', () => {
      const myBag = new Scrabble.TileBag();
      expect(() => { myBag.drawTile(8); }).toThrow();
    });

    // throws error if there are no more tiles to draw
    test('throws error if there are no more tiles to draw', () => {
      const myBag = new Scrabble.TileBag();
      const num = 7;
      for (let i = 0; i < 14; i++){
        expect(myBag.drawTile(num).length).toEqual(num);
      }
      expect(() => { myBag.drawTile(1); }).toThrow();
    });
  });

  describe('remainingTiles', () => {
    test('is defined', () => {
      const myBag = new Scrabble.TileBag();
      expect(myBag.remainingTiles).toBeDefined();
    });

    // returns 0 when there are no more tiles
    test('returns 0 if there are no more tiles', () => {
      const myBag = new Scrabble.TileBag();
      const num = 7;
      for (let i = 0; i < 14; i++){
        expect(myBag.drawTile(num).length).toEqual(num);
      }
      expect(myBag.remainingTiles()).toEqual(0);
    });
  });


});
