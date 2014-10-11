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
            var gameData = game.exportToJson();
            if(playingColor) {
                gameData.playingColor = playingColor.getValue();
            }
            this.__internal__.gameState = new Chess.Simulator.GameState(new Chess.Game(gameData));
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
