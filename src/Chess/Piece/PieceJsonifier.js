var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};

    Chess.Piece.PieceJsonifier = (function() {

        /**
         *
         * @constructor
         */
        function PieceJsonifier() {
        }

        /**
         *
         * @param {Object} pieceData
         * @returns {Chess.Piece.Piece}
         */
        PieceJsonifier.prototype.importFromJson = function(pieceData) {
            var factory = new Chess.Piece.PieceFactory();
            return factory.create(pieceData.type, pieceData.color, pieceData.displacementsNumber);
        };

        /**
         *
         * @param {Chess.Piece.Piece} piece
         * @returns {{type: string, color: string, displacementsNumber: int}}
         */
        PieceJsonifier.prototype.exportToJson = function(piece) {
            return {
                type: piece.constructor.name.toLowerCase(), //todo IE compatibility
                color: piece.getColor().getValue(),
                displacementsNumber: piece.getDisplacementsNumber()
            };
        };

        return PieceJsonifier;

    })();

    return Chess;

})(Chess || {});