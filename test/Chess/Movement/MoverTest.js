test("moveOnce", function() {

    var position = new Chess.Movement.Position(1, 1);
    var displacements = [
        {x: 1, y: 2}
    ];

    var mover = new Chess.Movement.Mover(position, displacements);
    var result = mover.moveOnce(false);

    strictEqual(result.getX(), 2);
    strictEqual(result.getY(), 3);

});

test("moveOnce with change position", function() {

    var position = new Chess.Movement.Position(1, 1);
    var displacements = [
        {x: 1, y: 2},
        {x: 2, y: 3},
        {x: 3, y: 4}
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