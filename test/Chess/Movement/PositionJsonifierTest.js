var positionJson = {x: 1, y: 2};
var positionObject = new Chess.Movement.Position(1, 2);

test('exportToJson', function() {
    var jsonifier = new Chess.Movement.PositionJsonifier();
    deepEqual(jsonifier.exportToJson(positionObject), positionJson);
});

test('importFromJson', function() {
    var jsonifier = new Chess.Movement.PositionJsonifier();
    deepEqual(jsonifier.importFromJson(positionJson), positionObject);
});