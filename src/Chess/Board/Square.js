var Chess = (function(Chess) {
    'use strict';

    Chess.Board = Chess.Board || {};

    Chess.Board.Square = (function() {

        /**
         *
         * @param {Chess.Movement.Position} position
         * @constructor
         */
        function Square(position) {
            this.__internal__ = {
                position: position,
                piece: null
            };
        }

        /**
         *
         * @returns {Chess.Movement.Position}
         */
        Square.prototype.getPosition = function() {
            return this.__internal__.position;
        };

        /**
         *
         * @param {Chess.Piece.Piece} piece
         */
        Square.prototype.setPiece = function(piece) {
            this.__internal__.piece = piece;
        };

        /**
         *
         */
        Square.prototype.removePiece = function() {
            this.__internal__.piece = null;
        };

        /**
         *
         * @returns {Chess.Piece.Piece}
         */
        Square.prototype.getPiece = function() {
            return this.__internal__.piece;
        };

        /**
         *
         * @param {Chess.Piece.Piece} piece
         * @returns {boolean}
         */
        Square.prototype.isValidForNewPiece = function(piece) {
            return !this.getPiece() || this.getPiece().getColor().getValue() !== piece.getColor().getValue();
        };

        return Square;

    })();

    return Chess;

})(Chess || {});