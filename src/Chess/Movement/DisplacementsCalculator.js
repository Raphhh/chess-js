var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.DisplacementsCalculator = (function() {

        /**
         *
         * @type {boolean}
         */
        var isSimulation = false;

        /**
         *
         * @param {Chess.Game} game
         * @param {Chess.Piece.Piece} piece
         * @param {Chess.Movement.Position} position
         * @returns {boolean}
         */
        var willBeInCheck = function(game, piece, position){
            if(isSimulation){
                return false;
            }

            isSimulation = true;
            var builder = new Chess.Simulator.GameStateBuilder();
            builder.createGameState(game);
            builder.changePiecePosition(piece, position);
            var result = builder.getGameState().getGame().isInCheck(true);
            isSimulation = false;
            return result;
        };

        /**
         *
         * @param {Chess.Game} game
         * @constructor
         */
        function DisplacementsCalculator(game) {
            this.__internal__ = {
                game: game
            };
        }

        /**
         *
         * @param {Chess.Piece.Piece} piece
         * @returns {Chess.Board.Square[]}
         */
        DisplacementsCalculator.prototype.getEligibleSquares = function(piece) {

            if(!piece.getSquare()) {
                throw new Error('You must add the Piece to the board before trying to move it');
            }

            var mover = new Chess.Movement.Mover(piece.getSquare().getPosition(), piece.getDisplacementsSuite()),
                newPosition,
                square,
                result = [],
                i = 0;

            while((newPosition = mover.moveOnce()) !== null) {
                try {
                    square = this.__internal__.game.getBoard().getSquareByPosition(newPosition);
                } catch(error) { //we are out of board
                    square = null;
                }

                if(square
                    && square.isValidForNewPiece(piece)
                    && mover.getCurrentDisplacement().isValid(square)
                    && !willBeInCheck(this.__internal__.game, piece, newPosition)
                ) {
                    result.push(square);
                    if(!mover.getCurrentDisplacement().isExtensible(++i) || square.getPiece()) {
                        i = 0;
                        mover.changeDirection();
                    }
                } else {
                    i = 0;
                    mover.changeDirection();
                }

            }

            return result;
        };

        return DisplacementsCalculator;

    })();

    return Chess;

})(Chess || {});