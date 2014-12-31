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

        GameStateBuilder.prototype.createGameState = function(game, changePlayingColor) {
            var gameData = game.exportToJson();
            if(changePlayingColor) {
                var colorSwitcher = new Chess.Piece.ColorSwitcher(game.getCoordinator().getPlayingColor());
                gameData.playingColor = colorSwitcher.getNotPlayingColor().getValue();
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
