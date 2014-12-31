var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};
    Chess.Movement.Pawn = Chess.Movement.Pawn || {};

    Chess.Movement.Pawn.EnPassantContext = (function() {

        /**
         *
         * @param {Chess.Movement.Pawn.EnPassantCoordinator} enPassantCoordinator
         * @param {Chess.Movement.Pawn.PawnDisplacementAnalyser} pawnDisplacementAnalyser
         * @constructor
         */
        function EnPassantContext(enPassantCoordinator, pawnDisplacementAnalyser) {
            this.__internal__ = {
                enPassantCoordinator: enPassantCoordinator,
                pawnDisplacementAnalyser: pawnDisplacementAnalyser
            };
        }

        /**
         *
         * @param {Chess.Piece.Piece} piece
         * @param {Chess.Movement.Position} position
         */
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

        /**
         *
         * @param {Chess.Piece.Piece} piece
         */
        EnPassantContext.prototype.setEnPassantContext = function(piece) {
            if(piece instanceof Chess.Piece.Type.Pawn) {
                this.__internal__.enPassantCoordinator.setEnPassantBoard();
            }
        };

        /**
         *
         */
        EnPassantContext.prototype.restoreInitialContext = function() {
            this.__internal__.enPassantCoordinator.restoreInitialBoard();
        };

        return EnPassantContext;

    })();

    return Chess;

})(Chess || {});