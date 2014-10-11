test('createGameState without new playing color', function() {

    var game = new Chess.Game({});

    var builder = new Chess.Simulator.GameStateBuilder();
    builder.createGameState(game);
    var result = builder.getGameState();

    deepEqual(result.getGame().exportToJson(), game.exportToJson());
    notStrictEqual(result.getGame(), game);
    deepEqual(result.getGame().exportToJson(), {
        playingColor: 'white',
        pieces: []
    });

});

test('createGameState with new playing color', function() {

    var game = new Chess.Game({});

    var builder = new Chess.Simulator.GameStateBuilder();
    builder.createGameState(game, new Chess.Piece.Color(Chess.Piece.Color.BLACK));
    var result = builder.getGameState();

    deepEqual(result.getGame().exportToJson(), {
        playingColor: 'black',
        pieces: []
    });

});

test('changePiecePosition', function() {

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
            }
        ]
    });

    var builder = new Chess.Simulator.GameStateBuilder();
    builder.createGameState(game);
    builder.changePiecePosition(game.getBoard().getPieces()[0], new Chess.Movement.Position(0, 3));

    var result = builder.getGameState();

    deepEqual(game.exportToJson(), {
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
            }
        ]
    });

    deepEqual(result.getGame().exportToJson(), {
        playingColor: 'black', //changed
        pieces: [
            {
                type: 'pawn',
                color: 'white',
                displacementsNumber: 2,//changed
                position: {
                    x: 0,
                    y: 3 //changed
                }
            }
        ]
    });

});