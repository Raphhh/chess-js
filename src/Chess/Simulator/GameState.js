var Chess = (function(Chess) {
    'use strict';

    Chess.Simulator = Chess.Simulator || {};

    Chess.Simulator.GameState = (function() {

        function GameState(game) {
            this.__internal__ = {
                game: game
            };
        }

        GameState.prototype.getGame = function() {
            return this.__internal__.game;
        };

        GameState.prototype.getMovablePieces = function() {
            var result = [];
            var pieces = this.__internal__.game.getBoard().getPieces();
            for(var i = 0, len = pieces.length; i < len; ++i) {
                var squares = this.__internal__.game.getCoordinator().getEligibleSquares(pieces[i]);
                if(squares.length) {
                    result.push(new Chess.Simulator.MovablePiece(
                        this.__internal__.game,
                        pieces[i],
                        squares
                    ));
                }
            }
            return result;
        };

        return GameState;

    })();

    return Chess;

})(Chess || {});
