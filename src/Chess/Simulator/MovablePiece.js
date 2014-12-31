var Chess = (function(Chess) {
    'use strict';

    Chess.Simulator = Chess.Simulator || {};

    Chess.Simulator.MovablePiece = (function() {

        /**
         *
         * @param {Chess.Game} game
         * @param {Chess.Piece.Piece} piece
         * @param {Chess.Board.Square[]} squares
         * @constructor
         */
        function MovablePiece(game, piece, squares) {
            this.__internal__ = {
                game: game,
                piece: piece,
                squares: squares
            };
        }

        /**
         *
         * @returns {Chess.Piece.Piece}
         */
        MovablePiece.prototype.getPiece = function() {
            return this.__internal__.piece;
        };

        /**
         *
         * @returns {Chess.Board.Square[]}
         */
        MovablePiece.prototype.getEligibleSquares = function() {
            var result = [];
            for(var i = 0, len = this.__internal__.squares.length; i < len; ++i) {
                result.push(new Chess.Simulator.EligibleSquare(
                    this.__internal__.game,
                    this.__internal__.piece,
                    this.__internal__.squares[i]
                ));
            }
            return result;
        };

        return MovablePiece;

    })();

    return Chess;

})(Chess || {});
