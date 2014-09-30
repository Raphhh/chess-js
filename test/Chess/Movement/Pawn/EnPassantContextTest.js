test('setEnPassantContext', function() {
    expect(1);

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);

    var enPassantCoordinator = {
        setEnPassantBoard: function() {
            ok(true);
        }
    };

    var context = new Chess.Movement.Pawn.EnPassantContext(enPassantCoordinator);
    context.setEnPassantContext(piece);
});

test('setEnPassantContext with another piece', function() {
    expect(0);

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('rook', Chess.Piece.Color.WHITE);

    var enPassantCoordinator = {
        setEnPassantBoard: function() {
            ok(false);
        }
    };

    var context = new Chess.Movement.Pawn.EnPassantContext(enPassantCoordinator);
    context.setEnPassantContext(piece);
});

test('restoreInitialContext', function() {
    expect(1);

    var enPassantCoordinator = {
        restoreInitialBoard: function() {
            ok(true);
        }
    };

    var context = new Chess.Movement.Pawn.EnPassantContext(enPassantCoordinator);
    context.restoreInitialContext();
});

test('synchronizeContextBeforeDisplacement calls setEnPassantBoard with a pawn capture', function() {
    expect(3);

    var board = new Chess.Board.Board();
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('rook', Chess.Piece.Color.WHITE);
    var position = new Chess.Movement.Position(1, 1);
    board.addPiece(piece, position);

    var enPassantCoordinator = new Chess.Movement.Pawn.EnPassantCoordinator(board);
    enPassantCoordinator.setEnPassantBoard = function() {
        ok(true);
    };

    var pawnDisplacementAnalyser = new Chess.Movement.Pawn.PawnDisplacementAnalyser();
    pawnDisplacementAnalyser.isPawnCaptureDisplacement = function(_piece, _position) {
        deepEqual(_piece, piece);
        deepEqual(_position, position);
        return true;
    };

    var context = new Chess.Movement.Pawn.EnPassantContext(enPassantCoordinator, pawnDisplacementAnalyser);
    context.synchronizeContextBeforeDisplacement(piece, position);
});

test('synchronizeContextBeforeDisplacement does not call setEnPassantBoard without a pawn capture', function() {
    expect(2);

    var board = new Chess.Board.Board();
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('rook', Chess.Piece.Color.WHITE);
    var position = new Chess.Movement.Position(1, 1);
    board.addPiece(piece, position);

    var enPassantCoordinator = new Chess.Movement.Pawn.EnPassantCoordinator(board);
    enPassantCoordinator.setEnPassantBoard = function() {
        ok(false);
    };

    var pawnDisplacementAnalyser = new Chess.Movement.Pawn.PawnDisplacementAnalyser();
    pawnDisplacementAnalyser.isPawnCaptureDisplacement = function(_piece, _position) {
        deepEqual(_piece, piece);
        deepEqual(_position, position);
        return false;
    };

    var context = new Chess.Movement.Pawn.EnPassantContext(enPassantCoordinator, pawnDisplacementAnalyser);
    context.synchronizeContextBeforeDisplacement(piece, position);
});

test('synchronizeContextBeforeDisplacement calls resetEnPassantEligiblePawn', function() {
    expect(1);

    var board = new Chess.Board.Board();
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('rook', Chess.Piece.Color.WHITE);
    var position = new Chess.Movement.Position(1, 1);
    board.addPiece(piece, position);

    var enPassantCoordinator = new Chess.Movement.Pawn.EnPassantCoordinator(board);
    enPassantCoordinator.resetEnPassantEligiblePawn = function() {
        ok(true);
    };

    var pawnDisplacementAnalyser = new Chess.Movement.Pawn.PawnDisplacementAnalyser();

    var context = new Chess.Movement.Pawn.EnPassantContext(enPassantCoordinator, pawnDisplacementAnalyser);
    context.synchronizeContextBeforeDisplacement(piece, position);
});

test('synchronizeContextBeforeDisplacement calls setEnPassantEligiblePawn with a pawn displacement', function() {
    expect(4);

    var board = new Chess.Board.Board();
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('rook', Chess.Piece.Color.WHITE);
    var position = new Chess.Movement.Position(1, 1);
    board.addPiece(piece, position);

    var enPassantCoordinator = new Chess.Movement.Pawn.EnPassantCoordinator(board);
    enPassantCoordinator.setEnPassantEligiblePawn = function(_piece, _position) {
        deepEqual(_piece, piece);
        deepEqual(_position, position);
    };

    var pawnDisplacementAnalyser = new Chess.Movement.Pawn.PawnDisplacementAnalyser();
    pawnDisplacementAnalyser.isPawnDoubleSquareDisplacement = function(_piece, _position) {
        deepEqual(_piece, piece);
        deepEqual(_position, position);
        return true;
    };

    var context = new Chess.Movement.Pawn.EnPassantContext(enPassantCoordinator, pawnDisplacementAnalyser);
    context.synchronizeContextBeforeDisplacement(piece, position);
});

test('synchronizeContextBeforeDisplacement does not call setEnPassantEligiblePawn without a pawn displacement', function() {
    expect(2);

    var board = new Chess.Board.Board();
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('rook', Chess.Piece.Color.WHITE);
    var position = new Chess.Movement.Position(1, 1);
    board.addPiece(piece, position);

    var enPassantCoordinator = new Chess.Movement.Pawn.EnPassantCoordinator(board);
    enPassantCoordinator.setEnPassantEligiblePawn = function(_piece, _position) {
        ok(false);
    };

    var pawnDisplacementAnalyser = new Chess.Movement.Pawn.PawnDisplacementAnalyser();
    pawnDisplacementAnalyser.isPawnDoubleSquareDisplacement = function(_piece, _position) {
        deepEqual(_piece, piece);
        deepEqual(_position, position);
        return false;
    };

    var context = new Chess.Movement.Pawn.EnPassantContext(enPassantCoordinator, pawnDisplacementAnalyser);
    context.synchronizeContextBeforeDisplacement(piece, position);
});