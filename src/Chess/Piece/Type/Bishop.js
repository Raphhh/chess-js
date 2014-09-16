var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};
    Chess.Piece.Type = Chess.Piece.Type || {};

    Chess.Piece.Type.Bishop = (function() {

        function Bishop(color) {
            this.__super__.constructor.call(this, color);
        }

        Bishop.prototype.getName = function() {
            return 'B';
        };

        Bishop.prototype.getDisplacementsSuite = function() {
            return [
                new Chess.Movement.Displacement(1, 1, true),
                new Chess.Movement.Displacement(1, -1, true),
                new Chess.Movement.Displacement(-1, -1, true),
                new Chess.Movement.Displacement(-1, 1, true)
            ];
        };

        return Bishop;

    })();

    return Chess;

})(Chess || {});