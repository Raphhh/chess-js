var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.PositionJsonifier = (function() {

        /**
         *
         * @constructor
         */
        function PositionJsonifier() {

        }

        /**
         *
         * @param {Object} positionData
         * @returns {Chess.Movement.Position}
         */
        PositionJsonifier.prototype.importFromJson = function(positionData) {
            return new Chess.Movement.Position(positionData.x, positionData.y);
        };

        /**
         *
         * @param {Chess.Movement.Position} position
         * @returns {{x: (*|int), y: int}}
         */
        PositionJsonifier.prototype.exportToJson = function(position) {
            return {
                x: position.getX(),
                y: position.getY()
            };
        };

        return PositionJsonifier;

    })();

    return Chess;

})(Chess || {});
