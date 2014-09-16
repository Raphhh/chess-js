var Chess = (function() {
    'use strict';

    function Chess() {
    }

    Chess.VERSION = '0.0.0';

    return Chess;
})();


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
            var factory = new Chess.Piece.PieceFactory();
            for(var i = 0, len = piecesData.length; i < len; ++i) {
                this.addPiece(
                    factory.createByData(piecesData[i]),
                    new Chess.Movement.Position(piecesData[i].position.x, piecesData[i].position.y)
                );
            }
        };

        Board.prototype.addPiece = function(piece, position) {
            this.changePiecePosition(piece, position);
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

var Chess = (function(Chess) {
    'use strict';

    Chess.Board = Chess.Board || {};

    Chess.Board.Square = (function() {

        function Square(position) {
            this.__internal__ = {
                position: position,
                piece: null
            };
        }

        Square.prototype.getPosition = function() {
            return this.__internal__.position;
        };

        Square.prototype.setPiece = function(piece) {
            this.__internal__.piece = piece;
        };

        Square.prototype.removePiece = function() {
            this.__internal__.piece = null;
        };

        Square.prototype.getPiece = function() {
            return this.__internal__.piece;
        };

        Square.prototype.isValidForNewPiece = function(piece) {
            return !this.getPiece() || this.getPiece().getColor().getValue() !== piece.getColor().getValue();
        };

        return Square;

    })();

    return Chess;

})(Chess || {});

var Chess = (function(Chess) {
    'use strict';

    Chess.Board = Chess.Board || {};

    Chess.Board.SquareAssociator = (function() {

        function SquareAssociator(piece, destinationSquare) {
            this.__internal__ = {
                piece: piece,
                destinationSquare: destinationSquare
            };
        }

        SquareAssociator.prototype.run = function() {
            this.validDestinationSquare();
            this.cleanOriginSquare();
            this.cleanDestinationSquare();
            this.associate();
        };

        SquareAssociator.prototype.validDestinationSquare = function() {
            if(!this.__internal__.destinationSquare.isValidForNewPiece(this.__internal__.piece)) {
                throw new Error('Square is not valid for the piece');
            }
        };

        SquareAssociator.prototype.cleanOriginSquare = function() {
            if(this.__internal__.piece.getSquare()) {
                this.__internal__.piece.getSquare().removePiece();
            }
        };

        SquareAssociator.prototype.cleanDestinationSquare = function() {
            if(this.__internal__.destinationSquare.getPiece()) {
                this.__internal__.destinationSquare.getPiece().die();
                this.__internal__.destinationSquare.removePiece();
            }
        };

        SquareAssociator.prototype.associate = function() {
            this.__internal__.destinationSquare.setPiece(this.__internal__.piece);
            this.__internal__.piece.setSquare(this.__internal__.destinationSquare);
        };

        return SquareAssociator;

    })();

    return Chess;

})(Chess || {});

var Chess = (function(Chess) {
    'use strict';

    Chess.Game = (function() {

        function Game(data) {
            var board = new Chess.Board.Board();
            board.initPieces(data.pieces);

            this.__internal__ = {
                board: board,
                coordinator: new Chess.Movement.Coordinator(board)
            };
        }

        Game.prototype.getBoard = function() {
            return this.__internal__.board;
        };

        Game.prototype.getCoordinator = function() {
            return this.__internal__.coordinator; //todo utiliser un proxy!
        };

        return Game;

    })();

    return Chess;

})(Chess || {});

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

var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.Displacement = (function() {

        function Displacement(x, y, isExtensible, filter) {
            this.__internal__ = {
                x: x,
                y: y,
                isExtensible: isExtensible,
                filter: filter || function() {
                    return true;
                }
            };
        }

        Displacement.prototype.getX = function() {
            return this.__internal__.x;
        };

        Displacement.prototype.getY = function() {
            return this.__internal__.y;
        };

        Displacement.prototype.isExtensible = function() {
            return this.__internal__.isExtensible;
        };

        Displacement.prototype.isValid = function(square) {
            return this.__internal__.filter(square);
        };

        return Displacement;

    })();

    return Chess;

})(Chess || {});


var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.DisplacementType = (function() {

        function DisplacementType(vectors, isExtensible) {
            this.vectors = vectors;
            this.isExtensible = isExtensible;
        }

        return DisplacementType;

    })();

    return Chess;

})(Chess || {});


var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.Mover = (function() {

        var moveXPosition = function() {
            return this.__internal__.position.getX() + this.getCurrentDisplacement().getX();
        };

        var moveYPosition = function() {
            return this.__internal__.position.getY() + this.getCurrentDisplacement().getY();
        };

        function Mover(position, displacementsSuite) {
            this.__internal__ = {
                position: position,
                initialPosition: position,
                displacementsSuite: displacementsSuite,
                currentDirectionId: 0
            };
        }

        Mover.prototype.moveOnce = function(changeDirection) {

            if(changeDirection) {
                if(++this.__internal__.currentDirectionId >= this.__internal__.displacementsSuite.length) {
                    return null;
                }
                this.__internal__.position = this.__internal__.initialPosition;
            }

            this.__internal__.position = new Chess.Movement.Position(moveXPosition.call(this), moveYPosition.call(this));
            return this.__internal__.position;
        };

        Mover.prototype.getCurrentDisplacement = function() {
            if(this.__internal__.displacementsSuite[this.__internal__.currentDirectionId]) {
                return this.__internal__.displacementsSuite[this.__internal__.currentDirectionId];
            }
            return null;
        };

        return Mover;

    })();

    return Chess;

})(Chess || {});

var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.Position = (function() {

        var xMappging = 'abcdefgh';
        var yMappging = '12345678';

        function Position(x, y) {
            this.__internal__ = {
                x: x,
                y: y
            };
        }

        Position.createByAlgebraicNotation = function(algebraicNotation) {
            var splitNotation = algebraicNotation.split('');
            return new Position(
                xMappging.indexOf(splitNotation[0]),
                yMappging.indexOf(splitNotation[1])
            );
        };

        Position.prototype.getX = function() {
            return this.__internal__.x;
        };

        Position.prototype.getY = function() {
            return this.__internal__.y;
        };

        Position.prototype.toAlgebraicNotation = function() {
            return xMappging.charAt(this.getX()) + yMappging.charAt(this.getY());
        };

        return Position;

    })();

    return Chess;

})(Chess || {});


var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};

    Chess.Piece.Color = (function() {

        function Color(value) {
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

var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};

    Chess.Piece.Piece = (function() {

        function Piece(color) {
            this.__internal__ = {
                color: color,
                square: null
            };
        }

        Piece.prototype.getName = function() {
            return '';
        };

        Piece.prototype.getColor = function() {
            return this.__internal__.color;
        };

        Piece.prototype.getSquare = function() {
            return this.__internal__.square;
        };

        Piece.prototype.setSquare = function(square) {
            this.__internal__.square = square;
        };

        Piece.prototype.die = function() {
            this.__internal__.square = null;
        };

        Piece.prototype.getDisplacementsSuite = function() {
            return [];
        };

        return Piece;

    })();

    return Chess;

})(Chess || {});

var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};

    Chess.Piece.PieceFactory = (function() {

        var capitalize = function(text) {
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        };

        function PieceFactory() {
            Chess.Reflection.ClassReflection.extend(Chess.Piece.Type.Pawn, Chess.Piece.Piece);
            Chess.Reflection.ClassReflection.extend(Chess.Piece.Type.Rook, Chess.Piece.Piece);
            Chess.Reflection.ClassReflection.extend(Chess.Piece.Type.Knight, Chess.Piece.Piece);
            Chess.Reflection.ClassReflection.extend(Chess.Piece.Type.Bishop, Chess.Piece.Piece);
            Chess.Reflection.ClassReflection.extend(Chess.Piece.Type.Queen, Chess.Piece.Piece);
            Chess.Reflection.ClassReflection.extend(Chess.Piece.Type.King, Chess.Piece.Piece);
        }

        PieceFactory.prototype.create = function(type, color) {
            return new Chess.Piece.Type[capitalize(type)](new Chess.Piece.Color(color));
        };

        PieceFactory.prototype.createByData = function(pieceData) {
            return this.create(pieceData.type, pieceData.color);
        };

        return PieceFactory;

    })();

    return Chess;

})(Chess || {});

var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};
    Chess.Piece.Type = Chess.Piece.Type || {};

    Chess.Piece.Type.Bishop = (function() {

        function Bishop(color) {
            this.__super__.constructor.call(this, color);
        }

        Bishop.prototype.getName = function() {
            return 'B';
        };

        Bishop.prototype.getDisplacementsSuite = function() {
            return [
                new Chess.Movement.Displacement(1, 1, true),
                new Chess.Movement.Displacement(1, -1, true),
                new Chess.Movement.Displacement(-1, -1, true),
                new Chess.Movement.Displacement(-1, 1, true)
            ];
        };

        return Bishop;

    })();

    return Chess;

})(Chess || {});

var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};
    Chess.Piece.Type = Chess.Piece.Type || {};

    Chess.Piece.Type.King = (function() {

        function King(color) {
            this.__super__.constructor.call(this, color);
        }

        King.prototype.getName = function() {
            return 'K';
        };

        King.prototype.getDisplacementsSuite = function() {
            return [
                new Chess.Movement.Displacement(0, 1, false),
                new Chess.Movement.Displacement(1, 1, false),
                new Chess.Movement.Displacement(1, 0, false),
                new Chess.Movement.Displacement(1, -1, false),
                new Chess.Movement.Displacement(0, -1, false),
                new Chess.Movement.Displacement(-1, -1, false),
                new Chess.Movement.Displacement(-1, 0, false),
                new Chess.Movement.Displacement(-1, 1, false)
            ];
        };

        return King;

    })();

    return Chess;

})(Chess || {});

var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};
    Chess.Piece.Type = Chess.Piece.Type || {};

    Chess.Piece.Type.Knight = (function() {

        function Knight(color) {
            this.__super__.constructor.call(this, color);
        }

        Knight.prototype.getName = function() {
            return 'N';
        };

        Knight.prototype.getDisplacementsSuite = function() {
            return [
                new Chess.Movement.Displacement(1, 2, false),
                new Chess.Movement.Displacement(2, 1, false),
                new Chess.Movement.Displacement(2, -1, false),
                new Chess.Movement.Displacement(1, -2, false),
                new Chess.Movement.Displacement(-1, -2, false),
                new Chess.Movement.Displacement(-2, -1, false),
                new Chess.Movement.Displacement(-2, 1, false),
                new Chess.Movement.Displacement(-1, 2, false)
            ];
        };

        return Knight;

    })();

    return Chess;

})(Chess || {});

var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};
    Chess.Piece.Type = Chess.Piece.Type || {};

    Chess.Piece.Type.Pawn = (function() {

        function Pawn(color) {
            this.__super__.constructor.call(this, color);
        }

        Pawn.prototype.getName = function() {
            return 'P';
        };

        Pawn.prototype.getDisplacementsSuite = function() {
            return [
                new Chess.Movement.Displacement(
                    0,
                    this.getColor().isWhite() ? 1 : -1,
                    false
                )
            ];

        };

        return Pawn;

    })();

    return Chess;

})(Chess || {});

var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};
    Chess.Piece.Type = Chess.Piece.Type || {};

    Chess.Piece.Type.Queen = (function() {

        function Queen(color) {
            this.__super__.constructor.call(this, color);
        }

        Queen.prototype.getName = function() {
            return 'Q';
        };

        Queen.prototype.getDisplacementsSuite = function() {
            return [
                new Chess.Movement.Displacement(0, 1, true),
                new Chess.Movement.Displacement(1, 1, true),
                new Chess.Movement.Displacement(1, 0, true),
                new Chess.Movement.Displacement(1, -1, true),
                new Chess.Movement.Displacement(0, -1, true),
                new Chess.Movement.Displacement(-1, -1, true),
                new Chess.Movement.Displacement(-1, 0, true),
                new Chess.Movement.Displacement(-1, 1, true)
            ];
        };

        return Queen;

    })();

    return Chess;

})(Chess || {});

var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};
    Chess.Piece.Type = Chess.Piece.Type || {};

    Chess.Piece.Type.Rook = (function() {

        function Rook(color) {
            this.__super__.constructor.call(this, color);
        }

        Rook.prototype.getName = function() {
            return 'R';
        };

        Rook.prototype.getDisplacementsSuite = function() {
            return [
                new Chess.Movement.Displacement(0, 1, true),
                new Chess.Movement.Displacement(1, 0, true),
                new Chess.Movement.Displacement(0, -1, true),
                new Chess.Movement.Displacement(-1, 0, true)

            ];
        };

        return Rook;

    })();

    return Chess;

})(Chess || {});

var Chess = (function(Chess) {
    'use strict';

    Chess.Reflection = Chess.Reflection || {};

    Chess.Reflection.ClassReflection = {

        extend: function(childClass, parentClass) {

            if(childClass instanceof parentClass) {
                return;
            }

            var childPrototype = childClass.prototype;
            childClass.prototype = this.clone(parentClass.prototype);

            for(var property in childPrototype) {
                childClass.prototype[property] = childPrototype[property];
            }

            childClass.prototype.constructor = childClass;
            childClass.prototype.__super__ = parentClass.prototype;
        },

        clone: function(object) {
            var F = function F() {
            };
            F.prototype = object;
            return new F();
        }
    };

    return Chess;

})(Chess || {});