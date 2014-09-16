test('getX', function() {
    var x = 1;
    var y = 2;
    var isExtensible = true;
    var displacement = new Chess.Movement.Displacement(x, y, isExtensible);

    strictEqual(displacement.getX(), x);
});

test('getY', function() {
    var x = 1;
    var y = 2;
    var isExtensible = true;
    var displacement = new Chess.Movement.Displacement(x, y, isExtensible);

    strictEqual(displacement.getY(), y);
});

test('isExtensible', function() {
    var x = 1;
    var y = 2;
    var isExtensible = true;
    var displacement = new Chess.Movement.Displacement(x, y, isExtensible);

    strictEqual(displacement.isExtensible(), isExtensible);
});


test('isExtensible with callback', function() {
    var x = 1;
    var y = 2;
    var isExtensible = function() {
        return false;
    };
    var displacement = new Chess.Movement.Displacement(x, y, isExtensible);

    strictEqual(displacement.isExtensible(), false);
});

test('isValid with default callback', function() {
    var x = 1;
    var y = 2;
    var isExtensible = true;
    var displacement = new Chess.Movement.Displacement(x, y, isExtensible);

    strictEqual(displacement.isValid(), true);
});

test('isValid with callback', function() {
    var square = 'a';
    var x = 1;
    var y = 2;
    var isExtensible = true;
    var displacement = new Chess.Movement.Displacement(x, y, isExtensible, function(square) {
        return square;
    });

    strictEqual(displacement.isValid(square), square);
});