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
