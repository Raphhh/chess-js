var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.Coordinator = (function() {

        /**
         *
         * @param {Chess.Board.Board} board
         * @param {Chess.Piece.ColorSwitcher} colorSwitcher
         * @param {Chess.Movement.DisplacementsCalculator} calculator
         * @param {Chess.Movement.Pawn.EnPassantContext} enPassantContext
         * @constructor
         */
        function Coordinator(board, colorSwitcher, calculator, enPassantContext) {
            this.__internal__ = {
                board: board,
                colorSwitcher: colorSwitcher,
                calculator: calculator,
                enPassantContext: enPassantContext
            };
        }

        /**
         *
         * @returns {Chess.Piece.Color}
         */
        Coordinator.prototype.getPlayingColor = function() {
            return this.__internal__.colorSwitcher.getPlayingColor();
        };

        /**
         *
         * @param {Chess.Piece.Piece} piece
         * @param {Chess.Movement.Position} position
         */
        Coordinator.prototype.moveTo = function(piece, position) {
            if(!this.isEligibleMove(piece, position)) {
                throw new Error('Try an invalid move: ' + piece.getName() + ' from ' + piece.getSquare().getPosition().toAlgebraicNotation() + ' to ' + position.toAlgebraicNotation());
            }
            this.__internal__.enPassantContext.synchronizeContextBeforeDisplacement(piece, position);
            this.__internal__.board.changePiecePosition(piece, position);
            piece.incrementDisplacementsNumber();
            this.__internal__.colorSwitcher.switchColor();
        };

        /**
         *
         * @param {Chess.Piece.Piece} piece
         * @param {Chess.Movement.Position} position
         */
        Coordinator.prototype.isEligibleMove = function(piece, position) {
            var square = this.__internal__.board.getSquareByPosition(position);
            return this.getEligibleSquares(piece).indexOf(square) >= 0;
        };

        /**
         *
         * @param {Chess.Piece.Piece} piece
         */
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