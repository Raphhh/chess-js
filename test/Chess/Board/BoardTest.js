test("getSquareByPosition with last square", function() {

    var board = new Chess.Board.Board();
    ok(board.getSquareByPosition(new Chess.Movement.Position(7, 7)) instanceof Chess.Board.Square);

});

test("getSquareByPosition out of board", function() {

    var board = new Chess.Board.Board();
    throws(
        function() {
            board.getSquareByPosition(new Chess.Movement.Position(8, 8));
        },
        Error,
        'Position x (8) out of board'
    );

});

test("getSquareByPosition with last square", function() {

    var board = new Chess.Board.Board();
    ok(board.getSquareByPosition(new Chess.Movement.Position(7, 7)) instanceof Chess.Board.Square);

});

test("changePiecePosition", function() {

    var board = new Chess.Board.Board();
    var oldSquare = board.getSquareByPosition(new Chess.Movement.Position(0, 0));
    var newSquare = board.getSquareByPosition(new Chess.Movement.Position(1, 1));

    //set the current piece
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'white', 0);
    piece.setSquare(oldSquare);
    oldSquare.setPiece(piece);

    strictEqual(piece.getSquare(), oldSquare);
    strictEqual(oldSquare.getPiece(), piece);

    //set the new square of the piece
    var oldPiece = factory.create('pawn', 'black', 0);
    newSquare.setPiece(oldPiece);
    oldPiece.setSquare(newSquare);

    strictEqual(newSquare.getPiece(), oldPiece);
    strictEqual(oldPiece.getSquare(), newSquare);

    //act
    board.changePiecePosition(piece, new Chess.Movement.Position(1, 1));

    //assert for the piece and its old square
    strictEqual(piece.getSquare(), newSquare);
    strictEqual(oldSquare.getPiece(), null);

    //assert for the square and its old piece
    strictEqual(newSquare.getPiece(), piece);
    strictEqual(oldPiece.getSquare(), null);

});

test("addPiece", function() {

    var position = new Chess.Movement.Position(0, 0);
    var board = new Chess.Board.Board();
    var square = board.getSquareByPosition(position);

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'white', 0);

    strictEqual(piece.getSquare(), null);
    strictEqual(square.getPiece(), null);

    board.addPiece(piece, position);

    strictEqual(piece.getSquare(), square);
    strictEqual(square.getPiece(), piece);

});

test("getPieces", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'white', 0);

    var board = new Chess.Board.Board();
    deepEqual(board.getPieces(), []);

    board.addPiece(piece, new Chess.Movement.Position(0, 0));
    deepEqual(board.getPieces(), [piece]);

});

test("getPieceByPosition", function() {

    var position = new Chess.Movement.Position(0, 0);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'white', 0);

    var board = new Chess.Board.Board();
    strictEqual(board.getPieceByPosition(position), null);

    board.addPiece(piece, position);
    strictEqual(board.getPieceByPosition(position), piece);
});

test("initPieces", function() {

    var position = new Chess.Movement.Position(0, 0);

    var board = new Chess.Board.Board();
    deepEqual(board.getPieceByPosition(position), null);

    board.initPieces([
        {
            "type": "pawn",
            "color": "black",
            "position": {
                "x": position.getX(),
                "y": position.getY()
            }
        }
    ]);


    var piece = board.getPieceByPosition(position);
    ok(piece instanceof Chess.Piece.Type.Pawn);
    strictEqual(piece.getColor().getValue(), 'black');
    deepEqual(piece.getSquare().getPosition(), position);
});