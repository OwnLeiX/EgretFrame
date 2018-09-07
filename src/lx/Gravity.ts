namespace Lx {
    export class Gravity {
        public static readonly NO_GRAVITY = 0x0000;

        public static readonly AXIS_SPECIFIED = 0x0001;

        public static readonly AXIS_PULL_BEFORE = 0x0002;

        public static readonly AXIS_PULL_AFTER = 0x0004;

        public static readonly AXIS_CLIP = 0x0008;

        public static readonly AXIS_X_SHIFT = 0;

        public static readonly AXIS_Y_SHIFT = 4;

        public static readonly TOP = (Gravity.AXIS_PULL_BEFORE | Gravity.AXIS_SPECIFIED) << Gravity.AXIS_Y_SHIFT;

        public static readonly BOTTOM = (Gravity.AXIS_PULL_AFTER | Gravity.AXIS_SPECIFIED) << Gravity.AXIS_Y_SHIFT;

        public static readonly LEFT = (Gravity.AXIS_PULL_BEFORE | Gravity.AXIS_SPECIFIED) << Gravity.AXIS_X_SHIFT;

        public static readonly RIGHT = (Gravity.AXIS_PULL_AFTER | Gravity.AXIS_SPECIFIED) << Gravity.AXIS_X_SHIFT;

        public static readonly CENTER_VERTICAL = Gravity.AXIS_SPECIFIED << Gravity.AXIS_Y_SHIFT;

        public static readonly FILL_VERTICAL = Gravity.TOP | Gravity.BOTTOM;

        public static readonly CENTER_HORIZONTAL = Gravity.AXIS_SPECIFIED << Gravity.AXIS_X_SHIFT;

        public static readonly FILL_HORIZONTAL = Gravity.LEFT | Gravity.RIGHT;

        public static readonly CENTER = Gravity.CENTER_VERTICAL | Gravity.CENTER_HORIZONTAL;

        public static readonly FILL = Gravity.FILL_VERTICAL | Gravity.FILL_HORIZONTAL;

        public static readonly CLIP_VERTICAL = Gravity.AXIS_CLIP << Gravity.AXIS_Y_SHIFT;

        public static readonly CLIP_HORIZONTAL = Gravity.AXIS_CLIP << Gravity.AXIS_X_SHIFT;

        public static readonly RELATIVE_LAYOUT_DIRECTION = 0x00800000;

        public static readonly HORIZONTAL_GRAVITY_MASK = (Gravity.AXIS_SPECIFIED |
            Gravity.AXIS_PULL_BEFORE | Gravity.AXIS_PULL_AFTER) << Gravity.AXIS_X_SHIFT;

        public static readonly VERTICAL_GRAVITY_MASK = (Gravity.AXIS_SPECIFIED |
            Gravity.AXIS_PULL_BEFORE | Gravity.AXIS_PULL_AFTER) << Gravity.AXIS_Y_SHIFT;

        public static readonly DISPLAY_CLIP_VERTICAL = 0x10000000;

        public static readonly DISPLAY_CLIP_HORIZONTAL = 0x01000000;

        public static readonly START = Gravity.RELATIVE_LAYOUT_DIRECTION | Gravity.LEFT;

        public static readonly END = Gravity.RELATIVE_LAYOUT_DIRECTION | Gravity.RIGHT;

        public static readonly RELATIVE_HORIZONTAL_GRAVITY_MASK = Gravity.START | Gravity.END;
    }
}