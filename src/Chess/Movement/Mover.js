var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.Mover = (function() {

        var moveXPosition = function() {
            return this.__internal__.position.getX() + this.getCurrentDisplacement().getX();
        };

        var moveYPosition = function() {
            return this.__internal__.position.getY() + this.getCurrentDisplacement().getY();
        };

        function Mover(position, displacementsSuite) {
            this.__internal__ = {
                position: position,
                initialPosition: position,
                displacementsSuite: displacementsSuite,
                currentDirectionId: 0
            };
        }

        Mover.prototype.moveOnce = function(changeDirection) {

            if(changeDirection) {
                if(++this.__internal__.currentDirectionId >= this.__internal__.displacementsSuite.length) {
                    return null;
                }
                this.__internal__.position = this.__internal__.initialPosition;
            }

            this.__internal__.position = new Chess.Movement.Position(moveXPosition.call(this), moveYPosition.call(this));
            return this.__internal__.position;
        };

        Mover.prototype.getCurrentDisplacement = function() {
            if(this.__internal__.displacementsSuite[this.__internal__.currentDirectionId]) {
                return this.__internal__.displacementsSuite[this.__internal__.currentDirectionId];
            }
            return null;
        };

        return Mover;

    })();

    return Chess;

})(Chess || {});