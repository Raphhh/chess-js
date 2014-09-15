var Chess = (function(Chess) {
    'use strict';

    Chess.HumanInterface = (function() {

        var getPosition = function(notation) {
            return Chess.Movement.Position.createByAlgebraicNotation(notation);
        };

        var getPiece = function(notation) {
            return this.__internal__.game.getBoard().getPieceByPosition(getPosition(notation));
        };

        function HumanInterface(game) { //todo: passer une classe contenant le type de notification à appliquer comem stratégie
            this.__internal__ = {
                game: game
            };
        }

        HumanInterface.prototype.move = function(originNotation, destinationNotation) {
            this.__internal__.game.getCoordinator().moveTo(getPiece.call(this, originNotation), getPosition.call(this, destinationNotation));
        };

        HumanInterface.prototype.getEligibleSquares = function(originNotation) {
            var result = [];
            var squares = this.__internal__.game.getCoordinator().getEligibleSquares(getPiece.call(this, originNotation));
            for(var i = 0, len = squares.length; i < len; ++i) {
                result.push(squares[i].getPosition().toAlgebraicNotation());
            }
            return result;
        };

        return HumanInterface;

    })();

    return Chess;

})(Chess || {});