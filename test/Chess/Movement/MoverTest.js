test("moveOnce", function() {

    var position = new Chess.Movement.Position(1, 1);
    var displacements = [
        new Chess.Movement.Displacement(1, 2)
    ];

    var mover = new Chess.Movement.Mover(position, displacements);
    var result = mover.moveOnce(false);

    strictEqual(result.getX(), 2);
    strictEqual(result.getY(), 3);

});

test("moveOnce with change position", function() {

    var position = new Chess.Movement.Position(1, 1);
    var displacements = [
        new Chess.Movement.Displacement(1, 2),
        new Chess.Movement.Displacement(2, 3),
        new Chess.Movement.Displacement(3, 4)
    ];

    var mover = new Chess.Movement.Mover(position, displacements);

    var result = mover.moveOnce(true);
    strictEqual(result.getX(), 3);
    strictEqual(result.getY(), 4);

    result = mover.moveOnce(true);
    strictEqual(result.getX(), 4);
    strictEqual(result.getY(), 5);

    result = mover.moveOnce(true);
    strictEqual(result, null);
});