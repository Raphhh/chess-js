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