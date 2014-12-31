var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.Displacement = (function() {

        /**
         *
         * @param {int} x
         * @param {int} y
         * @param {bool|function} isExtensible
         * @param {function} filter
         * @constructor
         */
        function Displacement(x, y, isExtensible, filter) {
            this.__internal__ = {
                x: x,
                y: y,
                isExtensible: isExtensible,
                filter: filter || function() {
                    return true;
                }
            };
        }

        /**
         *
         * @returns {int}
         */
        Displacement.prototype.getX = function() {
            return this.__internal__.x;
        };

        /**
         *
         * @returns {int}
         */
        Displacement.prototype.getY = function() {
            return this.__internal__.y;
        };

        /**
         *
         * @param squareDisplacementsNumber
         * @returns {bool}
         */
        Displacement.prototype.isExtensible = function(squareDisplacementsNumber) {
            if(this.__internal__.isExtensible instanceof Function) {
                return this.__internal__.isExtensible(squareDisplacementsNumber);
            }
            return this.__internal__.isExtensible;
        };

        /**
         *
         * @param {Chess.Board.Square} square
         * @returns {bool}
         */
        Displacement.prototype.isValid = function(square) {
            return this.__internal__.filter(square);
        };

        return Displacement;

    })();

    return Chess;

})(Chess || {});
