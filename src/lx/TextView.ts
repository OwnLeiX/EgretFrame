namespace Lx {
    export class TextView extends egret.TextField implements ViewInterface {

        private _measuredWidth: number
        private _measuredHeight: number
        private _oldWidthMeasureSpec: number
        private _oldHeightMeasureSpec: number
        private _flags: number
        protected layoutParams: LayoutParams

        public constructor(layoutParams?: LayoutParams) {
            super()
            this.layoutParams = layoutParams
        }

        public measure(widthMeasureSpec: number, heightMeasureSpec: number) {
            if (this._oldWidthMeasureSpec == widthMeasureSpec && this._oldHeightMeasureSpec == heightMeasureSpec)
                return
            this.onMeasure(widthMeasureSpec, heightMeasureSpec)
            this._oldWidthMeasureSpec = widthMeasureSpec
            this._oldHeightMeasureSpec = heightMeasureSpec
        }

        protected onMeasure(widthMeasureSpec: number, heightMeasureSpec: number) {
            //egret.TextField在设置了字体和文本后就有了 width 和 height 属性，因此以此作为WRAP_CONTENT时的宽高
            let wMode = MeasureSpec.getMode(widthMeasureSpec)
            let wSize = MeasureSpec.getSize(widthMeasureSpec)
            let hMode = MeasureSpec.getMode(heightMeasureSpec)
            let hSize = MeasureSpec.getSize(heightMeasureSpec)
            if (wMode == MeasureSpec.EXACTLY) {
                this._measuredWidth = wSize
            } else {
                let want = this.width
                if (wMode == MeasureSpec.UNSPECIFIED) {
                    this._measuredWidth = want
                } else {
                    this._measuredWidth = Math.min(want, wSize)
                }
            }
            if (hMode == MeasureSpec.EXACTLY) {
                this._measuredHeight = hSize
            } else {
                let want = this.height
                if (hMode == MeasureSpec.UNSPECIFIED) {
                    this._measuredHeight = want
                } else {
                    this._measuredHeight = Math.min(want, hSize)
                }
            }
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
                sizeChanged = true
            }

            let needlayout = sizeChanged || l != (this.x - this.anchorOffsetX) || t != (this.y - this.anchorOffsetY)
            if (needlayout) {
                this.x = l + this.anchorOffsetX
                this.y = t + this.anchorOffsetY
            }
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
    }
}