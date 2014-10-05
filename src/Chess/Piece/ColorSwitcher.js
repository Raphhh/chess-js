var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};

    Chess.Piece.ColorSwitcher = (function() {

        function ColorSwitcher(playingColor) {
            this.__internal__ = {
                playingColor: playingColor
            };
        }

        ColorSwitcher.prototype.getPlayingColor = function() {
            return this.__internal__.playingColor;
        };

        ColorSwitcher.prototype.getNotPlayingColor = function() {
            if(this.__internal__.playingColor.isWhite()) {
                return new Chess.Piece.Color(Chess.Piece.Color.BLACK);
            } else {
                return new Chess.Piece.Color(Chess.Piece.Color.WHITE);
            }
        };

        ColorSwitcher.prototype.isPlayingColor = function(color) {
            return this.__internal__.playingColor.getValue() === color.getValue();
        };

        ColorSwitcher.prototype.switchColor = function() {
            this.__internal__.playingColor = this.getNotPlayingColor();
        };

        return ColorSwitcher;

    })();

    return Chess;

})(Chess || {});