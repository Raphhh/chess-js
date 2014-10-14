var Chess = (function(Chess) {
    'use strict';

    Chess.Game = (function() {

        var buildEnPassantEligiblePawn = function() { //todo delegate this stuff
            return this.getBoard().getPieceByPosition(
                new Chess.Movement.Position(
                    this.__internal__.data.enPassantContext.position.x,
                    this.__internal__.data.enPassantContext.position.y
                )
            );
        };

        var buildEnPassantEligiblePawnPosition = function() {  //todo delegate this stuff
            return new Chess.Movement.Position(
                this.__internal__.data.enPassantContext.position.x,
                this.__internal__.data.enPassantContext.position.y
            );
        };

        var getEnPassantCoordinator = function() {  //todo delegate this stuff
            if(null === this.__internal__.enPassantCoordinator) {
                this.__internal__.enPassantCoordinator = new Chess.Movement.Pawn.EnPassantCoordinator(
                    this.getBoard(),
                    this.__internal__.data.enPassantContext ? buildEnPassantEligiblePawn.call(this) : null,
                    this.__internal__.data.enPassantContext ? buildEnPassantEligiblePawnPosition.call(this) : null
                );
            }
            return this.__internal__.enPassantCoordinator;
        };

        function Game(data) {
            this.__internal__ = {
                data: data,
                board: null,
                coordinator: null,
                enPassantCoordinator: null
            };
        }

        Game.prototype.getBoard = function() {
            if(null === this.__internal__.board) {
                this.__internal__.board = new Chess.Board.Board();
                this.__internal__.board.initPieces(this.__internal__.data.pieces || []);
            }
            return this.__internal__.board;
        };

        Game.prototype.getCoordinator = function() { //todo delegate this stuff
            if(null === this.__internal__.coordinator) {
                this.__internal__.coordinator = new Chess.Movement.Coordinator(
                    this.getBoard(),
                    new Chess.Piece.ColorSwitcher(
                        new Chess.Piece.Color(this.__internal__.data.playingColor || Chess.Piece.Color.WHITE)
                    ),
                    new Chess.Movement.DisplacementsCalculator(this),
                    new Chess.Movement.Pawn.EnPassantContext(
                        getEnPassantCoordinator.call(this),
                        new Chess.Movement.Pawn.PawnDisplacementAnalyser()
                    )
                );
            }
            return this.__internal__.coordinator; //todo utiliser un proxy!
        };

        Game.prototype.exportToJson = function() { //todo rename in export (because it is not a json)
            //todo delegate this stuff
            var data = {
                playingColor: this.getCoordinator().getPlayingColor().getValue(),
                pieces: this.getBoard().exportPieces()
            };

            var pawnPosition = getEnPassantCoordinator.call(this).getPawnPosition();
            if(pawnPosition) {
                data.enPassantContext = {
                    position: {
                        x: pawnPosition.getX(),
                        y: pawnPosition.getY()
                    }
                };
            }

            return data;
        };

        Game.prototype.isInCheck = function() {//todo delegate this stuff
            var colorSwitcher = new Chess.Piece.ColorSwitcher(this.getCoordinator().getPlayingColor());
            var builder = new Chess.Simulator.GameStateBuilder();
            builder.createGameState(this, colorSwitcher.getNotPlayingColor());
            var movablePieces = builder.getGameState().getMovablePieces();
            for(var i = 0, iLen = movablePieces.length; i < iLen; ++i) {
                var eligibleSquares = movablePieces[i].getEligibleSquares();
                for(var j = 0, jLen = eligibleSquares.length; j < jLen; ++j) {
                    if(eligibleSquares[j].getSquare().getPiece() instanceof Chess.Piece.Type.King) {
                        return true;
                    }
                }
            }
            return false;
        };

        return Game;

    })();

    return Chess;

})(Chess || {});