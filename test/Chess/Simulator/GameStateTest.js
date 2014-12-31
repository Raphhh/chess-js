test('getGame', function() {

    var game = new Chess.Game({});

    var gameState = new Chess.Simulator.GameState(game);
    deepEqual(gameState.getGame(), game);

});

test('getMovablePieces', function() {

    var game = new Chess.Game({
        playingColor: 'white',
        pieces: [
            {
                type: 'pawn',
                color: 'white',
                displacementsNumber: 1,
                position: {
                    x: 0,
                    y: 2
                }
            },
            {
                type: 'pawn',
                color: 'white',
                displacementsNumber: 0,
                position: {
                    x: 0,
                    y: 1
                }
            }
        ]
    });

    var gameState = new Chess.Simulator.GameState(game);
    var result = gameState.getMovablePieces();
    strictEqual(result.length, 1);
    strictEqual(result[0].getPiece().getSquare().getPosition().getY(), 2);

});

test('getMovablePieces for dead piece', function() {

    var game = new Chess.Game({
        playingColor: 'white',
        pieces: [
            {
                type: 'pawn',
                color: 'white',
                displacementsNumber: 1

            }
        ]
    });

    var gameState = new Chess.Simulator.GameState(game);
    var result = gameState.getMovablePieces();
    strictEqual(result.length, 0);
});

test('getKingKillers', function() {

    var game = new Chess.Game({
        playingColor: 'white',
        pieces: [
            {
                type: 'pawn',
                color: 'white',
                displacementsNumber: 1,
                position: {
                    x: 0,
                    y: 0
                }
            },
            {
                type: 'pawn',
                color: 'white',
                displacementsNumber: 1,
                position: {
                    x: 2,
                    y: 0
                }
            },
            {
                type: 'king',
                color: 'black',
                displacementsNumber: 1,
                position: {
                    x: 1,
                    y: 1
                }
            }
        ]
    });

    var gameState = new Chess.Simulator.GameState(game);
    var result = gameState.getKingKillers();

    strictEqual(result.length, 2);
    strictEqual(result[0].getPiece().getSquare().getPosition().getX(), 0);
    strictEqual(result[1].getPiece().getSquare().getPosition().getX(), 2);

});