test("inheritance of Piece", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'color');
    ok(piece instanceof Chess.Piece.Piece);
    ok(piece instanceof Chess.Piece.Type.Pawn);

});

test("getColor (test if we call the parent constructor)", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'color');
    strictEqual(piece.getColor().getValue(), 'color');

});

test("getName", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'color');
    strictEqual(piece.getName(), 'P');

});
