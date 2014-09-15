var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.Position = (function() {

        var xMappging = 'abcdefgh';
        var yMappging = '12345678';

        function Position(x, y) {
            this.__internal__ = {
                x: x,
                y: y
            };
        }

        Position.createByAlgebraicNotation = function(algebraicNotation) {
            var splitNotation = algebraicNotation.split('');
            return new Position(
                xMappging.indexOf(splitNotation[0]),
                yMappging.indexOf(splitNotation[1])
            );
        };

        Position.prototype.getX = function() {
            return this.__internal__.x;
        };

        Position.prototype.getY = function() {
            return this.__internal__.y;
        };

        Position.prototype.toAlgebraicNotation = function() {
            return xMappging.charAt(this.getX()) + yMappging.charAt(this.getY());
        };

        return Position;

    })();

    return Chess;

})(Chess || {});
