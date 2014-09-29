test("create", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE, 10);
    ok(piece instanceof Chess.Piece.Type.Pawn);
    ok(piece.getColor() instanceof Chess.Piece.Color);
    strictEqual(piece.getColor().getValue(), Chess.Piece.Color.WHITE);
    strictEqual(piece.getDisplacementsNumber(), 10);

});

test("createByData", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.createByData({type: 'pawn', color: Chess.Piece.Color.WHITE, 'displacementsNumber': 10});
    ok(piece instanceof Chess.Piece.Type.Pawn);
    ok(piece.getColor() instanceof Chess.Piece.Color);
    strictEqual(piece.getColor().getValue(), Chess.Piece.Color.WHITE);
    strictEqual(piece.getDisplacementsNumber(), 10);
});