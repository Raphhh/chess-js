var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.DisplacementsCalculator = (function() {

        function DisplacementsCalculator(board) {
            this.__internal__ = {
                board: board
            };
        }

        DisplacementsCalculator.prototype.getEligibleSquares = function(piece) {

            if(!piece.getSquare()) {
                throw new Error('You must add the Piece to the board before trying to move it');
            }

            var mover = new Chess.Movement.Mover(piece.getSquare().getPosition(), piece.getDisplacementsSuite()),
                newPosition,
                square,
                result = [];

            while((newPosition = mover.moveOnce()) !== null) {
                try {
                    square = this.__internal__.board.getSquareByPosition(newPosition);
                } catch(error) { //we are out of board
                    square = null;
                }

                if(square && square.isValidForNewPiece(piece) && mover.getCurrentDisplacement().isValid(square)) {
                    result.push(square);
                    if(!mover.getCurrentDisplacement().isExtensible() || square.getPiece()) {
                        mover.changeDirection();
                    }
                } else {
                    mover.changeDirection();
                }

            }

            return result;
        };

        return DisplacementsCalculator;

    })();

    return Chess;

})(Chess || {});