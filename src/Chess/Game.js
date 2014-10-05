var Chess = (function(Chess) {
    'use strict';

    Chess.Game = (function() {

        function Game(data) {
            var playingColor = new Chess.Piece.Color(data.playingColor || Chess.Piece.Color.WHITE);
            var board = new Chess.Board.Board();
            board.initPieces(data.pieces || []);

            this.__internal__ = {
                board: board,
                coordinator: new Chess.Movement.Coordinator(board, playingColor)
            };
        }

        Game.prototype.getBoard = function() {
            return this.__internal__.board;
        };

        Game.prototype.getCoordinator = function() {
            return this.__internal__.coordinator; //todo utiliser un proxy!
        };

        Game.prototype.exportToJson = function() {
            return {
                playingColor: this.__internal__.coordinator.getPlayingColor().getValue(),
                pieces: this.__internal__.board.exportPieces()
            };
        };

        Game.prototype.isInCheck = function() {
            var colorSwitcher = new Chess.Piece.ColorSwitcher(this.__internal__.coordinator.getPlayingColor());
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