var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.PositionJsonifier = (function() {

        function PositionJsonifier() {

        }

        PositionJsonifier.prototype.importFromJson = function(positionData) {
            return new Chess.Movement.Position(positionData.x, positionData.y);
        };

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
