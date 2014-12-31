var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};

    Chess.Piece.Piece = (function() {

        /**
         *
         * @param {Chess.Piece.Color} color
         * @param {int} displacementsNumber
         * @constructor
         */
        function Piece(color, displacementsNumber) {
            this.__internal__ = {
                color: color,
                square: null,
                displacementsNumber: displacementsNumber || 0
            };
        }

        /**
         *
         * @returns {string}
         */
        Piece.prototype.getName = function() {
            return '';
        };

        /**
         *
         * @returns {Chess.Piece.Color}
         */
        Piece.prototype.getColor = function() {
            return this.__internal__.color;
        };

        /**
         *
         * @returns {Chess.Board.Square}
         */
        Piece.prototype.getSquare = function() {
            return this.__internal__.square;
        };

        /**
         *
         * @param {Chess.Board.Square} square
         */
        Piece.prototype.setSquare = function(square) {
            this.__internal__.square = square;
        };

        /**
         *
         */
        Piece.prototype.die = function() {
            this.__internal__.square = null;
        };

        /**
         *
         * @returns {Chess.Movement.Displacement[]}
         */
        Piece.prototype.getDisplacementsSuite = function() {
            return [];
        };

        /**
         *
         */
        Piece.prototype.incrementDisplacementsNumber = function() {
            this.__internal__.displacementsNumber++;
        };

        /**
         *
         * @returns {int}
         */
        Piece.prototype.getDisplacementsNumber = function() {
            return this.__internal__.displacementsNumber;
        };

        return Piece;

    })();

    return Chess;

})(Chess || {});