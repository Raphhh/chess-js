var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.PositionFactory = (function() {

        function PositionFactory() {

        }

        PositionFactory.prototype.createByData = function(positionData) {
            return new Chess.Movement.Position(positionData.x, positionData.y);
        };

        return PositionFactory;

    })();

    return Chess;

})(Chess || {});
