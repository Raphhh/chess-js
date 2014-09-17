var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};

    Chess.Piece.Piece = (function() {

        function Piece(color, displacementsNumber) {
            this.__internal__ = {
                color: color,
                square: null,
                displacementsNumber: displacementsNumber || 0
            };
        }

        Piece.prototype.getName = function() {
            return '';
        };

        Piece.prototype.getColor = function() {
            return this.__internal__.color;
        };

        Piece.prototype.getSquare = function() {
            return this.__internal__.square;
        };

        Piece.prototype.setSquare = function(square) {
            this.__internal__.square = square;
        };

        Piece.prototype.die = function() {
            this.__internal__.square = null;
        };

        Piece.prototype.getDisplacementsSuite = function() {
            return [];
        };

        Piece.prototype.incrementDisplacementsNumber = function() {
            this.__internal__.displacementsNumber++;
        };

        Piece.prototype.getDisplacementsNumber = function() {
            return this.__internal__.displacementsNumber;
        };

        return Piece;

    })();

    return Chess;

})(Chess || {});