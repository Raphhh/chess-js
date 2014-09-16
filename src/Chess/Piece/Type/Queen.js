var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};
    Chess.Piece.Type = Chess.Piece.Type || {};

    Chess.Piece.Type.Queen = (function() {

        function Queen(color) {
            this.__super__.constructor.call(this, color);
        }

        Queen.prototype.getName = function() {
            return 'Q';
        };

        Queen.prototype.getDisplacementsSuite = function() {
            return [
                new Chess.Movement.Displacement(0, 1, true),
                new Chess.Movement.Displacement(1, 1, true),
                new Chess.Movement.Displacement(1, 0, true),
                new Chess.Movement.Displacement(1, -1, true),
                new Chess.Movement.Displacement(0, -1, true),
                new Chess.Movement.Displacement(-1, -1, true),
                new Chess.Movement.Displacement(-1, 0, true),
                new Chess.Movement.Displacement(-1, 1, true)
            ];
        };

        return Queen;

    })();

    return Chess;

})(Chess || {});