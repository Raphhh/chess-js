test("inheritance of Piece", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE, 0);
    ok(piece instanceof Chess.Piece.Piece);
    ok(piece instanceof Chess.Piece.Type.Pawn);

});

test("getColor (test if we call the parent constructor)", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE, 0);
    strictEqual(piece.getColor().getValue(), Chess.Piece.Color.WHITE);

});

test("getName", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE, 0);
    strictEqual(piece.getName(), 'P');

});
