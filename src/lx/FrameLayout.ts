namespace Lx {
    export class FrameLayout extends ViewGroup {

        public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number) {
            let matchParentChildren: ViewInterface[] = []
            let wSize = MeasureSpec.getSize(widthMeasureSpec)
            let wMode = MeasureSpec.getMode(widthMeasureSpec)

            let hSize = MeasureSpec.getSize(heightMeasureSpec)
            let hMode = MeasureSpec.getMode(heightMeasureSpec)

            let measureMatchParentChildren: boolean = wMode != MeasureSpec.EXACTLY || hMode != MeasureSpec.EXACTLY

            let wantWidth: number = 0
            let wantHeight: number = 0

            let c: egret.DisplayObject
            let p: LayoutParams
            let lc: ViewInterface
            for (let i = 0; i < this.numChildren; i++) {
                c = this.getChildAt(i)
                if (c) {
                    lc = ViewGroup.asViewInterface(c)
                    if (lc) {
                        p = lc.getLayoutParams()
                        lc.measure(
                            ViewGroup.getChildMeasureSpec(widthMeasureSpec, p.marginLeft + p.marginRight, p.width),
                            ViewGroup.getChildMeasureSpec(heightMeasureSpec, p.marginTop + p.marginBottom, p.height)
                        )
                        if (lc.getMeasuredWidth() > wantWidth)
                            wantWidth = lc.getMeasuredWidth()
                        if (lc.getMeasuredHeight() > wantHeight)
                            wantHeight = lc.getMeasuredHeight()
                        if (measureMatchParentChildren) {
                            if (p.width == ViewGroupLayoutParams.MATCH_PARENT || p.height == ViewGroupLayoutParams.MATCH_PARENT) {
                                matchParentChildren.push(lc)
                            }
                        }
                    } else {
                        if (c.width > wantWidth)
                            wantWidth = c.width
                        if (c.height > wantHeight)
                            wantHeight = c.height
                    }
                }
            }
            let width: number
            let height: number
            if (wMode == MeasureSpec.EXACTLY) {
                width = wSize
            } else if (wMode == MeasureSpec.AT_MOST) {
                width = Math.min(wSize, wantWidth)
            } else {
                width = wantWidth
            }
            if (hMode == MeasureSpec.EXACTLY) {
                height = hSize
            } else if (hMode == MeasureSpec.AT_MOST) {
                height = Math.min(hSize, wantHeight)
            } else {
                height = wantHeight
            }
            this.setMeasuredDimension(width, height)


            let cWidthMeasureSpec: number
            let cHeightMeasureSpec: number

            if (matchParentChildren.length > 0) {
                for (let child of matchParentChildren) {
                    this._measureChild(child, width, height, widthMeasureSpec, heightMeasureSpec)
                }
            }
        }

        public onLayout(l: number, t: number, r: number, b: number) {
            let width = r - l
            let height = b - t
            let c: egret.DisplayObject
            let lc: ViewInterface
            for (let i = 0; i < this.numChildren; i++) {
                c = this.getChildAt(i)
                if (c) {
                    lc = ViewGroup.asViewInterface(c)
                    if (lc) {
                        this._layoutChild(lc, l, t, r, b)
                    } else {
                        c.x = 0 + c.anchorOffsetX
                        c.y = 0 + c.anchorOffsetY
                    }
                }
            }
        }

        private _layoutChild(child: ViewInterface, l: number, t: number, r: number, b: number) {
            let childLeft: number
            let childTop: number
            let p = child.getLayoutParams()
            if (p instanceof FrameLayoutLayoutParams) {
                switch (p.layoutGravity & Gravity.HORIZONTAL_GRAVITY_MASK) {
                    case Gravity.CENTER_HORIZONTAL:
                        childLeft = (this.width >> 1) - (child.getMeasuredWidth() >> 1) + p.marginLeft - p.marginRight
                        break
                    case Gravity.RIGHT:
                        childLeft = this.width - child.getMeasuredWidth() - p.marginRight
                        break
                    case Gravity.LEFT:
                    default:
                        childLeft = 0 + p.marginLeft
                        break
                }
                switch (p.layoutGravity & Gravity.VERTICAL_GRAVITY_MASK) {
                    case Gravity.CENTER_VERTICAL:
                        childTop = (this.height >> 1) - (child.getMeasuredHeight() >> 1) + p.marginTop - p.marginBottom
                        break
                    case Gravity.BOTTOM:
                        childTop = this.height - child.getMeasuredHeight() - p.marginBottom
                        break
                    case Gravity.TOP:
                    default:
                        childTop = 0 + p.marginTop
                        break
                }
                child.layout(childLeft, childTop, childLeft + child.getMeasuredWidth(), childTop + child.getMeasuredHeight())
            } else {
                child.layout(0, 0, child.getMeasuredWidth(), child.getMeasuredHeight())
            }
        }

        private _measureChild(child: ViewInterface, parentWidth: number, parentHeight: number, parentWidthMeasureSpec: number, parentHeightMeasureSpec: number) {
            let cWidthMeasureSpec: number
            let cHeightMeasureSpec: number
            let p = child.getLayoutParams()
            if (p.width == ViewGroupLayoutParams.MATCH_PARENT) {
                cWidthMeasureSpec = MeasureSpec.makeMeasureSpec(parentWidth - p.marginLeft - p.marginRight, MeasureSpec.EXACTLY)
            } else {
                cWidthMeasureSpec = ViewGroup.getChildMeasureSpec(parentWidthMeasureSpec, p.marginLeft + p.marginRight, p.width)
            }
            if (p.height == ViewGroupLayoutParams.MATCH_PARENT) {
                cHeightMeasureSpec = MeasureSpec.makeMeasureSpec(parentHeight - p.marginTop - p.marginBottom, MeasureSpec.EXACTLY)
            } else {
                cHeightMeasureSpec = ViewGroup.getChildMeasureSpec(parentHeightMeasureSpec, p.marginTop + p.marginBottom, p.height)
            }
            child.measure(cWidthMeasureSpec, cHeightMeasureSpec)
        }

        protected onChildAddedAfterAttach(child: egret.DisplayObject) {
            let c = ViewGroup.asViewInterface(child)
            if (c) {
                this._measureChild(c, this.width, this.height, this._oldWidthMeasureSpec, this._oldHeightMeasureSpec)
            }
        }
    }

    export class FrameLayoutLayoutParams extends ViewGroupLayoutParams {
        public layoutGravity: number
    }
}