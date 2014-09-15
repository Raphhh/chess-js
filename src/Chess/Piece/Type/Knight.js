var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};
    Chess.Piece.Type = Chess.Piece.Type || {};

    Chess.Piece.Type.Knight = (function() {

        function Knight(color) {
            this.__super__.constructor.call(this, color);
        }

        Knight.prototype.getName = function() {
            return 'N';
        };

        Knight.prototype.getDisplacementType = function() {
            return new Chess.Movement.DisplacementType(
                [
                    {x: 1, y: 2},
                    {x: 2, y: 1},
                    {x: 2, y: -1},
                    {x: 1, y: -2},
                    {x: -1, y: -2},
                    {x: -2, y: -1},
                    {x: -2, y: 1},
                    {x: -1, y: 2}
                ],
                false
            );
        };

        return Knight;

    })();

    return Chess;

})(Chess || {});