var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.EnPassantContext = (function() {

        function EnPassantContext(enPassantCoordinator, pawnDisplacementAnalyser) {
            this.__internal__ = {
                enPassantCoordinator: enPassantCoordinator,
                pawnDisplacementAnalyser: pawnDisplacementAnalyser
            };
        }

        EnPassantContext.prototype.synchronizeContextBeforeDisplacement = function(piece, position) {
            if(this.__internal__.pawnDisplacementAnalyser.isPawnCaptureDisplacement(piece, position)) {
                this.__internal__.enPassantCoordinator.setEnPassantBoard();
            }

            //todo séparer la méthode fait 2 choses?
            this.__internal__.enPassantCoordinator.resetEnPassantEligiblePawn();
            if(this.__internal__.pawnDisplacementAnalyser.isPawnDoubleSquareDisplacement(piece, position)) {
                this.__internal__.enPassantCoordinator.setEnPassantEligiblePawn(piece, position);
            }
        };

        EnPassantContext.prototype.setEnPassantContext = function(piece) {
            if(piece instanceof Chess.Piece.Type.Pawn) {
                this.__internal__.enPassantCoordinator.setEnPassantBoard();
            }
        };

        EnPassantContext.prototype.restoreInitialContext = function() {
            this.__internal__.enPassantCoordinator.restoreInitialBoard();
        };

        return EnPassantContext;

    })();

    return Chess;

})(Chess || {});