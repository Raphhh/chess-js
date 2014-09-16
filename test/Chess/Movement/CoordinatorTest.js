test("getEligibleSquares before add piece", function() {

    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', 'white');

    var coordinator = new Chess.Movement.Coordinator(new Chess.Board.Board());
    throws(function() {
            coordinator.getEligibleSquares(piece);
        },
        Error,
        'You must add the Piece to the board before trying to move it'
    );

});

test("getEligibleSquares for white pawn", function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);

    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var coordinator = new Chess.Movement.Coordinator(board);
    var result = coordinator.getEligibleSquares(piece);

    strictEqual(result.length, 1);
    strictEqual(result[0].getPosition().getX(), 1);
    strictEqual(result[0].getPosition().getY(), 2);

});

test("getEligibleSquares for black pawn", function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.BLACK);

    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var coordinator = new Chess.Movement.Coordinator(board);
    var result = coordinator.getEligibleSquares(piece);

    strictEqual(result.length, 1);
    strictEqual(result[0].getPosition().getX(), 1);
    strictEqual(result[0].getPosition().getY(), 0);

});

test("getEligibleSquares with piece in front of pawn", function() {

    var factory = new Chess.Piece.PieceFactory();
    var pawn = factory.create('pawn', Chess.Piece.Color.WHITE);
    var piece = factory.create('pawn', Chess.Piece.Color.BLACK);

    var board = new Chess.Board.Board();
    board.addPiece(pawn, new Chess.Movement.Position(1, 1));
    board.addPiece(piece, new Chess.Movement.Position(1, 2));

    var coordinator = new Chess.Movement.Coordinator(board);
    var result = coordinator.getEligibleSquares(pawn);

    strictEqual(result.length, 0);

});

test("getEligibleSquares with pawn taking in diagonal", function() {

    var factory = new Chess.Piece.PieceFactory();
    var pawn = factory.create('pawn', Chess.Piece.Color.WHITE);
    var piece1 = factory.create('pawn', Chess.Piece.Color.BLACK);
    var piece2 = factory.create('pawn', Chess.Piece.Color.BLACK);

    var board = new Chess.Board.Board();
    board.addPiece(pawn, new Chess.Movement.Position(1, 1));
    board.addPiece(piece1, new Chess.Movement.Position(0, 2));
    board.addPiece(piece2, new Chess.Movement.Position(2, 2));

    var coordinator = new Chess.Movement.Coordinator(board);
    var result = coordinator.getEligibleSquares(pawn);

    strictEqual(result.length, 3);

    strictEqual(result[0].getPosition().getX(), 1);
    strictEqual(result[0].getPosition().getY(), 2);

    strictEqual(result[1].getPosition().getX(), 0);
    strictEqual(result[1].getPosition().getY(), 2);

    strictEqual(result[2].getPosition().getX(), 2);
    strictEqual(result[2].getPosition().getY(), 2);

});

test("getEligibleSquares for rook", function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('rook', Chess.Piece.Color.WHITE);

    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var coordinator = new Chess.Movement.Coordinator(board);
    var result = coordinator.getEligibleSquares(piece);

    strictEqual(result.length, 14);

    //y +
    strictEqual(result[0].getPosition().getX(), 1);
    strictEqual(result[0].getPosition().getY(), 2);

    strictEqual(result[1].getPosition().getX(), 1);
    strictEqual(result[1].getPosition().getY(), 3);

    strictEqual(result[2].getPosition().getX(), 1);
    strictEqual(result[2].getPosition().getY(), 4);

    strictEqual(result[3].getPosition().getX(), 1);
    strictEqual(result[3].getPosition().getY(), 5);

    strictEqual(result[4].getPosition().getX(), 1);
    strictEqual(result[4].getPosition().getY(), 6);

    strictEqual(result[5].getPosition().getX(), 1);
    strictEqual(result[5].getPosition().getY(), 7);

    //x +
    strictEqual(result[6].getPosition().getX(), 2);
    strictEqual(result[6].getPosition().getY(), 1);

    strictEqual(result[7].getPosition().getX(), 3);
    strictEqual(result[7].getPosition().getY(), 1);

    strictEqual(result[8].getPosition().getX(), 4);
    strictEqual(result[8].getPosition().getY(), 1);

    strictEqual(result[9].getPosition().getX(), 5);
    strictEqual(result[9].getPosition().getY(), 1);

    strictEqual(result[10].getPosition().getX(), 6);
    strictEqual(result[10].getPosition().getY(), 1);

    strictEqual(result[11].getPosition().getX(), 7);
    strictEqual(result[11].getPosition().getY(), 1);

    //y -
    strictEqual(result[12].getPosition().getX(), 1);
    strictEqual(result[12].getPosition().getY(), 0);

    //x -
    strictEqual(result[13].getPosition().getX(), 0);
    strictEqual(result[13].getPosition().getY(), 1);

});


test("getEligibleSquares for bishop", function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('bishop', Chess.Piece.Color.WHITE);

    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var coordinator = new Chess.Movement.Coordinator(board);
    var result = coordinator.getEligibleSquares(piece);

    strictEqual(result.length, 9);

    //y + x
    strictEqual(result[0].getPosition().getX(), 2);
    strictEqual(result[0].getPosition().getY(), 2);

    strictEqual(result[1].getPosition().getX(), 3);
    strictEqual(result[1].getPosition().getY(), 3);

    strictEqual(result[2].getPosition().getX(), 4);
    strictEqual(result[2].getPosition().getY(), 4);

    strictEqual(result[3].getPosition().getX(), 5);
    strictEqual(result[3].getPosition().getY(), 5);

    strictEqual(result[4].getPosition().getX(), 6);
    strictEqual(result[4].getPosition().getY(), 6);

    strictEqual(result[5].getPosition().getX(), 7);
    strictEqual(result[5].getPosition().getY(), 7);

    //-y + x
    strictEqual(result[6].getPosition().getX(), 2);
    strictEqual(result[6].getPosition().getY(), 0);

    // -y -x
    strictEqual(result[7].getPosition().getX(), 0);
    strictEqual(result[7].getPosition().getY(), 0);

    //y -x
    strictEqual(result[8].getPosition().getX(), 0);
    strictEqual(result[8].getPosition().getY(), 2);


});

test("getEligibleSquares for queen", function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('queen', Chess.Piece.Color.WHITE);

    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var coordinator = new Chess.Movement.Coordinator(board);
    var result = coordinator.getEligibleSquares(piece);


    strictEqual(result.length, 23);

    //y +
    strictEqual(result[0].getPosition().getX(), 1);
    strictEqual(result[0].getPosition().getY(), 2);

    strictEqual(result[1].getPosition().getX(), 1);
    strictEqual(result[1].getPosition().getY(), 3);

    strictEqual(result[2].getPosition().getX(), 1);
    strictEqual(result[2].getPosition().getY(), 4);

    strictEqual(result[3].getPosition().getX(), 1);
    strictEqual(result[3].getPosition().getY(), 5);

    strictEqual(result[4].getPosition().getX(), 1);
    strictEqual(result[4].getPosition().getY(), 6);

    strictEqual(result[5].getPosition().getX(), 1);
    strictEqual(result[5].getPosition().getY(), 7);

    //y + x
    strictEqual(result[6].getPosition().getX(), 2);
    strictEqual(result[6].getPosition().getY(), 2);

    strictEqual(result[7].getPosition().getX(), 3);
    strictEqual(result[7].getPosition().getY(), 3);

    strictEqual(result[8].getPosition().getX(), 4);
    strictEqual(result[8].getPosition().getY(), 4);

    strictEqual(result[9].getPosition().getX(), 5);
    strictEqual(result[9].getPosition().getY(), 5);

    strictEqual(result[10].getPosition().getX(), 6);
    strictEqual(result[10].getPosition().getY(), 6);

    strictEqual(result[11].getPosition().getX(), 7);
    strictEqual(result[11].getPosition().getY(), 7);

    //x +
    strictEqual(result[12].getPosition().getX(), 2);
    strictEqual(result[12].getPosition().getY(), 1);

    strictEqual(result[13].getPosition().getX(), 3);
    strictEqual(result[13].getPosition().getY(), 1);

    strictEqual(result[14].getPosition().getX(), 4);
    strictEqual(result[14].getPosition().getY(), 1);

    strictEqual(result[15].getPosition().getX(), 5);
    strictEqual(result[15].getPosition().getY(), 1);

    strictEqual(result[16].getPosition().getX(), 6);
    strictEqual(result[16].getPosition().getY(), 1);

    strictEqual(result[17].getPosition().getX(), 7);
    strictEqual(result[17].getPosition().getY(), 1);

    //-y + x
    strictEqual(result[18].getPosition().getX(), 2);
    strictEqual(result[18].getPosition().getY(), 0);

    //y -
    strictEqual(result[19].getPosition().getX(), 1);
    strictEqual(result[19].getPosition().getY(), 0);

    // -y -x
    strictEqual(result[20].getPosition().getX(), 0);
    strictEqual(result[20].getPosition().getY(), 0);

    //x -
    strictEqual(result[21].getPosition().getX(), 0);
    strictEqual(result[21].getPosition().getY(), 1);

    //y -x
    strictEqual(result[22].getPosition().getX(), 0);
    strictEqual(result[22].getPosition().getY(), 2);
});

test("getEligibleSquares for white knight", function() {

    var position = new Chess.Movement.Position(3, 3);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('knight', Chess.Piece.Color.WHITE);

    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var coordinator = new Chess.Movement.Coordinator(board);
    var result = coordinator.getEligibleSquares(piece);

    strictEqual(result.length, 8);

    strictEqual(result[0].getPosition().getX(), 4);
    strictEqual(result[0].getPosition().getY(), 5);

    strictEqual(result[1].getPosition().getX(), 5);
    strictEqual(result[1].getPosition().getY(), 4);

    strictEqual(result[2].getPosition().getX(), 5);
    strictEqual(result[2].getPosition().getY(), 2);

    strictEqual(result[3].getPosition().getX(), 4);
    strictEqual(result[3].getPosition().getY(), 1);

    strictEqual(result[4].getPosition().getX(), 2);
    strictEqual(result[4].getPosition().getY(), 1);

    strictEqual(result[5].getPosition().getX(), 1);
    strictEqual(result[5].getPosition().getY(), 2);

    strictEqual(result[6].getPosition().getX(), 1);
    strictEqual(result[6].getPosition().getY(), 4);

    strictEqual(result[7].getPosition().getX(), 2);
    strictEqual(result[7].getPosition().getY(), 5);

});


test("getEligibleSquares for queen", function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('king', Chess.Piece.Color.WHITE);

    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var coordinator = new Chess.Movement.Coordinator(board);
    var result = coordinator.getEligibleSquares(piece);


    strictEqual(result.length, 8);

    //y +
    strictEqual(result[0].getPosition().getX(), 1);
    strictEqual(result[0].getPosition().getY(), 2);

    //y + x
    strictEqual(result[1].getPosition().getX(), 2);
    strictEqual(result[1].getPosition().getY(), 2);

    //x +
    strictEqual(result[2].getPosition().getX(), 2);
    strictEqual(result[2].getPosition().getY(), 1);

    //-y + x
    strictEqual(result[3].getPosition().getX(), 2);
    strictEqual(result[3].getPosition().getY(), 0);

    //y -
    strictEqual(result[4].getPosition().getX(), 1);
    strictEqual(result[4].getPosition().getY(), 0);

    // -y -x
    strictEqual(result[5].getPosition().getX(), 0);
    strictEqual(result[5].getPosition().getY(), 0);

    //x -
    strictEqual(result[6].getPosition().getX(), 0);
    strictEqual(result[6].getPosition().getY(), 1);

    //y -x
    strictEqual(result[7].getPosition().getX(), 0);
    strictEqual(result[7].getPosition().getY(), 2);
});

test("isEligibleMove true", function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);

    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var coordinator = new Chess.Movement.Coordinator(board);
    var result = coordinator.isEligibleMove(piece, new Chess.Movement.Position(1, 2));

    strictEqual(result, true);

});

test("isEligibleMove false", function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);

    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var coordinator = new Chess.Movement.Coordinator(board);
    var result = coordinator.isEligibleMove(piece, new Chess.Movement.Position(1, 3));

    strictEqual(result, false);

});

test("moveTo error", function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);

    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    var coordinator = new Chess.Movement.Coordinator(board);
    throws(
        function() {
            coordinator.moveTo(piece, new Chess.Movement.Position(1, 3));
        },
        Error,
        'Try an invalid move'
    );

});

test("moveTo ok", function() {
    expect(1);

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('pawn', Chess.Piece.Color.WHITE);

    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    board.changePiecePosition = function() {
        ok(true);
    };

    var coordinator = new Chess.Movement.Coordinator(board);
    coordinator.moveTo(piece, new Chess.Movement.Position(1, 2));

});

test("getEligibleSquares for a piece int front of the other color", function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('rook', Chess.Piece.Color.WHITE);

    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    //we put a black pawn
    board.addPiece(
        factory.create('pawn', Chess.Piece.Color.BLACK),
        new Chess.Movement.Position(1, 3)
    );

    var coordinator = new Chess.Movement.Coordinator(board);
    var result = coordinator.getEligibleSquares(piece);

    strictEqual(result.length, 10);

    //y +
    strictEqual(result[0].getPosition().getX(), 1);
    strictEqual(result[0].getPosition().getY(), 2);

    //the rook can take the black pawn
    strictEqual(result[1].getPosition().getX(), 1);
    strictEqual(result[1].getPosition().getY(), 3);

    //the rook can not exceed the piece

    //x +
    strictEqual(result[2].getPosition().getX(), 2);
    strictEqual(result[2].getPosition().getY(), 1);

});

test("getEligibleSquares for a piece int front of the same color", function() {

    var position = new Chess.Movement.Position(1, 1);
    var factory = new Chess.Piece.PieceFactory();
    var piece = factory.create('rook', Chess.Piece.Color.WHITE);

    var board = new Chess.Board.Board();
    board.addPiece(piece, position);

    //we put a black pawn
    board.addPiece(
        factory.create('pawn', Chess.Piece.Color.WHITE),
        new Chess.Movement.Position(1, 3)
    );

    var coordinator = new Chess.Movement.Coordinator(board);
    var result = coordinator.getEligibleSquares(piece);

    strictEqual(result.length, 9);

    //y +
    strictEqual(result[0].getPosition().getX(), 1);
    strictEqual(result[0].getPosition().getY(), 2);

    //the rook can not take the black pawn
    //the rook can not exceed the piece

    //x +
    strictEqual(result[1].getPosition().getX(), 2);
    strictEqual(result[1].getPosition().getY(), 1);

});