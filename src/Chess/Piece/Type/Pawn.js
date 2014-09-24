var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};
    Chess.Piece.Type = Chess.Piece.Type || {};

    Chess.Piece.Type.Pawn = (function() {

        function Pawn(color, displacementsNumber) {
            this.__super__.constructor.call(this, color, displacementsNumber);
        }

        Pawn.prototype.getName = function() {
            return 'P';
        };

        Pawn.prototype.getDisplacementsSuite = function() {
            var that = this;
            return [
                new Chess.Movement.Displacement(
                    0,
                    this.getColor().getDirection(),
                    function(squareDisplacementsNumber) {
                        return !that.__internal__.displacementsNumber && squareDisplacementsNumber < 2;
                    },
                    function(square) {
                        return !square.getPiece();
                    }
                ),
                new Chess.Movement.Displacement(
                    -1,
                    this.getColor().getDirection(),
                    false,
                    function(square) {
                        return Boolean(square.getPiece());
                    }
                ),
                new Chess.Movement.Displacement(
                    1,
                    this.getColor().getDirection(),
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