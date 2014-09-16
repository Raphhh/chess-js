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

        Pawn.prototype.getDisplacementsSuite = function() {
            var that = this;
            var squareDisplacementNumber = 0;
            return [
                new Chess.Movement.Displacement(
                    0,
                    this.getColor().isWhite() ? 1 : -1,
                    function() {
                        return !that.__internal__.displacementNumber && ++squareDisplacementNumber < 2;
                    },
                    function(square) {
                        return !square.getPiece();
                    }
                ),
                new Chess.Movement.Displacement(
                    -1,
                    this.getColor().isWhite() ? 1 : -1,
                    false,
                    function(square) {
                        return Boolean(square.getPiece());
                    }
                ),
                new Chess.Movement.Displacement(
                    1,
                    this.getColor().isWhite() ? 1 : -1,
                    false,
                    function(square) {
                        return Boolean(square.getPiece());
                    }
                )
            ];

        };

        return Pawn;

    })();

    return Chess;

})(Chess || {});