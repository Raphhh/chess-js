var pieceJson = {
    type: 'pawn',
    color: Chess.Piece.Color.WHITE,
    'displacementsNumber': 10
};

var getPieceObject = function() {
    var factory = new Chess.Piece.PieceFactory();
    return factory.create('pawn', Chess.Piece.Color.WHITE, 10);
};

test("importFromJson", function() {

    var jsonifier = new Chess.Piece.PieceJsonifier();
    deepEqual(jsonifier.importFromJson(pieceJson), getPieceObject());

});


test("exportToJson", function() {

    var jsonifier = new Chess.Piece.PieceJsonifier();
    deepEqual(jsonifier.exportToJson(getPieceObject()), pieceJson);

});
