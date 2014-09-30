test('setEnPassantBoard', function() {
    var initPosition = new Chess.Movement.Position(1, 1);
    var interPosition = new Chess.Movement.Position(1, 2);
    var finalPosition = new Chess.Movement.Position(1, 3);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);
    var board = new Chess.Board.Board();
    board.addPiece(piece, initPosition);

    var coordinator = new Chess.Movement.Pawn.EnPassantCoordinator(board);

    coordinator.setEnPassantEligiblePawn(piece, finalPosition);
    board.changePiecePosition(piece, finalPosition);
    deepEqual(piece.getSquare().getPosition(), finalPosition);

    coordinator.setEnPassantBoard();
    deepEqual(piece.getSquare().getPosition(), interPosition);

});

test('setEnPassantBoard without setting eligible pawn', function() {
    var initPosition = new Chess.Movement.Position(1, 1);
    var finalPosition = new Chess.Movement.Position(1, 3);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);
    var board = new Chess.Board.Board();
    board.addPiece(piece, initPosition);

    var coordinator = new Chess.Movement.Pawn.EnPassantCoordinator(board);

    board.changePiecePosition(piece, finalPosition);
    deepEqual(piece.getSquare().getPosition(), finalPosition);

    coordinator.setEnPassantBoard();
    deepEqual(piece.getSquare().getPosition(), finalPosition);

});

test('restoreInitialBoard after setEnPassantBoard', function() {
    var initPosition = new Chess.Movement.Position(1, 1);
    var interPosition = new Chess.Movement.Position(1, 2);
    var finalPosition = new Chess.Movement.Position(1, 3);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);
    var board = new Chess.Board.Board();
    board.addPiece(piece, initPosition);

    var coordinator = new Chess.Movement.Pawn.EnPassantCoordinator(board);

    coordinator.setEnPassantEligiblePawn(piece, finalPosition);
    board.changePiecePosition(piece, finalPosition);
    deepEqual(piece.getSquare().getPosition(), finalPosition);

    coordinator.setEnPassantBoard();
    deepEqual(piece.getSquare().getPosition(), interPosition);

    coordinator.restoreInitialBoard();
    deepEqual(piece.getSquare().getPosition(), finalPosition);

});

test('restoreInitialBoard without setting eligible pawn', function() {
    var initPosition = new Chess.Movement.Position(1, 1);
    var finalPosition = new Chess.Movement.Position(1, 3);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);
    var board = new Chess.Board.Board();
    board.addPiece(piece, initPosition);

    var coordinator = new Chess.Movement.Pawn.EnPassantCoordinator(board);

    board.changePiecePosition(piece, finalPosition);
    deepEqual(piece.getSquare().getPosition(), finalPosition);

    coordinator.setEnPassantBoard();
    deepEqual(piece.getSquare().getPosition(), finalPosition);

    coordinator.restoreInitialBoard();
    deepEqual(piece.getSquare().getPosition(), finalPosition);

});

test('restoreInitialBoard', function() {
    var initPosition = new Chess.Movement.Position(1, 1);
    var interPosition = new Chess.Movement.Position(1, 2);
    var finalPosition = new Chess.Movement.Position(1, 3);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);
    var board = new Chess.Board.Board();
    board.addPiece(piece, initPosition);

    var coordinator = new Chess.Movement.Pawn.EnPassantCoordinator(board);

    coordinator.setEnPassantEligiblePawn(piece, finalPosition);
    board.changePiecePosition(piece, finalPosition);
    deepEqual(piece.getSquare().getPosition(), finalPosition);

    coordinator.restoreInitialBoard();
    deepEqual(piece.getSquare().getPosition(), finalPosition);

});