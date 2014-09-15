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

        Rook.prototype.getDisplacementType = function() {
            return new Chess.Movement.DisplacementType(
                [
                    {x: 0, y: 1},
                    {x: 1, y: 0},
                    {x: 0, y: -1},
                    {x: -1, y: 0}
                ],
                true
            );
        };

        return Rook;

    })();

    return Chess;

})(Chess || {});