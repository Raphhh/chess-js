var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};
    Chess.Movement.Pawn = Chess.Movement.Pawn || {};

    Chess.Movement.Pawn.EnPassantCoordinator = (function() {

        /**
         *
         * @param {Chess.board.Board} board
         * @param {Pawn} enPassantEligiblePawn
         * @param {Chess.Movement.Position} pawnPosition
         * @constructor
         */
        function EnPassantCoordinator(board, enPassantEligiblePawn, pawnPosition) {
            this.__internal__ = {
                board: board,
                enPassantEligiblePawn: enPassantEligiblePawn || null,
                pawnPosition: pawnPosition || null
            };
        }

        /**
         *
         * @returns {Pawn}
         */
        EnPassantCoordinator.prototype.getEnPassantEligiblePawn = function() {
            return this.__internal__.enPassantEligiblePawn;
        };

        /**
         *
         * @returns {Chess.Movement.Position}
         */
        EnPassantCoordinator.prototype.getPawnPosition = function() {
            return this.__internal__.pawnPosition;
        };

        /**
         *
         */
        EnPassantCoordinator.prototype.resetEnPassantEligiblePawn = function() {
            this.__internal__.enPassantEligiblePawn = null;
            this.__internal__.pawnPosition = null;
        };

        /**
         *
         * @param {Pawn} piece
         * @param {Chess.Movement.Position} position
         */
        EnPassantCoordinator.prototype.setEnPassantEligiblePawn = function(piece, position) {
            this.__internal__.enPassantEligiblePawn = piece;
            this.__internal__.pawnPosition = position;
        };

        /**
         *
         */
        EnPassantCoordinator.prototype.setEnPassantBoard = function() {
            if(this.__internal__.enPassantEligiblePawn && this.__internal__.pawnPosition) {
                this.__internal__.board.changePiecePosition(
                    this.__internal__.enPassantEligiblePawn,
                    new Chess.Movement.Position(
                        this.__internal__.pawnPosition.getX(),
                        this.__internal__.pawnPosition.getY() - this.__internal__.enPassantEligiblePawn.getColor().getDirection()
                    )
                );
            }
        };

        /**
         *
         */
        EnPassantCoordinator.prototype.restoreInitialBoard = function() {
            if(this.__internal__.enPassantEligiblePawn && this.__internal__.pawnPosition) {
                try {
                    this.__internal__.board.changePiecePosition(
                        this.__internal__.enPassantEligiblePawn,
                        this.__internal__.pawnPosition
                    );
                } catch(e) {
                    //todo le pawn était déjà à sa place
                }
            }
        };

        return EnPassantCoordinator;

    })();

    return Chess;

})(Chess || {});