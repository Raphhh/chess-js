var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};
    Chess.Piece.Type = Chess.Piece.Type || {};

    Chess.Piece.Type.Knight = (function() {

        function Knight(color, displacementsNumber) {
            this.__super__.constructor.call(this, color, displacementsNumber);
        }

        Knight.prototype.getName = function() {
            return 'N';
        };

        Knight.prototype.getDisplacementsSuite = function() {
            return [
                new Chess.Movement.Displacement(1, 2, false),
                new Chess.Movement.Displacement(2, 1, false),
                new Chess.Movement.Displacement(2, -1, false),
                new Chess.Movement.Displacement(1, -2, false),
                new Chess.Movement.Displacement(-1, -2, false),
                new Chess.Movement.Displacement(-2, -1, false),
                new Chess.Movement.Displacement(-2, 1, false),
                new Chess.Movement.Displacement(-1, 2, false)
            ];
        };

        return Knight;

    })();

    return Chess;

})(Chess || {});