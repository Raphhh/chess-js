test("getPosition", function() {

    var position1 = 'a';
    var position2 = 'b';

    var square1 = new Chess.Board.Square(position1);
    var square2 = new Chess.Board.Square(position2);

    strictEqual(square1.getPosition(), position1);
    strictEqual(square2.getPosition(), position2);

});

test("getPiece before setPiece", function() {

    var square = new Chess.Board.Square({});
    strictEqual(square.getPiece(), null);

});

test("getPiece after setPiece", function() {

    var piece = {};

    var square = new Chess.Board.Square({});
    square.setPiece(piece);

    strictEqual(square.getPiece(), piece);

});

test("getPiece after removePiece", function() {

    var piece = {};

    var square = new Chess.Board.Square({});

    square.setPiece(piece);
    strictEqual(square.getPiece(), piece);

    square.removePiece();
    strictEqual(square.getPiece(), null);

});

test("isValidForNewPiece with empty square", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('rook', Chess.Piece.Color.WHITE, 0);

    var square = new Chess.Board.Square({});
    strictEqual(square.isValidForNewPiece(piece), true);

});

test("isValidForNewPiece with a piece of the other color", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('rook', Chess.Piece.Color.WHITE, 0);

    var square = new Chess.Board.Square({});
    square.setPiece(factory.create('rook', Chess.Piece.Color.BLACK, 0));
    strictEqual(square.isValidForNewPiece(piece), true);

});

test("isValidForNewPiece with a piece of the same color", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('rook', Chess.Piece.Color.WHITE, 0);

    var square = new Chess.Board.Square({});
    square.setPiece(factory.create('rook', Chess.Piece.Color.WHITE, 0));
    strictEqual(square.isValidForNewPiece(piece), false);

});