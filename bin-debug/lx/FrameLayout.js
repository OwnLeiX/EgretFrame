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
                    p = child.getLayoutParams();
                    if (p.width == Lx.ViewGroupLayoutParams.MATCH_PARENT) {
                        cWidthMeasureSpec = Lx.MeasureSpec.makeMeasureSpec(width - p.marginLeft - p.marginRight, Lx.MeasureSpec.EXACTLY);
                    }
                    else {
                        cWidthMeasureSpec = Lx.ViewGroup.getChildMeasureSpec(widthMeasureSpec, p.marginLeft + p.marginRight, p.width);
                    }
                    if (p.height == Lx.ViewGroupLayoutParams.MATCH_PARENT) {
                        cHeightMeasureSpec = Lx.MeasureSpec.makeMeasureSpec(height - p.marginTop - p.marginBottom, Lx.MeasureSpec.EXACTLY);
                    }
                    else {
                        cHeightMeasureSpec = Lx.ViewGroup.getChildMeasureSpec(height, p.marginTop + p.marginBottom, p.height);
                    }
                    child.measure(cWidthMeasureSpec, cHeightMeasureSpec);
                }
            }
        };
        FrameLayout.prototype.onLayout = function (l, t, r, b) {
            var width = r - l;
            var height = b - t;
            var c;
            var p;
            var lc;
            var childLeft;
            var childTop;
            for (var i = 0; i < this.numChildren; i++) {
                c = this.getChildAt(i);
                if (c) {
                    lc = Lx.ViewGroup.asViewInterface(c);
                    if (lc) {
                        p = lc.getLayoutParams();
                        if (p instanceof FrameLayoutLayoutParams) {
                            switch (p.layoutGravity & Lx.Gravity.HORIZONTAL_GRAVITY_MASK) {
                                case Lx.Gravity.CENTER_HORIZONTAL:
                                    childLeft = (this.width >> 1) - (lc.getMeasuredWidth() >> 1) + p.marginLeft - p.marginRight;
                                    break;
                                case Lx.Gravity.RIGHT:
                                    childLeft = this.width - lc.getMeasuredWidth() - p.marginRight;
                                    break;
                                case Lx.Gravity.LEFT:
                                default:
                                    childLeft = 0 + p.marginLeft;
                                    break;
                            }
                            switch (p.layoutGravity & Lx.Gravity.VERTICAL_GRAVITY_MASK) {
                                case Lx.Gravity.CENTER_VERTICAL:
                                    childTop = (this.height >> 1) - (lc.getMeasuredHeight() >> 1) + p.marginTop - p.marginBottom;
                                    break;
                                case Lx.Gravity.BOTTOM:
                                    childTop = this.height - lc.getMeasuredHeight() - p.marginBottom;
                                    break;
                                case Lx.Gravity.TOP:
                                default:
                                    childTop = 0 + p.marginTop;
                                    break;
                            }
                            lc.layout(childLeft, childTop, childLeft + lc.getMeasuredWidth(), childTop + lc.getMeasuredHeight());
                        }
                        else {
                            lc.layout(0, 0, lc.getMeasuredWidth(), lc.getMeasuredHeight());
                        }
                    }
                    else {
                        c.x = 0 + c.anchorOffsetX;
                        c.y = 0 + c.anchorOffsetY;
                    }
                }
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