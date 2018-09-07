var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Lx;
(function (Lx) {
    var Gravity = (function () {
        function Gravity() {
        }
        Gravity.NO_GRAVITY = 0x0000;
        Gravity.AXIS_SPECIFIED = 0x0001;
        Gravity.AXIS_PULL_BEFORE = 0x0002;
        Gravity.AXIS_PULL_AFTER = 0x0004;
        Gravity.AXIS_CLIP = 0x0008;
        Gravity.AXIS_X_SHIFT = 0;
        Gravity.AXIS_Y_SHIFT = 4;
        Gravity.TOP = (Gravity.AXIS_PULL_BEFORE | Gravity.AXIS_SPECIFIED) << Gravity.AXIS_Y_SHIFT;
        Gravity.BOTTOM = (Gravity.AXIS_PULL_AFTER | Gravity.AXIS_SPECIFIED) << Gravity.AXIS_Y_SHIFT;
        Gravity.LEFT = (Gravity.AXIS_PULL_BEFORE | Gravity.AXIS_SPECIFIED) << Gravity.AXIS_X_SHIFT;
        Gravity.RIGHT = (Gravity.AXIS_PULL_AFTER | Gravity.AXIS_SPECIFIED) << Gravity.AXIS_X_SHIFT;
        Gravity.CENTER_VERTICAL = Gravity.AXIS_SPECIFIED << Gravity.AXIS_Y_SHIFT;
        Gravity.FILL_VERTICAL = Gravity.TOP | Gravity.BOTTOM;
        Gravity.CENTER_HORIZONTAL = Gravity.AXIS_SPECIFIED << Gravity.AXIS_X_SHIFT;
        Gravity.FILL_HORIZONTAL = Gravity.LEFT | Gravity.RIGHT;
        Gravity.CENTER = Gravity.CENTER_VERTICAL | Gravity.CENTER_HORIZONTAL;
        Gravity.FILL = Gravity.FILL_VERTICAL | Gravity.FILL_HORIZONTAL;
        Gravity.CLIP_VERTICAL = Gravity.AXIS_CLIP << Gravity.AXIS_Y_SHIFT;
        Gravity.CLIP_HORIZONTAL = Gravity.AXIS_CLIP << Gravity.AXIS_X_SHIFT;
        Gravity.RELATIVE_LAYOUT_DIRECTION = 0x00800000;
        Gravity.HORIZONTAL_GRAVITY_MASK = (Gravity.AXIS_SPECIFIED |
            Gravity.AXIS_PULL_BEFORE | Gravity.AXIS_PULL_AFTER) << Gravity.AXIS_X_SHIFT;
        Gravity.VERTICAL_GRAVITY_MASK = (Gravity.AXIS_SPECIFIED |
            Gravity.AXIS_PULL_BEFORE | Gravity.AXIS_PULL_AFTER) << Gravity.AXIS_Y_SHIFT;
        Gravity.DISPLAY_CLIP_VERTICAL = 0x10000000;
        Gravity.DISPLAY_CLIP_HORIZONTAL = 0x01000000;
        Gravity.START = Gravity.RELATIVE_LAYOUT_DIRECTION | Gravity.LEFT;
        Gravity.END = Gravity.RELATIVE_LAYOUT_DIRECTION | Gravity.RIGHT;
        Gravity.RELATIVE_HORIZONTAL_GRAVITY_MASK = Gravity.START | Gravity.END;
        return Gravity;
    }());
    Lx.Gravity = Gravity;
    __reflect(Gravity.prototype, "Lx.Gravity");
})(Lx || (Lx = {}));
//# sourceMappingURL=Gravity.js.map