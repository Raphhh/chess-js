var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.Mover = (function() {

        var moveXPosition = function() {
            return this.__internal__.position.getX() + this.__internal__.displacements[this.__internal__.currentDirectionId].x;
        };

        var moveYPosition = function() {
            return this.__internal__.position.getY() + this.__internal__.displacements[this.__internal__.currentDirectionId].y;
        };

        function Mover(position, displacements) {
            this.__internal__ = {
                position: position,
                initialPosition: position,
                displacements: displacements,
                currentDirectionId: 0
            };
        }

        Mover.prototype.moveOnce = function(changeDirection) {

            if(changeDirection) {
                if(++this.__internal__.currentDirectionId >= this.__internal__.displacements.length) {
                    return null;
                }
                this.__internal__.position = this.__internal__.initialPosition;
            }

            this.__internal__.position = new Chess.Movement.Position(moveXPosition.call(this), moveYPosition.call(this));
            return this.__internal__.position;
        };

        return Mover;

    })();

    return Chess;

})(Chess || {});