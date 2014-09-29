test("construct with not valid color", function() {
    throws(
        function() {
            new Chess.Piece.Color('pink');
        },
        Error,
        'Color value must be Color.BLACK or Color.WHITE'
    );
});

test("getValue", function() {

    var value1 = Chess.Piece.Color.WHITE;
    var value2 = Chess.Piece.Color.BLACK;

    var color1 = new Chess.Piece.Color(value1);
    var color2 = new Chess.Piece.Color(value2);

    strictEqual(color1.getValue(), value1);
    strictEqual(color2.getValue(), value2);
});

test("isBlack true", function() {

    var color = new Chess.Piece.Color(Chess.Piece.Color.BLACK);
    strictEqual(color.isBlack(), true);
});

test("isBlack false", function() {

    var color = new Chess.Piece.Color(Chess.Piece.Color.WHITE);
    strictEqual(color.isBlack(), false);
});

test("isWhite true", function() {

    var color = new Chess.Piece.Color(Chess.Piece.Color.WHITE);
    strictEqual(color.isWhite(), true);
});

test("isBlack false", function() {

    var color = new Chess.Piece.Color(Chess.Piece.Color.BLACK);
    strictEqual(color.isWhite(), false);
});

test("getDirection for black", function() {

    var color = new Chess.Piece.Color(Chess.Piece.Color.BLACK);
    strictEqual(color.getDirection(), -1);
});

test("getDirection for white", function() {

    var color = new Chess.Piece.Color(Chess.Piece.Color.WHITE);
    strictEqual(color.getDirection(), 1);
});