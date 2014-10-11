var Chess = (function(Chess) {
    'use strict';

    Chess.Game = (function() {

        function Game(data) {
            this.__internal__ = {
                data: data,
                board: null,
                coordinator: null
            };
        }

        Game.prototype.getBoard = function() {
            if(null === this.__internal__.board) {
                this.__internal__.board = new Chess.Board.Board();
                this.__internal__.board.initPieces(this.__internal__.data.pieces || []);
            }
            return this.__internal__.board;
        };

        Game.prototype.getCoordinator = function() {
            if(null === this.__internal__.coordinator) {
                this.__internal__.coordinator = new Chess.Movement.Coordinator(
                    this,
                    new Chess.Piece.Color(this.__internal__.data.playingColor || Chess.Piece.Color.WHITE)
                );
            }
            return this.__internal__.coordinator; //todo utiliser un proxy!
        };

        Game.prototype.exportToJson = function() {
            return {
                playingColor: this.getCoordinator().getPlayingColor().getValue(),
                pieces: this.getBoard().exportPieces()
            };
        };

        Game.prototype.isInCheck = function() {
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