test('getPiece', function() {

    var pieceFactory = new Chess.Piece.PieceFactory();
    var piece = pieceFactory.create('pawn', 'white', 1);

    var movablePiece = new Chess.Simulator.MovablePiece({}, piece, []);
    strictEqual(movablePiece.getPiece(), piece);

});

test('getEligibleSquares', function() {

    var squares = [
        new Chess.Board.Square(),
        new Chess.Board.Square()
    ];

    var movablePiece = new Chess.Simulator.MovablePiece({}, {}, squares);
    var result = movablePiece.getEligibleSquares();

    strictEqual(result.length, squares.length);
    strictEqual(result[0].getSquare(), squares[0]);
    strictEqual(result[1].getSquare(), squares[1]);

});