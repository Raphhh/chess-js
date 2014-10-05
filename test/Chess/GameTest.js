var initData = {
    playingColor: 'black',
    pieces: [
        {
            "type": "king",
            "color": "black",
            "position": {
                "x": 4,
                "y": 7
            },
            "displacementsNumber": 1
        }
    ]
};


test("getBoard", function() {

    var game = new Chess.Game(initData);

    strictEqual(game.getBoard().getPieces().length, 1);
    strictEqual(game.getBoard().getPieces()[0].getColor().getValue(), 'black');
    strictEqual(game.getBoard().getPieces()[0].getSquare().getPosition().getX(), 4);
    strictEqual(game.getBoard().getPieces()[0].getSquare().getPosition().getY(), 7);
    strictEqual(game.getBoard().getPieces()[0].getDisplacementsNumber(), 1);
});

test("getCoordinator", function() {

    var game = new Chess.Game(initData);
    strictEqual(game.getCoordinator().__internal__.board, game.getBoard());
    strictEqual(game.getCoordinator().getPlayingColor().getValue(), Chess.Piece.Color.BLACK);

});

test("exportToJson", function() {

    var game = new Chess.Game(initData);
    game.getCoordinator().moveTo(game.getBoard().getPieces()[0], new Chess.Movement.Position(5, 7));
    deepEqual(game.exportToJson(), {
        playingColor: 'white',
        pieces: [
            {
                "type": "king",
                "color": "black",
                "position": {
                    "x": 5,
                    "y": 7
                },
                "displacementsNumber": 2
            }
        ]
    });

});

test("isInCheck true", function() {

    var game = new Chess.Game({
        playingColor: 'black',
        pieces: [
            {
                "type": "king",
                "color": "black",
                "position": {
                    "x": 7,
                    "y": 7
                },
                "displacementsNumber": 2
            },
            {
                "type": "queen",
                "color": "white",
                "position": {
                    "x": 6,
                    "y": 6
                },
                "displacementsNumber": 2
            }
        ]
    });
    strictEqual(game.isInCheck(), true);

});

test("isInCheck false", function() {

    var game = new Chess.Game({
        playingColor: 'black',
        pieces: [
            {
                "type": "king",
                "color": "black",
                "position": {
                    "x": 7,
                    "y": 7
                },
                "displacementsNumber": 2
            },
            {
                "type": "pawn",
                "color": "white",
                "position": {
                    "x": 1,
                    "y": 1
                },
                "displacementsNumber": 2
            }
        ]
    });
    strictEqual(game.isInCheck(), false);

});