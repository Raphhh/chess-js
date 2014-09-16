var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.Coordinator = (function() {

        function Coordinator(board) {
            this.__internal__ = {
                board: board,
                calculator: new Chess.Movement.DisplacementsCalculator(board)
            };
        }

        Coordinator.prototype.moveTo = function(piece, position) {
            if(!this.isEligibleMove(piece, position)) {
                throw new Error('Try an invalid move');
            }
            this.__internal__.board.changePiecePosition(piece, position);
            piece.incrementDisplacementNumber();
        };

        Coordinator.prototype.isEligibleMove = function(piece, position) {
            var square = this.__internal__.board.getSquareByPosition(position);
            return this.getEligibleSquares(piece).indexOf(square) >= 0;
        };

        Coordinator.prototype.isEnPassantCaptureOpen = function(piece, position) {
            if(piece instanceof Chess.Piece.Type.Pawn) {
                return piece.getSquare().getPosition().getY() === position.getY() - 2;
            }
            return false;
        };

        Coordinator.prototype.getEligibleSquares = function(piece) {
            return this.__internal__.calculator.getEligibleSquares(piece);
        };

        return Coordinator;

    })();

    return Chess;

})(Chess || {});