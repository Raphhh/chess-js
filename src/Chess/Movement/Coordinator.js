var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.Coordinator = (function() {

        function Coordinator(board) {
            this.__internal__ = {
                board: board,
                calculator: new Chess.Movement.DisplacementsCalculator(board),
                enPassantContext: new Chess.Movement.EnPassantContext(
                    new Chess.Movement.EnPassantCoordinator(board),
                    new Chess.Movement.PawnDisplacementAnalyser()
                )
            };
        }

        Coordinator.prototype.moveTo = function(piece, position) {
            if(!this.isEligibleMove(piece, position)) {
                throw new Error('Try an invalid move');
            }
            this.__internal__.enPassantContext.synchronizeContextBeforeDisplacement(piece, position);
            this.__internal__.board.changePiecePosition(piece, position);
            piece.incrementDisplacementNumber();
        };

        Coordinator.prototype.isEligibleMove = function(piece, position) {
            var square = this.__internal__.board.getSquareByPosition(position);
            return this.getEligibleSquares(piece).indexOf(square) >= 0;
        };

        Coordinator.prototype.getEligibleSquares = function(piece) {
            this.__internal__.enPassantContext.setEnPassantContext(piece);
            var result = this.__internal__.calculator.getEligibleSquares(piece);
            this.__internal__.enPassantContext.restoreInitialContext();
            return result;
        };

        return Coordinator;

    })();

    return Chess;

})(Chess || {});