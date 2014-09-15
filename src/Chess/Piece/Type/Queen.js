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

        Queen.prototype.getDisplacementType = function() {
            return new Chess.Movement.DisplacementType(
                [
                    {x: 0, y: 1},
                    {x: 1, y: 1},
                    {x: 1, y: 0},
                    {x: 1, y: -1},
                    {x: 0, y: -1},
                    {x: -1, y: -1},
                    {x: -1, y: 0},
                    {x: -1, y: 1}
                ],
                true
            );
        };

        return Queen;

    })();

    return Chess;

})(Chess || {});