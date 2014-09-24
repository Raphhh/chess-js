var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.PawnDisplacementAnalyser = (function() {

        function PawnDisplacementAnalyser() {

        }

        PawnDisplacementAnalyser.prototype.isPawnDoubleSquareDisplacement = function(piece, position) {
            if(!piece.getSquare()) {
                throw new Error('Piece has currently no square');
            }
            if(piece instanceof Chess.Piece.Type.Pawn) {
                return Math.abs(piece.getSquare().getPosition().getY() - position.getY()) === 2;
            }
            return false;
        };

        PawnDisplacementAnalyser.prototype.isPawnCaptureDisplacement = function(piece, position) {
            if(!piece.getSquare()) {
                throw new Error('Piece has currently no square');
            }
            if(piece instanceof Chess.Piece.Type.Pawn) {
                return Math.abs(piece.getSquare().getPosition().getX() - position.getX()) === 1;
            }
            return false;
        };

        return PawnDisplacementAnalyser;

    })();

    return Chess;

})(Chess || {});