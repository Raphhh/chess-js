var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};
    Chess.Piece.Type = Chess.Piece.Type || {};

    Chess.Piece.Type.Pawn = (function() {

        function Pawn(color) {
            this.__super__.constructor.call(this, color);
        }

        Pawn.prototype.getName = function() {
            return 'P';
        };

        Pawn.prototype.getDisplacementType = function() {
            return new Chess.Movement.DisplacementType(
                [
                    {x: 0, y: this.getColor().isWhite() ? 1 : -1}
                ],
                false
            );
        };

        return Pawn;

    })();

    return Chess;

})(Chess || {});