var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.Coordinator = (function() {

        function Coordinator(board) {
            this.__internal__ = {
                board: board
            };

        }

        Coordinator.prototype.moveTo = function(piece, position) {
            if(!this.isEligibleMove(piece, position)) {
                throw new Error('Try an invalid move');
            }
            this.__internal__.board.changePiecePosition(piece, position);
        };

        Coordinator.prototype.isEligibleMove = function(piece, position) {
            var square = this.__internal__.board.getSquareByPosition(position);
            return this.getEligibleSquares(piece).indexOf(square) >= 0;
        };

        Coordinator.prototype.getEligibleSquares = function(piece) {

            if(!piece.getSquare()) {
                throw new Error('You must add the Piece to the board before trying to move it');
            }

            var mover = new Chess.Movement.Mover(piece.getSquare().getPosition(), piece.getDisplacementsSuite()),
                newPosition,
                square,
                result = [],
                changeDirection = false;

            while((newPosition = mover.moveOnce(changeDirection)) !== null) {
                try {
                    square = this.__internal__.board.getSquareByPosition(newPosition);
                } catch(error) { //we are out of board
                    square = null;
                }

                if(square && square.isValidForNewPiece(piece)) {
                    result.push(square);
                    changeDirection = !mover.getCurrentDisplacement().isExtensible() || square.getPiece();
                } else {
                    changeDirection = true;
                }
            }

            return result;
        };

        return Coordinator;

    })();

    return Chess;

})(Chess || {});