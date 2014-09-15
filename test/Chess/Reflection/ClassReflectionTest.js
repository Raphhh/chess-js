test("clone", function() {

    function CloneTestClass() {
        this.x = 1;
    }

    var o = new CloneTestClass();
    var o2 = Chess.Reflection.ClassReflection.clone(o);

    ok(o2 instanceof CloneTestClass);
    strictEqual(o2.x, o.x);
    notStrictEqual(o2, o);

});

test("extend", function() {

    function ParentClass(x) {
        this.x = x;
    }

    ParentClass.prototype.getX = function() {
        return this.x;
    };

    function ChildClass(x) {
        this.x = x;
    }


    Chess.Reflection.ClassReflection.extend(ChildClass, ParentClass);

    var parent = new ParentClass(1);
    var child = new ChildClass(2);

    ok(parent instanceof ParentClass);
    ok(child instanceof ParentClass);
    ok(child instanceof ChildClass);

    strictEqual(parent.constructor, ParentClass);
    strictEqual(child.constructor, ChildClass);

    strictEqual(child.constructor.prototype.__super__, ParentClass.prototype);

    ok(child.getX);

    strictEqual(parent.getX(), 1);
    strictEqual(child.getX(), 2);
});