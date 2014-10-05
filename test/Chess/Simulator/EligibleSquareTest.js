test('getSquare', function() {

    var square = new Chess.Board.Square();

    var eligibleSquare = new Chess.Simulator.EligibleSquare({}, {}, square);
    strictEqual(eligibleSquare.getSquare(), square);

});

test('getGameState', function() {

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

    var eligibleSquare = new Chess.Simulator.EligibleSquare(
        game,
        game.getBoard().getPieceByPosition(new Chess.Movement.Position(0, 2)),
        game.getBoard().getSquareByPosition(new Chess.Movement.Position(0, 3))
    );
    var result = eligibleSquare.getGameState();

    deepEqual(game.exportToJson(), { //no change
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

    deepEqual(result.getGame().exportToJson(), {
        playingColor: 'black',//changed
        pieces: [
            {
                type: 'pawn',
                color: 'white',
                displacementsNumber: 2, //changed
                position: {
                    x: 0,
                    y: 3 //changed
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
    })

});