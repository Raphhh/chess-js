var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};

    Chess.Piece.PieceFactory = (function() {

        /**
         *
         * @param text
         * @returns {string}
         */
        var capitalize = function(text) {
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        };

        /**
         *
         * @constructor
         */
        function PieceFactory() {
            Chess.Reflection.ClassReflection.extend(Chess.Piece.Type.Pawn, Chess.Piece.Piece);
            Chess.Reflection.ClassReflection.extend(Chess.Piece.Type.Rook, Chess.Piece.Piece);
            Chess.Reflection.ClassReflection.extend(Chess.Piece.Type.Knight, Chess.Piece.Piece);
            Chess.Reflection.ClassReflection.extend(Chess.Piece.Type.Bishop, Chess.Piece.Piece);
            Chess.Reflection.ClassReflection.extend(Chess.Piece.Type.Queen, Chess.Piece.Piece);
            Chess.Reflection.ClassReflection.extend(Chess.Piece.Type.King, Chess.Piece.Piece);
        }

        /**
         *
         * @param {string} type
         * @param {string} color
         * @param {int} displacementsNumber
         * @returns {Chess.Piece.Piece}
         */
        PieceFactory.prototype.create = function(type, color, displacementsNumber) {
            return new Chess.Piece.Type[capitalize(type)](new Chess.Piece.Color(color), displacementsNumber);
        };

        return PieceFactory;

    })();

    return Chess;

})(Chess || {});