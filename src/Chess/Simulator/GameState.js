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
            var pieces = this.__internal__.game.getBoard().getPieces().filter(function(piece){
                return piece.getSquare();
            });
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

        /**
         *
         * @returns Array
         */
        GameState.prototype.getKingKillers = function(){
            return this.getMovablePieces().filter(function(movablePiece){
                var eligibleSquares = movablePiece.getEligibleSquares();
                for(var i = 0, iLen = eligibleSquares.length; i < iLen; ++i){
                    if(eligibleSquares[i].getSquare().getPiece() instanceof Chess.Piece.Type.King) {
                        return true;
                    }
                }
                return false;
            });
        };

        return GameState;

    })();

    return Chess;

})(Chess || {});
