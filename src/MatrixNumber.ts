import P5 from "p5";

export default class MatrixNumber {
    private p5: P5;
    private x: number;
    private y: number;

    private value: string;
    private color: string;
    private opacity: number;

    private pulsateStart: number;

    constructor(p5: P5, x: number, y: number, value: string, color: string, opacity: number) {
        this.p5 = p5;
        this.x = x;
        this.y = y;

        this.value = value;
        this.color = color;
        this.opacity = opacity;
    }

    public draw(): void {
        const targetOpacity = this.opacity * 255;

        let calculatedOpacity = targetOpacity;

        if (this.pulsateStart != null) {
            const m = this.p5.millis();
            const ellapsed = m - this.pulsateStart;

            const pulsateOpacity = 255 - targetOpacity;

            if (ellapsed < 1000) {
                calculatedOpacity = targetOpacity + (pulsateOpacity / 1000 * ellapsed);
            } else if (ellapsed < 2000) {
                calculatedOpacity = 255 - (pulsateOpacity / 1000 * (ellapsed - 1000));
            } else {
                this.pulsateStart = null;
                calculatedOpacity = targetOpacity;
            }
        }

        const color = this.p5.color(this.color);
        color.setAlpha(calculatedOpacity);

        this.p5.fill(color);
        this.p5.text(this.value, this.x, this.y);
    }

    public pulsate(): void {
        this.pulsateStart = this.p5.millis();
    }
}