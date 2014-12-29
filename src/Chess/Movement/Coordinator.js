var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.Coordinator = (function() {

        function Coordinator(board, colorSwitcher, calculator, enPassantContext) {
            this.__internal__ = {
                board: board,
                colorSwitcher: colorSwitcher,
                calculator: calculator,
                enPassantContext: enPassantContext
            };
        }

        Coordinator.prototype.getPlayingColor = function() {
            return this.__internal__.colorSwitcher.getPlayingColor();
        };

        Coordinator.prototype.moveTo = function(piece, position) {
            if(!this.isEligibleMove(piece, position)) {
                throw new Error('Try an invalid move: ' + piece.getName() + ' from ' + piece.getSquare().getPosition().toAlgebraicNotation() + ' to ' + position.toAlgebraicNotation());
            }
            this.__internal__.enPassantContext.synchronizeContextBeforeDisplacement(piece, position);
            this.__internal__.board.changePiecePosition(piece, position);
            piece.incrementDisplacementsNumber();
            this.__internal__.colorSwitcher.switchColor();
        };

        Coordinator.prototype.isEligibleMove = function(piece, position) {
            var square = this.__internal__.board.getSquareByPosition(position);
            return this.getEligibleSquares(piece).indexOf(square) >= 0;
        };

        Coordinator.prototype.getEligibleSquares = function(piece) {
            if(!this.__internal__.colorSwitcher.isPlayingColor(piece.getColor())) {
                return [];
            }

            this.__internal__.enPassantContext.setEnPassantContext(piece);
            var result = this.__internal__.calculator.getEligibleSquares(piece);
            this.__internal__.enPassantContext.restoreInitialContext();
            return result;
        };

        return Coordinator;

    })();

    return Chess;

})(Chess || {});