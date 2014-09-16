var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.Displacement = (function() {

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

        Displacement.prototype.getX = function() {
            return this.__internal__.x;
        };

        Displacement.prototype.getY = function() {
            return this.__internal__.y;
        };

        Displacement.prototype.isExtensible = function() {
            if(this.__internal__.isExtensible instanceof Function) {
                return this.__internal__.isExtensible();
            }
            return this.__internal__.isExtensible;
        };

        Displacement.prototype.isValid = function(square) {
            return this.__internal__.filter(square);
        };

        return Displacement;

    })();

    return Chess;

})(Chess || {});
