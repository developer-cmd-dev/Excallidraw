import { RoughCanvas } from "roughjs/bin/canvas";
import { Rectangle } from "./Rectangle";
import { Ellipse } from "./Ellipse";
import { Line } from "./Line";




export type ShapesType = 'rec' | 'circle' | 'line' | 'diamond' | 'arrow' | ''



let drawingType: ShapesType = ''

export function handleType(data: ShapesType) {
    drawingType = data
}


type Shapes = Rectangle | Ellipse | Line
let shape: Shapes[] = [];
let canvasObj:HTMLCanvasElement;
let rcObj:RoughCanvas;
let redoShapeArray:Shapes[]=[];

export function initDraw(rc: RoughCanvas, canvas: HTMLCanvasElement) {
    let rectObj: Rectangle;
    let ellipseObj: Ellipse;
    let lineObj: Line;
    let clicked = false;
    canvasObj=canvas;
    rcObj=rc;

    canvas.addEventListener('mousedown', (e) => {
        if (drawingType == 'rec') {
            rectObj = new Rectangle(e.clientX, e.clientY, rc);
            rectObj.renderRectangle();
        } else if (drawingType == 'circle') {
            ellipseObj = new Ellipse(e.clientX, e.clientY, rc)
            ellipseObj.renderEllipse()
        } else if (drawingType == 'line') {
            lineObj = new Line(e.clientX, e.clientY, e.clientX, e.clientY, rc);
            lineObj.renderLine()
        }
        clicked = true;
    })

    canvas.addEventListener('mousemove', (e) => {
        if (clicked) {
            if (rectObj && drawingType == 'rec') {
                const width = e.clientX - rectObj.x;
                const height = e.clientY - rectObj.y;
                renderCanvas(0, canvas, rc, shape)
                rectObj.modifyRect(width, height)
            } else if (ellipseObj && drawingType == 'circle') {
                const width = e.clientX - ellipseObj.x;
                const height = e.clientY - ellipseObj.y;
                renderCanvas(0, canvas, rc, shape)
                ellipseObj.modifyEllipse(width, height)
            } else if (lineObj && drawingType == 'line') {
                const x2 = e.clientX;
                const y2 = e.clientY;
                renderCanvas(0, canvas, rc, shape);
                lineObj.modifyLine(x2, y2);
            }
        };

    })

    canvas.addEventListener('mouseup', (e) => {
        if (rectObj && drawingType == 'rec') {
            shape.push(rectObj)
        } else if (ellipseObj && drawingType == 'circle') {
            shape.push(ellipseObj)
        } else if (lineObj && drawingType == 'line') {
            shape.push(lineObj)
        }
        clicked = false
        cancleReRendering()
    })


}

let requestId = 0;

function renderCanvas(timestamp: number, canvas?: HTMLCanvasElement, rc?: RoughCanvas, shape?: Shapes[]) {

    const ctx = canvas?.getContext('2d');
    if (canvas && ctx && shape && rc) {
        ctx?.clearRect(0, 0, canvas?.width, canvas?.height)
        shape.map((data) => {
            if (data instanceof Rectangle) {
                data.renderRectangle()
            } else if (data instanceof Ellipse) {
                data.renderEllipse()
            } else if (data instanceof Line) {
                data.renderLine()
            }
        })
    }
    requestId = requestAnimationFrame(renderCanvas)

}


function cancleReRendering() {
    cancelAnimationFrame(requestId)
}


export function undo(){
   const lastElement= shape.pop();
   if(lastElement){
    redoShapeArray.push(lastElement);
   }
    renderCanvas(0,canvasObj,rcObj,shape)
}


export function redo(){
    const lastElement = redoShapeArray.pop();
    if(lastElement){
        shape.push(lastElement);
    }
    renderCanvas(0,canvasObj,rcObj,shape)

}



