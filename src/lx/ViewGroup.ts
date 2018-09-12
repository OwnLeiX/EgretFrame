namespace Lx {
    export abstract class ViewGroup extends egret.DisplayObjectContainer implements ViewInterface {

        private static readonly FLAG_ATTACHED_TO_WINDOW = 1;

        protected _measuredWidth: number
        protected _measuredHeight: number
        protected _oldWidthMeasureSpec: number
        protected _oldHeightMeasureSpec: number
        protected _flags: number = 0
        protected layoutParams: LayoutParams

        constructor(layoutParams?: LayoutParams) {
            super()
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this._attachToWindow, this)
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this._detachFromWidnow, this)
            this.layoutParams = layoutParams
        }

        private async _attachToWindow(ev: egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this._attachToWindow, this)
            this.onAttachToWindow()
            if (this.parent instanceof ViewGroup) {
                //It is in Lx.Views system, so we waited the life cycle.
            } else {
                //It is not in Lx.Views system.
                if (this.layoutParams) {
                    let wMode
                    let wSize
                    switch (this.layoutParams.width) {
                        case ViewGroupLayoutParams.WRAP_CONTENT:
                            wMode = MeasureSpec.AT_MOST
                            wSize = this.parent.width
                            break
                        case ViewGroupLayoutParams.MATCH_PARENT:
                            wMode = MeasureSpec.EXACTLY
                            wSize = this.parent.width
                            break
                        default:
                            wMode = MeasureSpec.EXACTLY
                            wSize = this.layoutParams.width
                            break
                    }
                    let hMode
                    let hSize
                    switch (this.layoutParams.height) {
                        case ViewGroupLayoutParams.WRAP_CONTENT:
                            hMode = MeasureSpec.AT_MOST
                            hSize = this.parent.height
                            break
                        case ViewGroupLayoutParams.MATCH_PARENT:
                            hMode = MeasureSpec.EXACTLY
                            hSize = this.parent.height
                            break
                        default:
                            hMode = MeasureSpec.EXACTLY
                            hSize = this.layoutParams.height
                            break
                    }
                    this.measure(MeasureSpec.makeMeasureSpec(wSize, wMode), MeasureSpec.makeMeasureSpec(hSize, hMode))
                } else {
                    this.measure(MeasureSpec.makeMeasureSpec(this.width ? this.width : 0, MeasureSpec.EXACTLY), MeasureSpec.makeMeasureSpec(this.height ? this.height : 0, MeasureSpec.EXACTLY))
                }
                let l = this.x ? this.x : 0
                let t = this.y ? this.y : 0
                this.layout(l, t, this.getMeasuredWidth(), this.getMeasuredHeight())
            }
            this._flags |= ViewGroup.FLAG_ATTACHED_TO_WINDOW
        }

        private async _detachFromWidnow(ev: egret.Event) {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this._detachFromWidnow, this)
            this.onDetachFromWidnow()
            this._flags |= ~ViewGroup.FLAG_ATTACHED_TO_WINDOW
        }

        protected onAttachToWindow() {
        }

        protected onDetachFromWidnow() {
        }

        public measure(widthMeasureSpec: number, heightMeasureSpec: number) {
            if (this._oldWidthMeasureSpec == widthMeasureSpec && this._oldHeightMeasureSpec == heightMeasureSpec)
                return
            this.onMeasure(widthMeasureSpec, heightMeasureSpec)
            this._oldWidthMeasureSpec = widthMeasureSpec
            this._oldHeightMeasureSpec = heightMeasureSpec
        }

        public layout(l: number, t: number, r: number, b: number) {
            let w: number = r - l
            let h: number = b - t
            let sizeChanged: boolean = false
            if (w != this.width || h != this.height) {
                let oldW = this.width
                let oldH = this.height
                this.width = w
                this.height = h
                this.onSizeChanged(oldW, oldH, this.width, this.height)
                sizeChanged = true
            }

            let needlayout = sizeChanged || l != (this.x - this.anchorOffsetX) || t != (this.y - this.anchorOffsetY)
            if (needlayout) {
                this.x = l + this.anchorOffsetX
                this.y = t + this.anchorOffsetY
                this.onLayout(l, t, r, b)
            }
        }

        public abstract onMeasure(widthMeasureSpec: number, heightMeasureSpec: number)

        public abstract onLayout(l: number, t: number, r: number, b: number)

        protected abstract onChildAddedAfterAttach(child: egret.DisplayObject)
        protected abstract onChildRemovedAfterAttach(child: egret.DisplayObject)
        protected abstract onChildrenRemovedAfterAttach()

        protected setMeasuredDimension(width: number, height: number) {
            this._measuredWidth = width
            this._measuredHeight = height
        }

        protected onSizeChanged(oldWidth: number, oldHeight: number, width: number, height: number) {

        }

        public getMeasuredWidth(): number {
            return this._measuredWidth
        }

        public getMeasuredHeight(): number {
            return this._measuredHeight
        }

        public getLayoutParams(): LayoutParams {
            return this.layoutParams
        }

        public setLayoutParams(params: LayoutParams) {
            this.layoutParams = params
        }

        public addChild(child: egret.DisplayObject): egret.DisplayObject {
            let returnValue = super.addChild(child)
            if ((this._flags & ViewGroup.FLAG_ATTACHED_TO_WINDOW) == ViewGroup.FLAG_ATTACHED_TO_WINDOW && returnValue) {
                this.onChildAddedAfterAttach(child)
            }
            return returnValue
        }

        public addChildAt(child: egret.DisplayObject, index: number): egret.DisplayObject {
            let returnValue = super.addChildAt(child, index)
            if ((this._flags & ViewGroup.FLAG_ATTACHED_TO_WINDOW) == ViewGroup.FLAG_ATTACHED_TO_WINDOW && returnValue) {
                this.onChildAddedAfterAttach(child)
            }
            return returnValue
        }

        public removeChild(child: egret.DisplayObject): egret.DisplayObject {
            let returnValue = super.removeChild(child)
            if ((this._flags & ViewGroup.FLAG_ATTACHED_TO_WINDOW) == ViewGroup.FLAG_ATTACHED_TO_WINDOW && returnValue) {
                this.onChildRemovedAfterAttach(returnValue)
            }
            return returnValue
        }

        public removeChildAt(index: number): egret.DisplayObject {
            let returnValue = super.removeChildAt(index)
            if ((this._flags & ViewGroup.FLAG_ATTACHED_TO_WINDOW) == ViewGroup.FLAG_ATTACHED_TO_WINDOW && returnValue) {
                this.onChildRemovedAfterAttach(returnValue)
            }
            return returnValue
        }

        public removeCremoveChildrenhildren() {
            let returnValue = super.removeChildren()
            if ((this._flags & ViewGroup.FLAG_ATTACHED_TO_WINDOW) == ViewGroup.FLAG_ATTACHED_TO_WINDOW && returnValue) {
                this.onChildrenRemovedAfterAttach()
            }
            return returnValue
        }

        public static getChildMeasureSpec(spec: number, padding: number, childDimension: number) {
            let specMode = MeasureSpec.getMode(spec)
            let specSize = MeasureSpec.getSize(spec)

            let size = Math.max(0, specSize - padding)

            let resultSize = 0
            let resultMode = 0

            switch (specMode) {
                case MeasureSpec.EXACTLY:
                    if (childDimension >= 0) {
                        resultSize = childDimension
                        resultMode = MeasureSpec.EXACTLY
                    } else if (childDimension == ViewGroupLayoutParams.MATCH_PARENT) {
                        resultSize = size
                        resultMode = MeasureSpec.EXACTLY
                    } else if (childDimension == ViewGroupLayoutParams.WRAP_CONTENT) {
                        resultSize = size
                        resultMode = MeasureSpec.AT_MOST
                    }
                    break

                case MeasureSpec.AT_MOST:
                    if (childDimension >= 0) {
                        resultSize = childDimension
                        resultMode = MeasureSpec.EXACTLY
                    } else if (childDimension == ViewGroupLayoutParams.MATCH_PARENT) {
                        resultSize = size
                        resultMode = MeasureSpec.AT_MOST
                    } else if (childDimension == ViewGroupLayoutParams.WRAP_CONTENT) {
                        resultSize = size
                        resultMode = MeasureSpec.AT_MOST
                    }
                    break

                case MeasureSpec.UNSPECIFIED:
                    if (childDimension >= 0) {
                        resultSize = childDimension
                        resultMode = MeasureSpec.EXACTLY
                    } else if (childDimension == ViewGroupLayoutParams.MATCH_PARENT) {
                        resultSize = size
                        resultMode = MeasureSpec.UNSPECIFIED
                    } else if (childDimension == ViewGroupLayoutParams.WRAP_CONTENT) {
                        resultSize = size
                        resultMode = MeasureSpec.UNSPECIFIED
                    }
                    break
            }
            return MeasureSpec.makeMeasureSpec(resultSize, resultMode)
        }

        public static asViewInterface(obj: any): ViewInterface {
            let returnVlaue: ViewInterface
            try {
                returnVlaue = obj as ViewInterface
            } catch (e) {
            }
            return returnVlaue
        }
    }

    export class ViewGroupLayoutParams extends LayoutParams {
        public static readonly MATCH_PARENT = -1
        public static readonly WRAP_CONTENT = -2
    }
}