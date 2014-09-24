test('isPawnDoubleSquareDisplacement for white', function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);
    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var analyser = new Chess.Movement.PawnDisplacementAnalyser(board);

    strictEqual(analyser.isPawnDoubleSquareDisplacement(piece, new Chess.Movement.Position(1, 3)), true);
});

test('isPawnDoubleSquareDisplacement for black', function() {

    var position = new Chess.Movement.Position(1, 6);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.BLACK);
    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var analyser = new Chess.Movement.PawnDisplacementAnalyser(board);

    strictEqual(analyser.isPawnDoubleSquareDisplacement(piece, new Chess.Movement.Position(1, 4)), true);
});

test('isPawnDoubleSquareDisplacement with other piece than a pawn', function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('rook', Chess.Piece.Color.WHITE);
    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var analyser = new Chess.Movement.PawnDisplacementAnalyser(board);

    strictEqual(analyser.isPawnDoubleSquareDisplacement(piece, new Chess.Movement.Position(1, 3)), false);
});

test('isPawnDoubleSquareDisplacement with just one square displacement', function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);
    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var analyser = new Chess.Movement.PawnDisplacementAnalyser(board);

    strictEqual(analyser.isPawnDoubleSquareDisplacement(piece, new Chess.Movement.Position(1, 2)), false);
});

test('isPawnDoubleSquareDisplacement with another piece', function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('rook', Chess.Piece.Color.WHITE);
    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var analyser = new Chess.Movement.PawnDisplacementAnalyser(board);

    strictEqual(analyser.isPawnDoubleSquareDisplacement(piece, new Chess.Movement.Position(1, 3)), false);
});

test('isPawnDoubleSquareDisplacement with pawn out of the board', function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);
    var board = new Chess.Board.Board();

    var analyser = new Chess.Movement.PawnDisplacementAnalyser(board);

    throws(
        function() {
            analyser.isPawnDoubleSquareDisplacement(piece, new Chess.Movement.Position(1, 3))
        },
        Error,
        'Piece has currently no square'
    );
});


test('isPawnCaptureDisplacement for white', function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);
    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var analyser = new Chess.Movement.PawnDisplacementAnalyser(board);

    strictEqual(analyser.isPawnCaptureDisplacement(piece, new Chess.Movement.Position(2, 2)), true);
    strictEqual(analyser.isPawnCaptureDisplacement(piece, new Chess.Movement.Position(0, 2)), true);
});

test('isPawnCaptureDisplacement for black', function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.BLACK);
    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var analyser = new Chess.Movement.PawnDisplacementAnalyser(board);

    strictEqual(analyser.isPawnCaptureDisplacement(piece, new Chess.Movement.Position(2, 0)), true);
    strictEqual(analyser.isPawnCaptureDisplacement(piece, new Chess.Movement.Position(0, 0)), true);
});

test('isPawnCaptureDisplacement with simple displacement', function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);
    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var analyser = new Chess.Movement.PawnDisplacementAnalyser(board);

    strictEqual(analyser.isPawnCaptureDisplacement(piece, new Chess.Movement.Position(1, 2)), false);
});

test('isPawnCaptureDisplacement with double displacement', function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);
    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var analyser = new Chess.Movement.PawnDisplacementAnalyser(board);

    strictEqual(analyser.isPawnCaptureDisplacement(piece, new Chess.Movement.Position(1, 3)), false);
});

test('isPawnCaptureDisplacement with another piece', function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('bishop', Chess.Piece.Color.WHITE);
    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var analyser = new Chess.Movement.PawnDisplacementAnalyser(board);

    strictEqual(analyser.isPawnCaptureDisplacement(piece, new Chess.Movement.Position(2, 2)), false);
});

test('isPawnCaptureDisplacement with a pawn out of the board', function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);
    var board = new Chess.Board.Board();

    var analyser = new Chess.Movement.PawnDisplacementAnalyser(board);

    throws(
        function() {
            analyser.isPawnCaptureDisplacement(piece, new Chess.Movement.Position(1, 3))
        },
        Error,
        'Piece has currently no square'
    );
});