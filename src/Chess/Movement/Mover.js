var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.Mover = (function() {

        /**
         *
         * @returns {int}
         */
        var moveXPosition = function() {
            return this.__internal__.position.getX() + this.getCurrentDisplacement().getX();
        };

        /**
         *
         * @returns {int}
         */
        var moveYPosition = function() {
            return this.__internal__.position.getY() + this.getCurrentDisplacement().getY();
        };

        /**
         *
         * @param {Chess.Movement.Position} position
         * @param {Chess.Movement.Displacement[]} displacementsSuite
         * @constructor
         */
        function Mover(position, displacementsSuite) {
            this.__internal__ = {
                position: position,
                initialPosition: position,
                displacementsSuite: displacementsSuite,
                currentDirectionId: 0
            };
        }

        /**
         *
         * @returns {Chess.Movement.Position}
         */
        Mover.prototype.moveOnce = function() {
            if(!this.getCurrentDisplacement()) {
                return null;
            }
            this.__internal__.position = new Chess.Movement.Position(moveXPosition.call(this), moveYPosition.call(this));
            return this.__internal__.position;
        };

        /**
         *
         * @returns {Chess.Movement.Displacement}
         */
        Mover.prototype.getCurrentDisplacement = function() {
            if(this.__internal__.displacementsSuite[this.__internal__.currentDirectionId]) {
                return this.__internal__.displacementsSuite[this.__internal__.currentDirectionId];
            }
            return null;
        };

        /**
         *
         */
        Mover.prototype.changeDirection = function() {
            this.__internal__.currentDirectionId++;
            this.__internal__.position = this.__internal__.initialPosition;
        };

        return Mover;

    })();

    return Chess;

})(Chess || {});