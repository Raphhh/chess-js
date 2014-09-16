test("moveOnce", function() {

    var position = new Chess.Movement.Position(1, 1);
    var displacements = [
        new Chess.Movement.Displacement(1, 2)
    ];

    var mover = new Chess.Movement.Mover(position, displacements);
    var result = mover.moveOnce();

    strictEqual(result.getX(), 2);
    strictEqual(result.getY(), 3);

});

test("getCurrentDisplacement withchangeDirection", function() {

    var position = new Chess.Movement.Position(1, 1);
    var displacements = [
        new Chess.Movement.Displacement(1, 2),
        new Chess.Movement.Displacement(2, 3)
    ];

    var mover = new Chess.Movement.Mover(position, displacements);

    strictEqual(mover.getCurrentDisplacement(), displacements[0]);

    mover.changeDirection();
    strictEqual(mover.getCurrentDisplacement(), displacements[1]);

    mover.changeDirection();
    strictEqual(mover.getCurrentDisplacement(), null);

});

test("moveOnce with change position", function() {

    var position = new Chess.Movement.Position(1, 1);
    var displacements = [
        new Chess.Movement.Displacement(1, 2),
        new Chess.Movement.Displacement(2, 3),
        new Chess.Movement.Displacement(3, 4)
    ];

    var mover = new Chess.Movement.Mover(position, displacements);

    mover.changeDirection();
    var result = mover.moveOnce();
    strictEqual(result.getX(), 3);
    strictEqual(result.getY(), 4);

    mover.changeDirection();
    result = mover.moveOnce();
    strictEqual(result.getX(), 4);
    strictEqual(result.getY(), 5);

    mover.changeDirection();
    result = mover.moveOnce();
    strictEqual(result, null);
});