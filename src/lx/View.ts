namespace Lx {
    export class View extends egret.DisplayObject implements ViewInterface {

        private _measuredWidth: number
        private _measuredHeight: number
        private _oldWidthMeasureSpec: number
        private _oldHeightMeasureSpec: number
        private _flags: number
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
                    let wMode = this.layoutParams.width == ViewGroupLayoutParams.WRAP_CONTENT ? MeasureSpec.AT_MOST : MeasureSpec.EXACTLY
                    let wSize = this.layoutParams.width == ViewGroupLayoutParams.MATCH_PARENT ? this.parent.width : Math.max(0, this.layoutParams.width)

                    let hMode = this.layoutParams.height == ViewGroupLayoutParams.WRAP_CONTENT ? MeasureSpec.AT_MOST : MeasureSpec.EXACTLY
                    let hSize = this.layoutParams.height == ViewGroupLayoutParams.MATCH_PARENT ? this.parent.height : Math.max(0, this.layoutParams.height)
                    this.measure(ViewGroup.getChildMeasureSpec(wMode, 0, wSize), ViewGroup.getChildMeasureSpec(hMode, 0, hSize))
                } else {
                    this.measure(MeasureSpec.makeMeasureSpec(this.width ? this.width : 0, MeasureSpec.EXACTLY), MeasureSpec.makeMeasureSpec(this.height ? this.height : 0, MeasureSpec.EXACTLY))
                }
                let l = this.x ? this.x : 0
                let t = this.y ? this.y : 0
                this.layout(l, t, this.getMeasuredWidth(), this.getMeasuredHeight())
            }
        }

        private async _detachFromWidnow(ev: egret.Event) {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this._detachFromWidnow, this)
            this.onDetachFromWidnow()
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
            }
        }

        public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number) {
            this.setMeasuredDimension(View.getDefaultSize(widthMeasureSpec, 0), View.getDefaultSize(heightMeasureSpec, 0))
        }

        public onLayout(l: number, t: number, r: number, b: number) {

        }

        public setLayoutParams(params: LayoutParams) {
            this.layoutParams = params
        }

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

        public static getDefaultSize(size: number, measureSpec: number): number {
            let result = size
            let specMode = MeasureSpec.getMode(measureSpec)
            let specSize = MeasureSpec.getSize(measureSpec)

            switch (specMode) {
                case MeasureSpec.UNSPECIFIED:
                    result = size
                    break
                case MeasureSpec.EXACTLY:
                case MeasureSpec.AT_MOST:
                    result = specSize
                    break
            }
            return result
        }
    }

    export class MeasureSpec {
        private static readonly MODE_SHIFT: number = 30
        private static readonly MODE_MASK: number = 0x3 << MeasureSpec.MODE_SHIFT

        public static readonly UNSPECIFIED: number = 0 << MeasureSpec.MODE_SHIFT
        public static readonly EXACTLY: number = 1 << MeasureSpec.MODE_SHIFT
        public static readonly AT_MOST: number = 2 << MeasureSpec.MODE_SHIFT


        public static makeMeasureSpec(size: number, mode: number): number {
            return (size & ~MeasureSpec.MODE_MASK) | (mode & MeasureSpec.MODE_MASK)
        }

        public static getMode(measureSpec: number): number {
            return (measureSpec & MeasureSpec.MODE_MASK)
        }
        public static getSize(measureSpec: number): number {
            return (measureSpec & ~MeasureSpec.MODE_MASK)
        }

        protected static adjustSize(measureSpec: number, delta: number): number {
            if (delta == 0)
                return measureSpec
            let mode = MeasureSpec.getMode(measureSpec)
            let size = MeasureSpec.getMode(measureSpec)
            size += delta
            return MeasureSpec.makeMeasureSpec(size, mode)
        }
    }

    export class LayoutParams {
        public width: number = 0
        public height: number = 0

        public marginLeft: number = 0
        public marginRight: number = 0
        public marginTop: number = 0
        public marginBottom: number = 0

        public constructor(w: number, h: number) {
            this.width = w
            this.height = h
        }
    }
}