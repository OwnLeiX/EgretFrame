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
    var ViewGroup = (function (_super) {
        __extends(ViewGroup, _super);
        function ViewGroup(layoutParams) {
            var _this = _super.call(this) || this;
            _this._flags = 0;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this._attachToWindow, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this._detachFromWidnow, _this);
            _this.layoutParams = layoutParams;
            return _this;
        }
        ViewGroup.prototype._attachToWindow = function (ev) {
            return __awaiter(this, void 0, void 0, function () {
                var wMode, wSize, hMode, hSize, l, t;
                return __generator(this, function (_a) {
                    this.removeEventListener(egret.Event.ADDED_TO_STAGE, this._attachToWindow, this);
                    this.onAttachToWindow();
                    if (this.parent instanceof ViewGroup) {
                        //It is in Lx.Views system, so we waited the life cycle.
                    }
                    else {
                        //It is not in Lx.Views system.
                        if (this.layoutParams) {
                            wMode = this.layoutParams.width == ViewGroupLayoutParams.WRAP_CONTENT ? Lx.MeasureSpec.AT_MOST : Lx.MeasureSpec.EXACTLY;
                            wSize = this.layoutParams.width == ViewGroupLayoutParams.MATCH_PARENT ? this.parent.width : Math.max(0, this.layoutParams.width);
                            hMode = this.layoutParams.height == ViewGroupLayoutParams.WRAP_CONTENT ? Lx.MeasureSpec.AT_MOST : Lx.MeasureSpec.EXACTLY;
                            hSize = this.layoutParams.height == ViewGroupLayoutParams.MATCH_PARENT ? this.parent.height : Math.max(0, this.layoutParams.height);
                            this.measure(ViewGroup.getChildMeasureSpec(wMode, 0, wSize), ViewGroup.getChildMeasureSpec(hMode, 0, hSize));
                        }
                        else {
                            this.measure(Lx.MeasureSpec.makeMeasureSpec(this.width ? this.width : 0, Lx.MeasureSpec.EXACTLY), Lx.MeasureSpec.makeMeasureSpec(this.height ? this.height : 0, Lx.MeasureSpec.EXACTLY));
                        }
                        l = this.x ? this.x : 0;
                        t = this.y ? this.y : 0;
                        this.layout(l, t, this.getMeasuredWidth(), this.getMeasuredHeight());
                    }
                    this._flags |= ViewGroup.FLAG_ATTACHED_TO_WINDOW;
                    return [2 /*return*/];
                });
            });
        };
        ViewGroup.prototype._detachFromWidnow = function (ev) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this._detachFromWidnow, this);
                    this.onDetachFromWidnow();
                    this._flags |= ~ViewGroup.FLAG_ATTACHED_TO_WINDOW;
                    return [2 /*return*/];
                });
            });
        };
        ViewGroup.prototype.onAttachToWindow = function () {
        };
        ViewGroup.prototype.onDetachFromWidnow = function () {
        };
        ViewGroup.prototype.measure = function (widthMeasureSpec, heightMeasureSpec) {
            if (this._oldWidthMeasureSpec == widthMeasureSpec && this._oldHeightMeasureSpec == heightMeasureSpec)
                return;
            this.onMeasure(widthMeasureSpec, heightMeasureSpec);
            this._oldWidthMeasureSpec = widthMeasureSpec;
            this._oldHeightMeasureSpec = heightMeasureSpec;
        };
        ViewGroup.prototype.layout = function (l, t, r, b) {
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
                this.onLayout(l, t, r, b);
            }
        };
        ViewGroup.prototype.setMeasuredDimension = function (width, height) {
            this._measuredWidth = width;
            this._measuredHeight = height;
        };
        ViewGroup.prototype.onSizeChanged = function (oldWidth, oldHeight, width, height) {
        };
        ViewGroup.prototype.getMeasuredWidth = function () {
            return this._measuredWidth;
        };
        ViewGroup.prototype.getMeasuredHeight = function () {
            return this._measuredHeight;
        };
        ViewGroup.prototype.getLayoutParams = function () {
            return this.layoutParams;
        };
        ViewGroup.prototype.setLayoutParams = function (params) {
            this.layoutParams = params;
        };
        ViewGroup.prototype.addChild = function (child) {
            var returnValue = _super.prototype.addChild.call(this, child);
            if ((this._flags & ViewGroup.FLAG_ATTACHED_TO_WINDOW) == ViewGroup.FLAG_ATTACHED_TO_WINDOW) {
                this.onChildAddedAfterAttach(child);
            }
            return returnValue;
        };
        ViewGroup.prototype.addChildAt = function (child, index) {
            var returnValue = _super.prototype.addChildAt.call(this, child, index);
            if ((this._flags & ViewGroup.FLAG_ATTACHED_TO_WINDOW) == ViewGroup.FLAG_ATTACHED_TO_WINDOW) {
                this.onChildAddedAfterAttach(child);
            }
            return returnValue;
        };
        ViewGroup.getChildMeasureSpec = function (spec, padding, childDimension) {
            var specMode = Lx.MeasureSpec.getMode(spec);
            var specSize = Lx.MeasureSpec.getSize(spec);
            var size = Math.max(0, specSize - padding);
            var resultSize = 0;
            var resultMode = 0;
            switch (specMode) {
                case Lx.MeasureSpec.EXACTLY:
                    if (childDimension >= 0) {
                        resultSize = childDimension;
                        resultMode = Lx.MeasureSpec.EXACTLY;
                    }
                    else if (childDimension == ViewGroupLayoutParams.MATCH_PARENT) {
                        resultSize = size;
                        resultMode = Lx.MeasureSpec.EXACTLY;
                    }
                    else if (childDimension == ViewGroupLayoutParams.WRAP_CONTENT) {
                        resultSize = size;
                        resultMode = Lx.MeasureSpec.AT_MOST;
                    }
                    break;
                case Lx.MeasureSpec.AT_MOST:
                    if (childDimension >= 0) {
                        resultSize = childDimension;
                        resultMode = Lx.MeasureSpec.EXACTLY;
                    }
                    else if (childDimension == ViewGroupLayoutParams.MATCH_PARENT) {
                        resultSize = size;
                        resultMode = Lx.MeasureSpec.AT_MOST;
                    }
                    else if (childDimension == ViewGroupLayoutParams.WRAP_CONTENT) {
                        resultSize = size;
                        resultMode = Lx.MeasureSpec.AT_MOST;
                    }
                    break;
                case Lx.MeasureSpec.UNSPECIFIED:
                    if (childDimension >= 0) {
                        resultSize = childDimension;
                        resultMode = Lx.MeasureSpec.EXACTLY;
                    }
                    else if (childDimension == ViewGroupLayoutParams.MATCH_PARENT) {
                        resultSize = size;
                        resultMode = Lx.MeasureSpec.UNSPECIFIED;
                    }
                    else if (childDimension == ViewGroupLayoutParams.WRAP_CONTENT) {
                        resultSize = size;
                        resultMode = Lx.MeasureSpec.UNSPECIFIED;
                    }
                    break;
            }
            return Lx.MeasureSpec.makeMeasureSpec(resultSize, resultMode);
        };
        ViewGroup.asViewInterface = function (obj) {
            var returnVlaue;
            try {
                returnVlaue = obj;
            }
            catch (e) {
            }
            return returnVlaue;
        };
        ViewGroup.FLAG_ATTACHED_TO_WINDOW = 1;
        return ViewGroup;
    }(egret.DisplayObjectContainer));
    Lx.ViewGroup = ViewGroup;
    __reflect(ViewGroup.prototype, "Lx.ViewGroup", ["Lx.ViewInterface"]);
    var ViewGroupLayoutParams = (function (_super) {
        __extends(ViewGroupLayoutParams, _super);
        function ViewGroupLayoutParams() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ViewGroupLayoutParams.MATCH_PARENT = -1;
        ViewGroupLayoutParams.WRAP_CONTENT = -2;
        return ViewGroupLayoutParams;
    }(Lx.LayoutParams));
    Lx.ViewGroupLayoutParams = ViewGroupLayoutParams;
    __reflect(ViewGroupLayoutParams.prototype, "Lx.ViewGroupLayoutParams");
})(Lx || (Lx = {}));
//# sourceMappingURL=ViewGroup.js.map