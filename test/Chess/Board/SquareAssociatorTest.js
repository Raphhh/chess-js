test("validDestinationSquare throws error", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'white', 0);

    var square = new Chess.Board.Square();
    square.setPiece(piece);

    var associator = new Chess.Board.SquareAssociator(piece, square);

    throws(
        function() {
            associator.validDestinationSquare();
        },
        Error,
        'Square is not valid for the piece'
    );

});

test("validDestinationSquare with empty square", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'white', 0);

    var square = new Chess.Board.Square();

    var associator = new Chess.Board.SquareAssociator(piece, square);
    strictEqual(associator.validDestinationSquare(), undefined);

});

test("validDestinationSquare with valid square", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'white', 0);

    var square = new Chess.Board.Square();
    square.setPiece(factory.create('pawn', 'black', 0));

    var associator = new Chess.Board.SquareAssociator(piece, square);
    strictEqual(associator.validDestinationSquare(), undefined);

});

test("cleanOriginSquare with empty piece", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'white', 0);

    var square = new Chess.Board.Square();

    strictEqual(piece.getSquare(), null);

    var associator = new Chess.Board.SquareAssociator(piece, square);
    associator.cleanOriginSquare();

    strictEqual(piece.getSquare(), null);

});

test("cleanOriginSquare with square", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'white', 0);


    var square = new Chess.Board.Square();
    square.setPiece(piece);

    piece.setSquare(square);
    strictEqual(piece.getSquare().getPiece(), piece);

    var associator = new Chess.Board.SquareAssociator(piece, square);
    strictEqual(associator.cleanOriginSquare(), undefined);

    ok(piece.getSquare());
    strictEqual(piece.getSquare().getPiece(), null);
});

test("cleanDestinationSquare with empty square", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'white', 0);

    var square = new Chess.Board.Square();
    square.setPiece(piece);

    strictEqual(square.getPiece(), piece);

    var associator = new Chess.Board.SquareAssociator(piece, square);
    associator.cleanDestinationSquare();

    strictEqual(square.getPiece(), null);

});

test("cleanDestinationSquare with piece", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'white', 0);

    var square = new Chess.Board.Square();
    square.setPiece(piece);
    piece.setSquare(square);

    strictEqual(square.getPiece(), piece);
    strictEqual(piece.getSquare(), square);

    var associator = new Chess.Board.SquareAssociator(piece, square);
    associator.cleanDestinationSquare();

    strictEqual(square.getPiece(), null);
    strictEqual(piece.getSquare(), null);

});

test("associate", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'white', 0);

    var square = new Chess.Board.Square();

    strictEqual(square.getPiece(), null);
    strictEqual(piece.getSquare(), null);

    var associator = new Chess.Board.SquareAssociator(piece, square);
    associator.associate();

    strictEqual(square.getPiece(), piece);
    strictEqual(piece.getSquare(), square);

});

test("run", function() {

    //set piece
    var oldSquare = new Chess.Board.Square();
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'white', 0);
    piece.setSquare(oldSquare);
    oldSquare.setPiece(piece);

    strictEqual(piece.getSquare(), oldSquare);
    strictEqual(oldSquare.getPiece(), piece);

    //set the new square of the piece
    var oldPiece = factory.create('pawn', 'black', 0);
    var square = new Chess.Board.Square();
    square.setPiece(oldPiece);
    oldPiece.setSquare(square);

    strictEqual(square.getPiece(), oldPiece);
    strictEqual(oldPiece.getSquare(), square);

    //run
    var associator = new Chess.Board.SquareAssociator(piece, square);
    associator.run();

    //assert for the piece and its old square
    strictEqual(piece.getSquare(), square);
    strictEqual(oldSquare.getPiece(), null);

    //assert for the square and its old piece
    strictEqual(square.getPiece(), piece);
    strictEqual(oldPiece.getSquare(), null);

});