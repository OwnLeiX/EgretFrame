namespace Lx {
    export interface ViewInterface {
        measure(widthMeasureSpec: number, heightMeasureSpec: number)
        layout(l: number, t: number, r: number, b: number)
        getLayoutParams(): LayoutParams
        getMeasuredWidth(): number
        getMeasuredHeight(): number
    }
}