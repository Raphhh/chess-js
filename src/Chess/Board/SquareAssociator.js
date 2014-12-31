var Chess = (function(Chess) {
    'use strict';

    Chess.Board = Chess.Board || {};

    Chess.Board.SquareAssociator = (function() {

        /**
         *
         * @param {Chess.Piece.Piece} piece
         * @param {Chess.Board.Square} destinationSquare
         * @constructor
         */
        function SquareAssociator(piece, destinationSquare) {
            this.__internal__ = {
                piece: piece,
                destinationSquare: destinationSquare
            };
        }

        /**
         *
         */
        SquareAssociator.prototype.run = function() {
            this.validDestinationSquare();
            this.cleanOriginSquare();
            this.cleanDestinationSquare();
            this.associate();
        };

        /**
         *
         */
        SquareAssociator.prototype.validDestinationSquare = function() {
            if(!this.__internal__.destinationSquare.isValidForNewPiece(this.__internal__.piece)) {
                throw new Error('Square is not valid for the piece');
            }
        };

        /**
         *
         */
        SquareAssociator.prototype.cleanOriginSquare = function() {
            if(this.__internal__.piece.getSquare()) {
                this.__internal__.piece.getSquare().removePiece();
            }
        };

        /**
         *
         */
        SquareAssociator.prototype.cleanDestinationSquare = function() {
            if(this.__internal__.destinationSquare.getPiece()) {
                this.__internal__.destinationSquare.getPiece().die();
                this.__internal__.destinationSquare.removePiece();
            }
        };

        /**
         *
         */
        SquareAssociator.prototype.associate = function() {
            this.__internal__.destinationSquare.setPiece(this.__internal__.piece);
            this.__internal__.piece.setSquare(this.__internal__.destinationSquare);
        };

        return SquareAssociator;

    })();

    return Chess;

})(Chess || {});