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
            var pieceFactory = new Chess.Piece.PieceFactory();
            var positionFactory = new Chess.Movement.PositionFactory();
            for(var i = 0, len = piecesData.length; i < len; ++i) {
                if(piecesData[i].position) {
                    this.addPiece(
                        pieceFactory.createByData(piecesData[i]),
                        positionFactory.createByData(piecesData[i].position)
                    );
                } else {
                    this.addPiece(pieceFactory.createByData(piecesData[i]));
                }
            }
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
            var playingColor = new Chess.Piece.Color(data.playingColor || Chess.Piece.Color.WHITE);
            var board = new Chess.Board.Board();
            board.initPieces(data.pieces || []);

            this.__internal__ = {
                board: board,
                coordinator: new Chess.Movement.Coordinator(board, playingColor)
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

        function Coordinator(board, playingColor) {
            this.__internal__ = {
                board: board,
                colorSwitcher: new Chess.Piece.ColorSwitcher(playingColor),
                calculator: new Chess.Movement.DisplacementsCalculator(board),
                enPassantContext: new Chess.Movement.Pawn.EnPassantContext(
                    new Chess.Movement.Pawn.EnPassantCoordinator(board),
                    new Chess.Movement.Pawn.PawnDisplacementAnalyser()
                )
            };
        }

        Coordinator.prototype.getPlayingColor = function() {
            return this.__internal__.colorSwitcher.getPlayingColor();
        };

        Coordinator.prototype.moveTo = function(piece, position) {
            if(!this.isEligibleMove(piece, position)) {
                throw new Error('Try an invalid move');
            }
            this.__internal__.enPassantContext.synchronizeContextBeforeDisplacement(piece, position);
            this.__internal__.board.changePiecePosition(piece, position);
            piece.incrementDisplacementsNumber();
            this.__internal__.colorSwitcher.switchColor();
        };

        Coordinator.prototype.isEligibleMove = function(piece, position) {
            var square = this.__internal__.board.getSquareByPosition(position);
            return this.getEligibleSquares(piece).indexOf(square) >= 0;
        };

        Coordinator.prototype.getEligibleSquares = function(piece) {
            if(!this.__internal__.colorSwitcher.isPlayingColor(piece.getColor())) {
                return [];
            }

            this.__internal__.enPassantContext.setEnPassantContext(piece);
            var result = this.__internal__.calculator.getEligibleSquares(piece);
            this.__internal__.enPassantContext.restoreInitialContext();
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

        Displacement.prototype.isExtensible = function(squareDisplacementsNumber) {
            if(this.__internal__.isExtensible instanceof Function) {
                return this.__internal__.isExtensible(squareDisplacementsNumber);
            }
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

    Chess.Movement.DisplacementsCalculator = (function() {

        function DisplacementsCalculator(board) {
            this.__internal__ = {
                board: board
            };
        }

        DisplacementsCalculator.prototype.getEligibleSquares = function(piece) {

            if(!piece.getSquare()) {
                throw new Error('You must add the Piece to the board before trying to move it');
            }

            var mover = new Chess.Movement.Mover(piece.getSquare().getPosition(), piece.getDisplacementsSuite()),
                newPosition,
                square,
                result = [],
                i = 0;

            while((newPosition = mover.moveOnce()) !== null) {
                try {
                    square = this.__internal__.board.getSquareByPosition(newPosition);
                } catch(error) { //we are out of board
                    square = null;
                }

                if(square && square.isValidForNewPiece(piece) && mover.getCurrentDisplacement().isValid(square)) {
                    result.push(square);
                    if(!mover.getCurrentDisplacement().isExtensible(++i) || square.getPiece()) {
                        i = 0;
                        mover.changeDirection();
                    }
                } else {
                    i = 0;
                    mover.changeDirection();
                }

            }

            return result;
        };

        return DisplacementsCalculator;

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

        Mover.prototype.moveOnce = function() {
            if(!this.getCurrentDisplacement()) {
                return null;
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

        Mover.prototype.changeDirection = function() {
            this.__internal__.currentDirectionId++;
            this.__internal__.position = this.__internal__.initialPosition;
        };

        return Mover;

    })();

    return Chess;

})(Chess || {});

var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};
    Chess.Movement.Pawn = Chess.Movement.Pawn || {};

    Chess.Movement.Pawn.EnPassantContext = (function() {

        function EnPassantContext(enPassantCoordinator, pawnDisplacementAnalyser) {
            this.__internal__ = {
                enPassantCoordinator: enPassantCoordinator,
                pawnDisplacementAnalyser: pawnDisplacementAnalyser
            };
        }

        EnPassantContext.prototype.synchronizeContextBeforeDisplacement = function(piece, position) {
            if(this.__internal__.pawnDisplacementAnalyser.isPawnCaptureDisplacement(piece, position)) {
                this.__internal__.enPassantCoordinator.setEnPassantBoard();
            }

            //todo séparer la méthode fait 2 choses?
            this.__internal__.enPassantCoordinator.resetEnPassantEligiblePawn();
            if(this.__internal__.pawnDisplacementAnalyser.isPawnDoubleSquareDisplacement(piece, position)) {
                this.__internal__.enPassantCoordinator.setEnPassantEligiblePawn(piece, position);
            }
        };

        EnPassantContext.prototype.setEnPassantContext = function(piece) {
            if(piece instanceof Chess.Piece.Type.Pawn) {
                this.__internal__.enPassantCoordinator.setEnPassantBoard();
            }
        };

        EnPassantContext.prototype.restoreInitialContext = function() {
            this.__internal__.enPassantCoordinator.restoreInitialBoard();
        };

        return EnPassantContext;

    })();

    return Chess;

})(Chess || {});

var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};
    Chess.Movement.Pawn = Chess.Movement.Pawn || {};

    Chess.Movement.Pawn.EnPassantCoordinator = (function() {

        function EnPassantCoordinator(board) {
            this.__internal__ = {
                board: board,
                enPassantEligiblePawn: null,
                pawnPosition: null
            };
        }

        EnPassantCoordinator.prototype.resetEnPassantEligiblePawn = function() {
            this.__internal__.enPassantEligiblePawn = null;
            this.__internal__.pawnPosition = null;
        };

        EnPassantCoordinator.prototype.setEnPassantEligiblePawn = function(piece, position) {
            this.__internal__.enPassantEligiblePawn = piece;
            this.__internal__.pawnPosition = position;
        };

        EnPassantCoordinator.prototype.setEnPassantBoard = function() {
            if(this.__internal__.enPassantEligiblePawn && this.__internal__.pawnPosition) {
                this.__internal__.board.changePiecePosition(
                    this.__internal__.enPassantEligiblePawn,
                    new Chess.Movement.Position(
                        this.__internal__.pawnPosition.getX(),
                        this.__internal__.pawnPosition.getY() - this.__internal__.enPassantEligiblePawn.getColor().getDirection()
                    )
                );
            }
        };

        EnPassantCoordinator.prototype.restoreInitialBoard = function() {
            if(this.__internal__.enPassantEligiblePawn && this.__internal__.pawnPosition) {
                try {
                    this.__internal__.board.changePiecePosition(
                        this.__internal__.enPassantEligiblePawn,
                        this.__internal__.pawnPosition
                    );
                } catch(e) {
                    //todo le pawn était déjà à sa place
                }
            }
        };

        return EnPassantCoordinator;

    })();

    return Chess;

})(Chess || {});

var Chess = (function(Chess) {
    'use strict';

    Chess.Movement = Chess.Movement || {};
    Chess.Movement.Pawn = Chess.Movement.Pawn || {};

    Chess.Movement.Pawn.PawnDisplacementAnalyser = (function() {

        function PawnDisplacementAnalyser() {

        }

        PawnDisplacementAnalyser.prototype.isPawnDoubleSquareDisplacement = function(piece, position) {
            if(!piece.getSquare()) {
                throw new Error('Piece has currently no square');
            }
            if(piece instanceof Chess.Piece.Type.Pawn) {
                return Math.abs(piece.getSquare().getPosition().getY() - position.getY()) === 2;
            }
            return false;
        };

        PawnDisplacementAnalyser.prototype.isPawnCaptureDisplacement = function(piece, position) {
            if(!piece.getSquare()) {
                throw new Error('Piece has currently no square');
            }
            if(piece instanceof Chess.Piece.Type.Pawn) {
                return Math.abs(piece.getSquare().getPosition().getX() - position.getX()) === 1;
            }
            return false;
        };

        return PawnDisplacementAnalyser;

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

    Chess.Movement = Chess.Movement || {};

    Chess.Movement.PositionFactory = (function() {

        function PositionFactory() {

        }

        PositionFactory.prototype.createByData = function(positionData) {
            return new Chess.Movement.Position(positionData.x, positionData.y);
        };

        return PositionFactory;

    })();

    return Chess;

})(Chess || {});


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

        ColorSwitcher.prototype.isPlayingColor = function(color) {
            return this.__internal__.playingColor.getValue() === color.getValue();
        };

        ColorSwitcher.prototype.switchColor = function() {
            if(this.__internal__.playingColor.isWhite()) {
                this.__internal__.playingColor = new Chess.Piece.Color(Chess.Piece.Color.BLACK);
            } else {
                this.__internal__.playingColor = new Chess.Piece.Color(Chess.Piece.Color.WHITE);
            }
        };

        return ColorSwitcher;

    })();

    return Chess;

})(Chess || {});

var Chess = (function(Chess) {
    'use strict';

    Chess.Piece = Chess.Piece || {};

    Chess.Piece.Piece = (function() {

        function Piece(color, displacementsNumber) {
            this.__internal__ = {
                color: color,
                square: null,
                displacementsNumber: displacementsNumber || 0
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

        Piece.prototype.incrementDisplacementsNumber = function() {
            this.__internal__.displacementsNumber++;
        };

        Piece.prototype.getDisplacementsNumber = function() {
            return this.__internal__.displacementsNumber;
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

        PieceFactory.prototype.create = function(type, color, displacementsNumber) {
            return new Chess.Piece.Type[capitalize(type)](new Chess.Piece.Color(color), displacementsNumber);
        };

        PieceFactory.prototype.createByData = function(pieceData) {
            return this.create(pieceData.type, pieceData.color, pieceData.displacementsNumber);
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

        function Bishop(color, displacementsNumber) {
            this.__super__.constructor.call(this, color, displacementsNumber);
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

        function King(color, displacementsNumber) {
            this.__super__.constructor.call(this, color, displacementsNumber);
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

        function Knight(color, displacementsNumber) {
            this.__super__.constructor.call(this, color, displacementsNumber);
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

        function Pawn(color, displacementsNumber) {
            this.__super__.constructor.call(this, color, displacementsNumber);
        }

        Pawn.prototype.getName = function() {
            return 'P';
        };

        Pawn.prototype.getDisplacementsSuite = function() {
            var that = this;
            return [
                new Chess.Movement.Displacement(
                    0,
                    this.getColor().getDirection(),
                    function(squareDisplacementsNumber) {
                        return !that.__internal__.displacementsNumber && squareDisplacementsNumber < 2;
                    },
                    function(square) {
                        return !square.getPiece();
                    }
                ),
                new Chess.Movement.Displacement(
                    -1,
                    this.getColor().getDirection(),
                    false,
                    function(square) {
                        return Boolean(square.getPiece());
                    }
                ),
                new Chess.Movement.Displacement(
                    1,
                    this.getColor().getDirection(),
                    false,
                    function(square) {
                        return Boolean(square.getPiece());
                    }
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

        function Queen(color, displacementsNumber) {
            this.__super__.constructor.call(this, color, displacementsNumber);
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

        function Rook(color, displacementsNumber) {
            this.__super__.constructor.call(this, color, displacementsNumber);
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