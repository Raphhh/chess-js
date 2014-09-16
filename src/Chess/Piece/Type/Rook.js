var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};
    Chess.Piece.Type = Chess.Piece.Type || {};

    Chess.Piece.Type.Rook = (function() {

        function Rook(color) {
            this.__super__.constructor.call(this, color);
        }

        Rook.prototype.getName = function() {
            return 'R';
        };

        Rook.prototype.getDisplacementsSuite = function() {
            return [
                new Chess.Movement.Displacement(0, 1, true),
                new Chess.Movement.Displacement(1, 0, true),
                new Chess.Movement.Displacement(0, -1, true),
                new Chess.Movement.Displacement(-1, 0, true)

            ];
        };

        return Rook;

    })();

    return Chess;

})(Chess || {});