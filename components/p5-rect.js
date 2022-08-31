import p5 from "p5"

const s = sketch => {
    let x = 20
    let y = 20

    sketch.setup = () => {
        sketch.createCanvas(200, 200)
    }

    sketch.draw = () => {
        sketch.background(0)
        sketch.fill(169)
        sketch.rect(x, y, 50, 50)
    }
}

let P5Rect = new p5(s)

export default P5Rect