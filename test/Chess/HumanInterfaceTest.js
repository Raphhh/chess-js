var getInitDataForHumanInterface = function() {
    return {
        pieces: [
            {
                "type": "pawn",
                "color": "white",
                "position": {
                    "x": 0,
                    "y": 1
                }
            }
        ]
    };
};

test("move", function() {

    expect(6);

    var game = new Chess.Game(getInitDataForHumanInterface());
    game.getCoordinator = function() {
        return {
            moveTo: function(piece, position) {

                ok(piece instanceof Chess.Piece.Piece);
                strictEqual(piece.getSquare().getPosition().getX(), 0);
                strictEqual(piece.getSquare().getPosition().getY(), 1);

                ok(position instanceof Chess.Movement.Position);
                strictEqual(position.getX(), 0);
                strictEqual(position.getY(), 2);
            }
        };
    };

    var interfacer = new Chess.HumanInterface(game);
    interfacer.move('a2', 'a3');

});

test("getEligibleSquares", function() {

    var game = new Chess.Game(getInitDataForHumanInterface());
    var interfacer = new Chess.HumanInterface(game);

    var result = interfacer.getEligibleSquares('a2');
    deepEqual(result, ['a3', 'a4']);
});