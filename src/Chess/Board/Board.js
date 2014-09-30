var Chess = (function(Chess) {
    'use strict';

    Chess.Board = Chess.Board || {};

    Chess.Board.Board = (function() {

        var initSquares = function() {
            for(var x = 0; x < 8; ++x) {
                this.__internal__.squares.push([]);
                for(var y = 0; y < 8; ++y) {
                    this.__internal__.squares[x].push(new Chess.Board.Square(new Chess.Movement.Position(x, y)));
                }
            }
        };

        function Board() {
            this.__internal__ = {
                pieces: [],
                squares: []
            };
            initSquares.call(this);
        }

        Board.prototype.getSquareByPosition = function(position) {
            if(!this.__internal__.squares[position.getX()]) {
                throw new Error('Position x (' + position.getX() + ') out of board');
            }
            if(!this.__internal__.squares[position.getX()][position.getY()]) {
                throw new Error('Position y (' + position.getY() + ') out of board');
            }
            return this.__internal__.squares[position.getX()][position.getY()];
        };

        Board.prototype.getPieces = function() {
            return this.__internal__.pieces;
        };

        Board.prototype.getPieceByPosition = function(position) {
            return this.getSquareByPosition(position).getPiece();
        };

        Board.prototype.initPieces = function(piecesData) {
            var pieceJsonifier = new Chess.Piece.PieceJsonifier();
            var positionJsonifier = new Chess.Movement.PositionJsonifier();
            for(var i = 0, len = piecesData.length; i < len; ++i) {
                if(piecesData[i].position) {
                    this.addPiece(
                        pieceJsonifier.importFromJson(piecesData[i]),
                        positionJsonifier.importFromJson(piecesData[i].position)
                    );
                } else {
                    this.addPiece(pieceJsonifier.importFromJson(piecesData[i]));
                }
            }
        };

        Board.prototype.exportPieces = function() {
            var result = [];
            var pieceJsonifier = new Chess.Piece.PieceJsonifier();
            var positionJsonifier = new Chess.Movement.PositionJsonifier();
            for(var i = 0, len = this.getPieces().length; i < len; ++i) {
                var piece = pieceJsonifier.exportToJson(this.getPieces()[i]);
                if(this.getPieces()[i].getSquare()) {
                    piece.position = positionJsonifier.exportToJson(this.getPieces()[i].getSquare().getPosition());
                }
                result.push(piece);
            }
            return result;
        };

        Board.prototype.addPiece = function(piece, position) {
            if(position) {
                this.changePiecePosition(piece, position);
            }
            this.__internal__.pieces.push(piece);
        };

        Board.prototype.changePiecePosition = function(piece, position) {
            var associator = new Chess.Board.SquareAssociator(
                piece,
                this.getSquareByPosition(position)
            );
            associator.run();
        };

        return Board;

    })();

    return Chess;

})(Chess || {});