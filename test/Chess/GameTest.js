var getInitData = function() {
    return {
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
};

test("getBoard", function() {

    var game = new Chess.Game(getInitData());

    strictEqual(game.getBoard().getPieces().length, 1);
    strictEqual(game.getBoard().getPieces()[0].getColor().getValue(), 'black');
    strictEqual(game.getBoard().getPieces()[0].getSquare().getPosition().getX(), 4);
    strictEqual(game.getBoard().getPieces()[0].getSquare().getPosition().getY(), 7);
    strictEqual(game.getBoard().getPieces()[0].getDisplacementsNumber(), 1);
});

test("getCoordinator", function() {

    var game = new Chess.Game(getInitData());
    strictEqual(game.getCoordinator().__internal__.board, game.getBoard());
    strictEqual(game.getCoordinator().getPlayingColor().getValue(), Chess.Piece.Color.BLACK);

});