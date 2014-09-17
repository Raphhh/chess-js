test("getColor", function() {

    var color1 = 'a';
    var color2 = 'b';

    var piece1 = new Chess.Piece.Piece(color1);
    var piece2 = new Chess.Piece.Piece(color2);

    strictEqual(piece1.getColor(), color1);
    strictEqual(piece2.getColor(), color2);
});

test("getName", function() {

    var piece = new Chess.Piece.Piece(null);

    strictEqual(piece.getName(), '');
});

test("getSquare before setSquare", function() {

    var piece = new Chess.Piece.Piece();

    strictEqual(piece.getSquare(), null);
});

test("getSquare after setSquare", function() {

    var square = 'a';

    var piece = new Chess.Piece.Piece();
    piece.setSquare(square);

    strictEqual(piece.getSquare(), square);
});

test("getSquare after die", function() {

    var square = 'a';

    var piece = new Chess.Piece.Piece();
    piece.setSquare(square);

    strictEqual(piece.getSquare(), square);

    piece.die();

    strictEqual(piece.getSquare(), null);
});

test("getDisplacementsSuite", function() {

    var piece = new Chess.Piece.Piece(null);

    deepEqual(piece.getDisplacementsSuite(), []);
});

test("getDisplacementsNumber", function() {

    var displacementNumber = 12;
    var piece = new Chess.Piece.Piece(null, displacementNumber);

    deepEqual(piece.getDisplacementsNumber(), displacementNumber);
});


test("getDisplacementsNumber with default value", function() {

    var displacementNumber = 12;
    var piece = new Chess.Piece.Piece(null);

    deepEqual(piece.getDisplacementsNumber(), 0);
});

test("incrementDisplacementsNumber", function() {

    var displacementNumber = 12;
    var piece = new Chess.Piece.Piece(null, displacementNumber);
    piece.incrementDisplacementsNumber();
    deepEqual(piece.getDisplacementsNumber(), displacementNumber + 1);
});