var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.EnPassantCoordinator = (function() {

        function EnPassantCoordinator(board) {
            this.__internal__ = {
                board: board,
                enPassantEligiblePawn: null,
                pawnPosition: null
            };
        }

        EnPassantCoordinator.prototype.resetEnPassantEligiblePawn = function() {
            this.__internal__.enPassantEligiblePawn = null;
            this.__internal__.pawnPosition = null;
        };

        EnPassantCoordinator.prototype.setEnPassantEligiblePawn = function(piece, position) {
            this.__internal__.enPassantEligiblePawn = piece;
            this.__internal__.pawnPosition = position;
        };

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