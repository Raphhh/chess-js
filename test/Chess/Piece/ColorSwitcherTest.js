test('getPlayingColor', function() {
    var color = new Chess.Piece.Color(Chess.Piece.Color.WHITE);
    var switcher = new Chess.Piece.ColorSwitcher(color);
    deepEqual(switcher.getPlayingColor(), color);
});

test('isPlayingColor true', function() {
    var color = new Chess.Piece.Color(Chess.Piece.Color.WHITE);
    var switcher = new Chess.Piece.ColorSwitcher(color);
    strictEqual(switcher.isPlayingColor(new Chess.Piece.Color(Chess.Piece.Color.WHITE)), true);
});

test('isPlayingColor true', function() {
    var color = new Chess.Piece.Color(Chess.Piece.Color.WHITE);
    var switcher = new Chess.Piece.ColorSwitcher(color);
    strictEqual(switcher.isPlayingColor(new Chess.Piece.Color(Chess.Piece.Color.BLACK)), false);
});

test('getNotPlayingColor', function() {
    var color = new Chess.Piece.Color(Chess.Piece.Color.WHITE);
    var switcher = new Chess.Piece.ColorSwitcher(color);
    strictEqual(switcher.isPlayingColor(new Chess.Piece.Color(Chess.Piece.Color.WHITE)), true);

    var result = switcher.getNotPlayingColor();

    strictEqual(switcher.isPlayingColor(new Chess.Piece.Color(Chess.Piece.Color.WHITE)), true);
    strictEqual(result.getValue(), Chess.Piece.Color.BLACK);
});

test('switchColor', function() {
    var color = new Chess.Piece.Color(Chess.Piece.Color.WHITE);
    var switcher = new Chess.Piece.ColorSwitcher(color);
    strictEqual(switcher.isPlayingColor(new Chess.Piece.Color(Chess.Piece.Color.WHITE)), true);
    strictEqual(switcher.isPlayingColor(new Chess.Piece.Color(Chess.Piece.Color.BLACK)), false);
    strictEqual(switcher.getPlayingColor().getValue(), Chess.Piece.Color.WHITE);

    switcher.switchColor();

    strictEqual(switcher.isPlayingColor(new Chess.Piece.Color(Chess.Piece.Color.WHITE)), false);
    strictEqual(switcher.isPlayingColor(new Chess.Piece.Color(Chess.Piece.Color.BLACK)), true);
    strictEqual(switcher.getPlayingColor().getValue(), Chess.Piece.Color.BLACK);
});