var Chess = (function(Chess) {
    'use strict';

    Chess.Reflection = Chess.Reflection || {};

    Chess.Reflection.ClassReflection = {

        extend: function(childClass, parentClass) {

            if(childClass.prototype instanceof parentClass) {
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