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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Lx;
(function (Lx) {
    var View = (function (_super) {
        __extends(View, _super);
        function View(layoutParams) {
            var _this = _super.call(this) || this;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this._attachToWindow, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this._detachFromWidnow, _this);
            _this.layoutParams = layoutParams;
            return _this;
        }
        View.prototype._attachToWindow = function (ev) {
            return __awaiter(this, void 0, void 0, function () {
                var wMode, wSize, hMode, hSize, l, t;
                return __generator(this, function (_a) {
                    this.removeEventListener(egret.Event.ADDED_TO_STAGE, this._attachToWindow, this);
                    this.onAttachToWindow();
                    if (this.parent instanceof Lx.ViewGroup) {
                        //It is in Lx.Views system, so we waited the life cycle.
                    }
                    else {
                        //It is not in Lx.Views system.
                        if (this.layoutParams) {
                            wMode = this.layoutParams.width == Lx.ViewGroupLayoutParams.WRAP_CONTENT ? MeasureSpec.AT_MOST : MeasureSpec.EXACTLY;
                            wSize = this.layoutParams.width == Lx.ViewGroupLayoutParams.MATCH_PARENT ? this.parent.width : Math.max(0, this.layoutParams.width);
                            hMode = this.layoutParams.height == Lx.ViewGroupLayoutParams.WRAP_CONTENT ? MeasureSpec.AT_MOST : MeasureSpec.EXACTLY;
                            hSize = this.layoutParams.height == Lx.ViewGroupLayoutParams.MATCH_PARENT ? this.parent.height : Math.max(0, this.layoutParams.height);
                            this.measure(Lx.ViewGroup.getChildMeasureSpec(wMode, 0, wSize), Lx.ViewGroup.getChildMeasureSpec(hMode, 0, hSize));
                        }
                        else {
                            this.measure(MeasureSpec.makeMeasureSpec(this.width ? this.width : 0, MeasureSpec.EXACTLY), MeasureSpec.makeMeasureSpec(this.height ? this.height : 0, MeasureSpec.EXACTLY));
                        }
                        l = this.x ? this.x : 0;
                        t = this.y ? this.y : 0;
                        this.layout(l, t, this.getMeasuredWidth(), this.getMeasuredHeight());
                    }
                    return [2 /*return*/];
                });
            });
        };
        View.prototype._detachFromWidnow = function (ev) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this._detachFromWidnow, this);
                    this.onDetachFromWidnow();
                    return [2 /*return*/];
                });
            });
        };
        View.prototype.onAttachToWindow = function () {
        };
        View.prototype.onDetachFromWidnow = function () {
        };
        View.prototype.measure = function (widthMeasureSpec, heightMeasureSpec) {
            if (this._oldWidthMeasureSpec == widthMeasureSpec && this._oldHeightMeasureSpec == heightMeasureSpec)
                return;
            this.onMeasure(widthMeasureSpec, heightMeasureSpec);
            this._oldWidthMeasureSpec = widthMeasureSpec;
            this._oldHeightMeasureSpec = heightMeasureSpec;
        };
        View.prototype.layout = function (l, t, r, b) {
            var w = r - l;
            var h = b - t;
            var sizeChanged = false;
            if (w != this.width || h != this.height) {
                var oldW = this.width;
                var oldH = this.height;
                this.width = w;
                this.height = h;
                this.onSizeChanged(oldW, oldH, this.width, this.height);
                sizeChanged = true;
            }
            var needlayout = sizeChanged || l != (this.x - this.anchorOffsetX) || t != (this.y - this.anchorOffsetY);
            if (needlayout) {
                this.x = l + this.anchorOffsetX;
                this.y = t + this.anchorOffsetY;
            }
        };
        View.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
            this.setMeasuredDimension(View.getDefaultSize(widthMeasureSpec, 0), View.getDefaultSize(heightMeasureSpec, 0));
        };
        View.prototype.onLayout = function (l, t, r, b) {
        };
        View.prototype.setLayoutParams = function (params) {
            this.layoutParams = params;
        };
        View.prototype.setMeasuredDimension = function (width, height) {
            this._measuredWidth = width;
            this._measuredHeight = height;
        };
        View.prototype.onSizeChanged = function (oldWidth, oldHeight, width, height) {
        };
        View.prototype.getMeasuredWidth = function () {
            return this._measuredWidth;
        };
        View.prototype.getMeasuredHeight = function () {
            return this._measuredHeight;
        };
        View.prototype.getLayoutParams = function () {
            return this.layoutParams;
        };
        View.getDefaultSize = function (size, measureSpec) {
            var result = size;
            var specMode = MeasureSpec.getMode(measureSpec);
            var specSize = MeasureSpec.getSize(measureSpec);
            switch (specMode) {
                case MeasureSpec.UNSPECIFIED:
                    result = size;
                    break;
                case MeasureSpec.EXACTLY:
                case MeasureSpec.AT_MOST:
                    result = specSize;
                    break;
            }
            return result;
        };
        return View;
    }(egret.DisplayObject));
    Lx.View = View;
    __reflect(View.prototype, "Lx.View", ["Lx.ViewInterface"]);
    var MeasureSpec = (function () {
        function MeasureSpec() {
        }
        MeasureSpec.makeMeasureSpec = function (size, mode) {
            return (size & ~MeasureSpec.MODE_MASK) | (mode & MeasureSpec.MODE_MASK);
        };
        MeasureSpec.getMode = function (measureSpec) {
            return (measureSpec & MeasureSpec.MODE_MASK);
        };
        MeasureSpec.getSize = function (measureSpec) {
            return (measureSpec & ~MeasureSpec.MODE_MASK);
        };
        MeasureSpec.adjustSize = function (measureSpec, delta) {
            if (delta == 0)
                return measureSpec;
            var mode = MeasureSpec.getMode(measureSpec);
            var size = MeasureSpec.getMode(measureSpec);
            size += delta;
            return MeasureSpec.makeMeasureSpec(size, mode);
        };
        MeasureSpec.MODE_SHIFT = 30;
        MeasureSpec.MODE_MASK = 0x3 << MeasureSpec.MODE_SHIFT;
        MeasureSpec.UNSPECIFIED = 0 << MeasureSpec.MODE_SHIFT;
        MeasureSpec.EXACTLY = 1 << MeasureSpec.MODE_SHIFT;
        MeasureSpec.AT_MOST = 2 << MeasureSpec.MODE_SHIFT;
        return MeasureSpec;
    }());
    Lx.MeasureSpec = MeasureSpec;
    __reflect(MeasureSpec.prototype, "Lx.MeasureSpec");
    var LayoutParams = (function () {
        function LayoutParams(w, h) {
            this.width = 0;
            this.height = 0;
            this.marginLeft = 0;
            this.marginRight = 0;
            this.marginTop = 0;
            this.marginBottom = 0;
            this.width = w;
            this.height = h;
        }
        return LayoutParams;
    }());
    Lx.LayoutParams = LayoutParams;
    __reflect(LayoutParams.prototype, "Lx.LayoutParams");
})(Lx || (Lx = {}));
//# sourceMappingURL=View.js.map