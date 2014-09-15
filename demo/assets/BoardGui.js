var BoardGui = (function($) {
    'use strict';

    var initBoard = function() {
        var board = '<table class="board">';
        for(var y = 7; y >= 0; --y) {
            board += '<tr>';
            for(var x = 0; x < 8; ++x) {
                var position = new Chess.Movement.Position(x, y);
                board += '<td id="square-' + position.toAlgebraicNotation() + '" class="square ' + ((x + y) % 2 ? 'even' : 'odd') + '" data-position="' + position.toAlgebraicNotation() + '"></td>';
            }
            board += '</tr>';
        }
        board += '</table>';
        return board;
    };

    var BoardGui = function(game, interfacer) {
        this.game = game;
        this.interfacer = interfacer;
        this.$board = jQuery(initBoard());
        this.$squares = jQuery('.square', this.$board);
        this.$selectedSquare = null;
        this.initPieces();
        this.initEvents();
    };

    BoardGui.prototype.initPieces = function() {
        var pieces = this.game.getBoard().getPieces();
        for(var i = 0, len = pieces.length; i < len; ++i) {
            jQuery('#square-' + pieces[i].getSquare().getPosition().toAlgebraicNotation(), this.$board).append(pieces[i].getName() + '-' + pieces[i].getColor().getValue().charAt(0));
        }
    };

    BoardGui.prototype.initEvents = function() {
        var that = this;
        this.$squares.click(function() {
            that.clickOnSquare(jQuery(this));
        });
    };

    BoardGui.prototype.clickOnSquare = function($square) {
        if($square.hasClass('selected')) {
            this.resetHighlights();
        } else if($square.hasClass('eligible') && this.$selectedSquare) {
            this.movePiece(this.$selectedSquare, $square);
            this.resetHighlights();
        } else if($square.html()) {
            this.resetHighlights();
            this.selectPiece($square);
            this.highlightsEligibleSquares($square);
        }
    };

    BoardGui.prototype.resetHighlights = function() {
        this.$squares.removeClass('eligible selected');
    };

    BoardGui.prototype.selectPiece = function($square) {
        $square.addClass('selected');
        this.$selectedSquare = $square;
    };

    BoardGui.prototype.highlightsEligibleSquares = function($originSquare) {
        var possibleSquares = this.interfacer.getEligibleSquares($originSquare.data('position'));
        for(var i = 0, len = possibleSquares.length; i < len; ++i) {
            jQuery('#square-' + possibleSquares[i], this.$board).addClass('eligible');
        }
    };

    BoardGui.prototype.movePiece = function($originSquare, $destinationSquare) {
        try {
            this.interfacer.move($originSquare.data('position'), $destinationSquare.data('position'));
            $destinationSquare.html($originSquare.html());
            $originSquare.html('');
            this.$selectedSquare = null;
        } catch(e) {
            alert(e.message);
        }
    };

    return BoardGui;

})(jQuery);