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
                    p = child.getLayoutParams()
                    if (p.width == ViewGroupLayoutParams.MATCH_PARENT) {
                        cWidthMeasureSpec = MeasureSpec.makeMeasureSpec(width - p.marginLeft - p.marginRight, MeasureSpec.EXACTLY)
                    } else {
                        cWidthMeasureSpec = ViewGroup.getChildMeasureSpec(widthMeasureSpec, p.marginLeft + p.marginRight, p.width)
                    }
                    if (p.height == ViewGroupLayoutParams.MATCH_PARENT) {
                        cHeightMeasureSpec = MeasureSpec.makeMeasureSpec(height - p.marginTop - p.marginBottom, MeasureSpec.EXACTLY)
                    } else {
                        cHeightMeasureSpec = ViewGroup.getChildMeasureSpec(height, p.marginTop + p.marginBottom, p.height)
                    }
                    child.measure(cWidthMeasureSpec, cHeightMeasureSpec)
                }
            }
        }

        public onLayout(l: number, t: number, r: number, b: number) {
            let width = r - l
            let height = b - t
            let c: egret.DisplayObject
            let p: LayoutParams
            let lc: ViewInterface
            let childLeft: number
            let childTop: number
            for (let i = 0; i < this.numChildren; i++) {
                c = this.getChildAt(i)
                if (c) {
                    lc = ViewGroup.asViewInterface(c)
                    if (lc) {
                        p = lc.getLayoutParams()
                        if (p instanceof FrameLayoutLayoutParams) {
                            switch (p.layoutGravity & Gravity.HORIZONTAL_GRAVITY_MASK) {
                                case Gravity.CENTER_HORIZONTAL:
                                    childLeft = (this.width >> 1) - (lc.getMeasuredWidth() >> 1) + p.marginLeft - p.marginRight
                                    break
                                case Gravity.RIGHT:
                                    childLeft = this.width - lc.getMeasuredWidth() - p.marginRight
                                    break
                                case Gravity.LEFT:
                                default:
                                    childLeft = 0 + p.marginLeft
                                    break
                            }
                            switch (p.layoutGravity & Gravity.VERTICAL_GRAVITY_MASK) {
                                case Gravity.CENTER_VERTICAL:
                                    childTop = (this.height >> 1) - (lc.getMeasuredHeight() >> 1) + p.marginTop - p.marginBottom
                                    break
                                case Gravity.BOTTOM:
                                    childTop = this.height - lc.getMeasuredHeight() - p.marginBottom
                                    break
                                case Gravity.TOP:
                                default:
                                    childTop = 0 + p.marginTop
                                    break
                            }
                            lc.layout(childLeft, childTop, childLeft + lc.getMeasuredWidth(), childTop + lc.getMeasuredHeight())
                        } else {
                            lc.layout(0, 0, lc.getMeasuredWidth(), lc.getMeasuredHeight())
                        }
                    } else {
                        c.x = 0 + c.anchorOffsetX
                        c.y = 0 + c.anchorOffsetY
                    }
                }
            }
        }
    }

    export class FrameLayoutLayoutParams extends ViewGroupLayoutParams {
        public layoutGravity: number
    }
}