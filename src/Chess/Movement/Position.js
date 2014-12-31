var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.Position = (function() {

        var xMappging = 'abcdefgh';
        var yMappging = '12345678';

        /**
         *
         * @param {int} x
         * @param {int} y
         * @constructor
         */
        function Position(x, y) {
            this.__internal__ = {
                x: x,
                y: y
            };
        }

        /**
         *
         * @param algebraicNotation
         * @returns {Position}
         */
        Position.createByAlgebraicNotation = function(algebraicNotation) {
            var splitNotation = algebraicNotation.split('');
            return new Position(
                xMappging.indexOf(splitNotation[0]),
                yMappging.indexOf(splitNotation[1])
            );
        };

        /**
         *
         * @returns {int}
         */
        Position.prototype.getX = function() {
            return this.__internal__.x;
        };

        /**
         *
         * @returns {int}
         */
        Position.prototype.getY = function() {
            return this.__internal__.y;
        };

        /**
         *
         * @returns {string}
         */
        Position.prototype.toAlgebraicNotation = function() {
            return xMappging.charAt(this.getX()) + yMappging.charAt(this.getY());
        };

        return Position;

    })();

    return Chess;

})(Chess || {});
