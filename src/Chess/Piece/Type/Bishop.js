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

        Bishop.prototype.getDisplacementType = function() {
            return new Chess.Movement.DisplacementType(
                [
                    {x: 1, y: 1},
                    {x: 1, y: -1},
                    {x: -1, y: -1},
                    {x: -1, y: 1}
                ],
                true
            );
        };

        return Bishop;

    })();

    return Chess;

})(Chess || {});