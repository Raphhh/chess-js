var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};

    Chess.Piece.Color = (function() {

        function Color(value) {
            if(value !== Color.BLACK && value !== Color.WHITE) {
                throw new Error('Color value must be Color.BLACK or Color.WHITE');
            }

            this.__internal__ = {
                value: value
            };
        }

        Color.BLACK = 'black';

        Color.WHITE = 'white';

        Color.prototype.getValue = function() {
            return this.__internal__.value;
        };

        Color.prototype.isBlack = function() {
            return this.__internal__.value === Color.BLACK;
        };

        Color.prototype.isWhite = function() {
            return this.__internal__.value === Color.WHITE;
        };

        Color.prototype.getDirection = function() {
            if(this.isBlack()) {
                return -1;
            }
            return 1;
        };

        return Color;

    })();

    return Chess;

})(Chess || {});