var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};
    Chess.Piece.Type = Chess.Piece.Type || {};

    Chess.Piece.Type.King = (function() {

        function King(color, displacementsNumber) {
            this.__super__.constructor.call(this, color, displacementsNumber);
        }

        King.prototype.getName = function() {
            return 'K';
        };

        King.prototype.getDisplacementsSuite = function() {
            return [
                new Chess.Movement.Displacement(0, 1, false),
                new Chess.Movement.Displacement(1, 1, false),
                new Chess.Movement.Displacement(1, 0, false),
                new Chess.Movement.Displacement(1, -1, false),
                new Chess.Movement.Displacement(0, -1, false),
                new Chess.Movement.Displacement(-1, -1, false),
                new Chess.Movement.Displacement(-1, 0, false),
                new Chess.Movement.Displacement(-1, 1, false)
            ];
        };

        return King;

    })();

    return Chess;

})(Chess || {});