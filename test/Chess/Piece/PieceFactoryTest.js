test("create", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'color');
    ok(piece instanceof Chess.Piece.Type.Pawn);
    ok(piece.getColor() instanceof Chess.Piece.Color);
    strictEqual(piece.getColor().getValue(), 'color');

});

test("createByData", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.createByData({type: 'pawn', color: 'color'});
    ok(piece instanceof Chess.Piece.Type.Pawn);
    ok(piece.getColor() instanceof Chess.Piece.Color);
    strictEqual(piece.getColor().getValue(), 'color');
});