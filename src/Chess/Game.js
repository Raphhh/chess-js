var Chess = (function(Chess) {
    'use strict';

    Chess.Game = (function() {

        function Game(data) {
            var board = new Chess.Board.Board();
            board.initPieces(data.pieces);

            this.__internal__ = {
                board: board,
                coordinator: new Chess.Movement.Coordinator(board)
            };
        }

        Game.prototype.getBoard = function() {
            return this.__internal__.board;
        };

        Game.prototype.getCoordinator = function() {
            return this.__internal__.coordinator; //todo utiliser un proxy!
        };

        return Game;

    })();

    return Chess;

})(Chess || {});