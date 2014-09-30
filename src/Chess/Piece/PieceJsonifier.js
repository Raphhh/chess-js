var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};

    Chess.Piece.PieceJsonifier = (function() {

        function PieceJsonifier() {
        }

        PieceJsonifier.prototype.importFromJson = function(pieceData) {
            var factory = new Chess.Piece.PieceFactory();
            return factory.create(pieceData.type, pieceData.color, pieceData.displacementsNumber);
        };

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