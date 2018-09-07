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
    var TextView = (function (_super) {
        __extends(TextView, _super);
        function TextView(layoutParams) {
            var _this = _super.call(this) || this;
            _this.layoutParams = layoutParams;
            return _this;
        }
        TextView.prototype.measure = function (widthMeasureSpec, heightMeasureSpec) {
            if (this._oldWidthMeasureSpec == widthMeasureSpec && this._oldHeightMeasureSpec == heightMeasureSpec)
                return;
            this.onMeasure(widthMeasureSpec, heightMeasureSpec);
            this._oldWidthMeasureSpec = widthMeasureSpec;
            this._oldHeightMeasureSpec = heightMeasureSpec;
        };
        TextView.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
            //egret.TextField在设置了字体和文本后就有了 width 和 height 属性，因此以此作为WRAP_CONTENT时的宽高
            var wMode = Lx.MeasureSpec.getMode(widthMeasureSpec);
            var wSize = Lx.MeasureSpec.getSize(widthMeasureSpec);
            var hMode = Lx.MeasureSpec.getMode(heightMeasureSpec);
            var hSize = Lx.MeasureSpec.getSize(heightMeasureSpec);
            if (wMode == Lx.MeasureSpec.EXACTLY) {
                this._measuredWidth = wSize;
            }
            else {
                var want = this.width;
                if (wMode == Lx.MeasureSpec.UNSPECIFIED) {
                    this._measuredWidth = want;
                }
                else {
                    this._measuredWidth = Math.min(want, wSize);
                }
            }
            if (hMode == Lx.MeasureSpec.EXACTLY) {
                this._measuredHeight = hSize;
            }
            else {
                var want = this.height;
                if (hMode == Lx.MeasureSpec.UNSPECIFIED) {
                    this._measuredHeight = want;
                }
                else {
                    this._measuredHeight = Math.min(want, hSize);
                }
            }
        };
        TextView.prototype.layout = function (l, t, r, b) {
            var w = r - l;
            var h = b - t;
            var sizeChanged = false;
            if (w != this.width || h != this.height) {
                var oldW = this.width;
                var oldH = this.height;
                this.width = w;
                this.height = h;
                sizeChanged = true;
            }
            var needlayout = sizeChanged || l != (this.x - this.anchorOffsetX) || t != (this.y - this.anchorOffsetY);
            if (needlayout) {
                this.x = l + this.anchorOffsetX;
                this.y = t + this.anchorOffsetY;
            }
        };
        TextView.prototype.getMeasuredWidth = function () {
            return this._measuredWidth;
        };
        TextView.prototype.getMeasuredHeight = function () {
            return this._measuredHeight;
        };
        TextView.prototype.getLayoutParams = function () {
            return this.layoutParams;
        };
        return TextView;
    }(egret.TextField));
    Lx.TextView = TextView;
    __reflect(TextView.prototype, "Lx.TextView", ["Lx.ViewInterface"]);
})(Lx || (Lx = {}));
//# sourceMappingURL=TextView.js.map