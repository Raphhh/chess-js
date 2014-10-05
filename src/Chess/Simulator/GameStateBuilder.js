var Chess = (function(Chess) {
    'use strict';

    Chess.Simulator = Chess.Simulator || {};

    Chess.Simulator.GameStateBuilder = (function() {

        function GameStateBuilder() {
            this.__internal__ = {
                gameState: null
            };
        }

        GameStateBuilder.prototype.getGameState = function() {
            return this.__internal__.gameState;
        };

        GameStateBuilder.prototype.createGameState = function(game, playingColor) {
            game = game.exportToJson();
            if(playingColor) {
                game.playingColor = playingColor.getValue();
            }
            game = new Chess.Game(game);
            this.__internal__.gameState = new Chess.Simulator.GameState(game);
            return this;
        };

        GameStateBuilder.prototype.changePiecePosition = function(piece, position) {
            piece = this.__internal__.gameState.getGame().getBoard().getPieceByPosition(piece.getSquare().getPosition());
            this.__internal__.gameState.getGame().getCoordinator().moveTo(piece, position);
            return this;
        };

        return GameStateBuilder;

    })();

    return Chess;

})(Chess || {});
