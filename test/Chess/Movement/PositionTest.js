test("getX", function() {

    var x = 0;
    var y = 1;

    var position1 = new Chess.Movement.Position(x, y);
    var position2 = new Chess.Movement.Position(x + 1, y + 1);

    strictEqual(position1.getX(), x);
    strictEqual(position2.getX(), x + 1);
});

test("getY", function() {

    var x = 0;
    var y = 1;

    var position1 = new Chess.Movement.Position(x, y);
    var position2 = new Chess.Movement.Position(x + 1, y + 1);

    strictEqual(position1.getY(), y);
    strictEqual(position2.getY(), y + 1);
});

test("toAlgebraicNotation", function() {

    var x = 0;
    var y = 1;

    var position = new Chess.Movement.Position(x, y);

    strictEqual(position.toAlgebraicNotation(), 'a2');
});

test("createByAlgebraicNotation", function() {


    var position = Chess.Movement.Position.createByAlgebraicNotation('a2');

    ok(position instanceof Chess.Movement.Position);
    strictEqual(position.getX(), 0);
    strictEqual(position.getY(), 1);
});