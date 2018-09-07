var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Lx;
(function (Lx) {
    var FrameLayout = (function (_super) {
        __extends(FrameLayout, _super);
        function FrameLayout() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FrameLayout.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
            var matchParentChildren = [];
            var wSize = Lx.MeasureSpec.getSize(widthMeasureSpec);
            var wMode = Lx.MeasureSpec.getMode(widthMeasureSpec);
            var hSize = Lx.MeasureSpec.getSize(heightMeasureSpec);
            var hMode = Lx.MeasureSpec.getMode(heightMeasureSpec);
            var measureMatchParentChildren = wMode != Lx.MeasureSpec.EXACTLY || hMode != Lx.MeasureSpec.EXACTLY;
            var wantWidth = 0;
            var wantHeight = 0;
            var c;
            var p;
            var lc;
            for (var i = 0; i < this.numChildren; i++) {
                c = this.getChildAt(i);
                if (c) {
                    lc = Lx.ViewGroup.asViewInterface(c);
                    if (lc) {
                        p = lc.getLayoutParams();
                        lc.measure(Lx.ViewGroup.getChildMeasureSpec(widthMeasureSpec, p.marginLeft + p.marginRight, p.width), Lx.ViewGroup.getChildMeasureSpec(heightMeasureSpec, p.marginTop + p.marginBottom, p.height));
                        if (lc.getMeasuredWidth() > wantWidth)
                            wantWidth = lc.getMeasuredWidth();
                        if (lc.getMeasuredHeight() > wantHeight)
                            wantHeight = lc.getMeasuredHeight();
                        if (measureMatchParentChildren) {
                            if (p.width == Lx.ViewGroupLayoutParams.MATCH_PARENT || p.height == Lx.ViewGroupLayoutParams.MATCH_PARENT) {
                                matchParentChildren.push(lc);
                            }
                        }
                    }
                    else {
                        if (c.width > wantWidth)
                            wantWidth = c.width;
                        if (c.height > wantHeight)
                            wantHeight = c.height;
                    }
                }
            }
            var width;
            var height;
            if (wMode == Lx.MeasureSpec.EXACTLY) {
                width = wSize;
            }
            else if (wMode == Lx.MeasureSpec.AT_MOST) {
                width = Math.min(wSize, wantWidth);
            }
            else {
                width = wantWidth;
            }
            if (hMode == Lx.MeasureSpec.EXACTLY) {
                height = hSize;
            }
            else if (hMode == Lx.MeasureSpec.AT_MOST) {
                height = Math.min(hSize, wantHeight);
            }
            else {
                height = wantHeight;
            }
            this.setMeasuredDimension(width, height);
            var cWidthMeasureSpec;
            var cHeightMeasureSpec;
            if (matchParentChildren.length > 0) {
                for (var _i = 0, matchParentChildren_1 = matchParentChildren; _i < matchParentChildren_1.length; _i++) {
                    var child = matchParentChildren_1[_i];
                    this._measureChild(child, width, height, widthMeasureSpec, heightMeasureSpec);
                }
            }
        };
        FrameLayout.prototype.onLayout = function (l, t, r, b) {
            var width = r - l;
            var height = b - t;
            var c;
            var lc;
            for (var i = 0; i < this.numChildren; i++) {
                c = this.getChildAt(i);
                if (c) {
                    lc = Lx.ViewGroup.asViewInterface(c);
                    if (lc) {
                        this._layoutChild(lc, l, t, r, b);
                    }
                    else {
                        c.x = 0 + c.anchorOffsetX;
                        c.y = 0 + c.anchorOffsetY;
                    }
                }
            }
        };
        FrameLayout.prototype._layoutChild = function (child, l, t, r, b) {
            var childLeft;
            var childTop;
            var p = child.getLayoutParams();
            if (p instanceof FrameLayoutLayoutParams) {
                switch (p.layoutGravity & Lx.Gravity.HORIZONTAL_GRAVITY_MASK) {
                    case Lx.Gravity.CENTER_HORIZONTAL:
                        childLeft = (this.width >> 1) - (child.getMeasuredWidth() >> 1) + p.marginLeft - p.marginRight;
                        break;
                    case Lx.Gravity.RIGHT:
                        childLeft = this.width - child.getMeasuredWidth() - p.marginRight;
                        break;
                    case Lx.Gravity.LEFT:
                    default:
                        childLeft = 0 + p.marginLeft;
                        break;
                }
                switch (p.layoutGravity & Lx.Gravity.VERTICAL_GRAVITY_MASK) {
                    case Lx.Gravity.CENTER_VERTICAL:
                        childTop = (this.height >> 1) - (child.getMeasuredHeight() >> 1) + p.marginTop - p.marginBottom;
                        break;
                    case Lx.Gravity.BOTTOM:
                        childTop = this.height - child.getMeasuredHeight() - p.marginBottom;
                        break;
                    case Lx.Gravity.TOP:
                    default:
                        childTop = 0 + p.marginTop;
                        break;
                }
                child.layout(childLeft, childTop, childLeft + child.getMeasuredWidth(), childTop + child.getMeasuredHeight());
            }
            else {
                child.layout(0, 0, child.getMeasuredWidth(), child.getMeasuredHeight());
            }
        };
        FrameLayout.prototype._measureChild = function (child, parentWidth, parentHeight, parentWidthMeasureSpec, parentHeightMeasureSpec) {
            var cWidthMeasureSpec;
            var cHeightMeasureSpec;
            var p = child.getLayoutParams();
            if (p.width == Lx.ViewGroupLayoutParams.MATCH_PARENT) {
                cWidthMeasureSpec = Lx.MeasureSpec.makeMeasureSpec(parentWidth - p.marginLeft - p.marginRight, Lx.MeasureSpec.EXACTLY);
            }
            else {
                cWidthMeasureSpec = Lx.ViewGroup.getChildMeasureSpec(parentWidthMeasureSpec, p.marginLeft + p.marginRight, p.width);
            }
            if (p.height == Lx.ViewGroupLayoutParams.MATCH_PARENT) {
                cHeightMeasureSpec = Lx.MeasureSpec.makeMeasureSpec(parentHeight - p.marginTop - p.marginBottom, Lx.MeasureSpec.EXACTLY);
            }
            else {
                cHeightMeasureSpec = Lx.ViewGroup.getChildMeasureSpec(parentHeightMeasureSpec, p.marginTop + p.marginBottom, p.height);
            }
            child.measure(cWidthMeasureSpec, cHeightMeasureSpec);
        };
        FrameLayout.prototype.onChildAddedAfterAttach = function (child) {
            var c = Lx.ViewGroup.asViewInterface(child);
            if (c) {
                this._measureChild(c, this.width, this.height, this._oldWidthMeasureSpec, this._oldHeightMeasureSpec);
            }
        };
        return FrameLayout;
    }(Lx.ViewGroup));
    Lx.FrameLayout = FrameLayout;
    __reflect(FrameLayout.prototype, "Lx.FrameLayout");
    var FrameLayoutLayoutParams = (function (_super) {
        __extends(FrameLayoutLayoutParams, _super);
        function FrameLayoutLayoutParams() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return FrameLayoutLayoutParams;
    }(Lx.ViewGroupLayoutParams));
    Lx.FrameLayoutLayoutParams = FrameLayoutLayoutParams;
    __reflect(FrameLayoutLayoutParams.prototype, "Lx.FrameLayoutLayoutParams");
})(Lx || (Lx = {}));
//# sourceMappingURL=FrameLayout.js.map