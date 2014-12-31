var Chess = (function(Chess) {
    'use strict';

    Chess.Simulator = Chess.Simulator || {};

    Chess.Simulator.EligibleSquare = (function() {

        /**
         *
         * @param {Chess.Game} game
         * @param {Chess.Piece.Piece} piece
         * @param {Chess.Board.Square} square
         * @constructor
         */
        function EligibleSquare(game, piece, square) {
            this.__internal__ = {
                game: game,
                piece: piece,
                square: square
            };
        }

        /**
         *
         * @returns {Chess.Board.Square}
         */
        EligibleSquare.prototype.getSquare = function() {
            return this.__internal__.square;
        };

        /**
         *
         * @returns {Chess.Simulator.GameState}
         */
        EligibleSquare.prototype.getGameState = function() {
            var builder = new Chess.Simulator.GameStateBuilder();
            builder.createGameState(this.__internal__.game);
            builder.changePiecePosition(this.__internal__.piece, this.__internal__.square.getPosition());
            return builder.getGameState();
        };

        return EligibleSquare;

    })();

    return Chess;

})(Chess || {});
