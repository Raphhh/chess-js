var Chess = (function(Chess) {
    'use strict';

    Chess.Simulator = Chess.Simulator || {};

    Chess.Simulator.GameStateBuilder = (function() {

        /**
         *
         * @constructor
         */
        function GameStateBuilder() {
            this.__internal__ = {
                gameState: null
            };
        }

        /**
         *
         * @returns {Chess.Simulator.GameState}
         */
        GameStateBuilder.prototype.getGameState = function() {
            return this.__internal__.gameState;
        };

        /**
         *
         * @param {Chess.Game} game
         * @param {bool} [changePlayingColor]
         * @returns {Chess.Simulator.GameStateBuilder}
         */
        GameStateBuilder.prototype.createGameState = function(game, changePlayingColor) {
            var gameData = game.exportToJson();
            if(changePlayingColor) {
                var colorSwitcher = new Chess.Piece.ColorSwitcher(game.getCoordinator().getPlayingColor());
                gameData.playingColor = colorSwitcher.getNotPlayingColor().getValue();
            }
            this.__internal__.gameState = new Chess.Simulator.GameState(new Chess.Game(gameData));
            return this;
        };

        /**
         *
         * @param {Chess.Piece.Piece} piece
         * @param {Chess.Movement.Position} position
         * @returns {Chess.Simulator.GameStateBuilder}
         */
        GameStateBuilder.prototype.changePiecePosition = function(piece, position) {
            piece = this.__internal__.gameState.getGame().getBoard().getPieceByPosition(piece.getSquare().getPosition());
            this.__internal__.gameState.getGame().getCoordinator().moveTo(piece, position);
            return this;
        };

        return GameStateBuilder;

    })();

    return Chess;

})(Chess || {});
