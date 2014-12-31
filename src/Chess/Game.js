var Chess = (function(Chess) {
    'use strict';

    Chess.Game = (function() {

        /**
         *
         * @returns {Chess.Piece.Piece}
         */
        var buildEnPassantEligiblePawn = function() { //todo delegate this stuff
            return this.getBoard().getPieceByPosition(
                new Chess.Movement.Position(
                    this.__internal__.data.enPassantContext.position.x,
                    this.__internal__.data.enPassantContext.position.y
                )
            );
        };

        /**
         *
         * @returns {Chess.Movement.Position}
         */
        var buildEnPassantEligiblePawnPosition = function() {  //todo delegate this stuff
            return new Chess.Movement.Position(
                this.__internal__.data.enPassantContext.position.x,
                this.__internal__.data.enPassantContext.position.y
            );
        };

        /**
         *
         * @returns {Chess.Movement.Pawn.EnPassantCoordinator}
         */
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

        /**
         *
         * @param {Object} data
         * @constructor
         */
        function Game(data) {
            this.__internal__ = {
                data: data,
                board: null,
                coordinator: null,
                enPassantCoordinator: null
            };
        }

        /**
         *
         * @returns {Chess.Board.Board}
         */
        Game.prototype.getBoard = function() {
            if(null === this.__internal__.board) {
                this.__internal__.board = new Chess.Board.Board();
                this.__internal__.board.initPieces(this.__internal__.data.pieces || []);
            }
            return this.__internal__.board;
        };

        /**
         *
         * @returns {Chess.Movement.Coordinator}
         */
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

        /**
         *
         * @returns {Object}
         */
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

        /**
         *
         * @param {bool} [changePlayingColor] - false by default
         * @returns {boolean}
         */
        Game.prototype.isInCheck = function(changePlayingColor) {
            var builder = new Chess.Simulator.GameStateBuilder();
            builder.createGameState(this, !changePlayingColor);
            return Boolean(builder.getGameState().getKingKillers().length);
        };

        return Game;

    })();

    return Chess;

})(Chess || {});