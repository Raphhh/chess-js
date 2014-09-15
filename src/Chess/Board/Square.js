var Chess = (function(Chess) {
    'use strict';

    Chess.Board = Chess.Board || {};

    Chess.Board.Square = (function() {

        function Square(position) {
            this.__internal__ = {
                position: position,
                piece: null
            };
        }

        Square.prototype.getPosition = function() {
            return this.__internal__.position;
        };

        Square.prototype.setPiece = function(piece) {
            this.__internal__.piece = piece;
        };

        Square.prototype.removePiece = function() {
            this.__internal__.piece = null;
        };

        Square.prototype.getPiece = function() {
            return this.__internal__.piece;
        };

        Square.prototype.isValidForNewPiece = function(piece) {
            return !this.getPiece() || this.getPiece().getColor().getValue() !== piece.getColor().getValue();
        };

        return Square;

    })();

    return Chess;

})(Chess || {});