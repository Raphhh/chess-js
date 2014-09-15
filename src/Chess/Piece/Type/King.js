var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};
    Chess.Piece.Type = Chess.Piece.Type || {};

    Chess.Piece.Type.King = (function() {

        function King(color) {
            this.__super__.constructor.call(this, color);
        }

        King.prototype.getName = function() {
            return 'K';
        };

        King.prototype.getDisplacementType = function() {
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
                false
            );
        };

        return King;

    })();

    return Chess;

})(Chess || {});