var getInitData = function() {
    return {
        pieces: [
            {
                "type": "king",
                "color": "black",
                "position": {
                    "x": 4,
                    "y": 7
                }
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
});

test("getCoordinator", function() {

    var game = new Chess.Game(getInitData());
    strictEqual(game.getCoordinator().__internal__.board, game.getBoard());

});