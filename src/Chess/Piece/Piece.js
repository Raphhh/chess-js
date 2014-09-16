var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};

    Chess.Piece.Piece = (function() {

        function Piece(color) {
            this.__internal__ = {
                color: color,
                square: null,
                displacementNumber: 0
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

        Piece.prototype.incrementDisplacementNumber = function() {
            this.__internal__.displacementNumber++; //todo bug: setter au début du jeu si les données sont celle d'un jeu en cours.
        };

        return Piece;

    })();

    return Chess;

})(Chess || {});