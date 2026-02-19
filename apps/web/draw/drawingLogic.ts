import { RoughCanvas } from "roughjs/bin/canvas";
<<<<<<< HEAD
=======
import { Rectangle } from "./Rectangle";
import { Ellipse } from "./Ellipse";
import { Line } from "./Line";
import axios, { AxiosError } from "axios";
import { Canvas } from "@repo/common/types.ts";
>>>>>>> master




<<<<<<< HEAD
type Shape = {
    type: 'rec'|'circle',
    startX: number,
    startY: number,
    width: number,
    height: number
}|{
    type:'line';
    startX:number;
    startY:number;
    endX:number;
    endY:number;
}


let drawType = '';

export function handleType(data: string) {
    drawType = data;
}



export function initDraw(rc: RoughCanvas, canvas: HTMLCanvasElement) {


    let isDown = false;
    let startX = 0;
    let startY = 0;

    let shape: Shape[] = []



    canvas.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.clientX;
        startY = e.clientY;



    })

    canvas.addEventListener('mousemove', (e) => {
        if (isDown) {
            if (drawType == 'rec') {
                const width = e.clientX - startX;
                const height = e.clientY - startY;
                rePaint(canvas, rc, shape)
                rc.rectangle(startX, startY, width, height, {
                    stroke: 'white'
                })
            }else if(drawType=='circle'){
                const width = e.clientX - startX;
                const height = e.clientY - startY;
                rePaint(canvas, rc, shape)
                rc.ellipse(startX, startY, width, height, {
                    stroke: 'white'
                })
            }else if(drawType=='line'){
                const endX=e.clientX;
                const endY=e.clientY;
                rePaint(canvas,rc,shape)
                rc.line(startX,startY,endX,endY,{
                    stroke:'white'
                })
            }
        }
    })

    canvas.addEventListener('mouseup', (e) => {
        isDown = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;

        if(drawType=='rec'){
            shape.push({ type: 'rec', startX, startY, width, height })
        }else if(drawType=='circle'){
            shape.push({type:'circle',startX,startY,width,height});
        }else if(drawType=='line'){
            const endX=e.clientX;
            const endY=e.clientY;
            shape.push({type:'line',startX,startY,endX,endY})
        }
    })


=======
export type ShapesType = 'rec' | 'circle' | 'line' | 'diamond' | 'arrow' | ''



let drawingType: ShapesType = ''
const backendUrl = process.env.NEXT_BACKEND_URL;
export function handleType(data: ShapesType) {
    drawingType = data
}


type Shapes = Rectangle | Ellipse | Line
let shape: Shapes[] = [];
let canvasObj: HTMLCanvasElement;
let rcObj: RoughCanvas;
let redoShapeArray: Shapes[] = [];

export function initDraw(rc: RoughCanvas, canvas: HTMLCanvasElement, access_token: string, canvasId: string, drawing?: string[]): Shapes[] {
    let rectObj: Rectangle;
    let ellipseObj: Ellipse;
    let lineObj: Line;
    let clicked = false;
    canvasObj = canvas;
    rcObj = rc;

    canvas.addEventListener('mousedown', (e) => {
        redoShapeArray = []
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
                renderCanvas(canvas, rc, shape)
                rectObj.modifyRect(width, height)
            } else if (ellipseObj && drawingType == 'circle') {
                const width = e.clientX - ellipseObj.x;
                const height = e.clientY - ellipseObj.y;
                renderCanvas(canvas, rc, shape)
                ellipseObj.modifyEllipse(width, height)
            } else if (lineObj && drawingType == 'line') {
                const x2 = e.clientX;
                const y2 = e.clientY;
                renderCanvas(canvas, rc, shape);
                lineObj.modifyLine(x2, y2);
            }
        };

    })

    canvas.addEventListener('mouseup', (e) => {
        if (rectObj && drawingType == 'rec') {
            shape.push(rectObj)
        saveCanvas(access_token, canvasId);

        } else if (ellipseObj && drawingType == 'circle') {
            shape.push(ellipseObj)
        saveCanvas(access_token, canvasId);

        } else if (lineObj && drawingType == 'line') {
            shape.push(lineObj)
        saveCanvas(access_token, canvasId);

        }
        clicked = false

    })


    return []
>>>>>>> master


}

<<<<<<< HEAD
function rePaint(canvas: HTMLCanvasElement, rc: RoughCanvas, shape: Shape[]) {
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height)

    shape.forEach((elem) => {
        if(elem.type=='rec'){
            rc.rectangle(elem.startX, elem.startY, elem.width, elem.height, {
                stroke: 'white'
            })
        }else if(elem.type=='circle'){
            rc.ellipse(elem.startX,elem.startY,elem.width,elem.height,{
                stroke:'white'
            })
        }else if(elem.type=='line'){
            rc.line(elem.startX,elem.startY,elem.endX,elem.endY,{
                stroke:'white'
            })
        }
    })
=======

export function renderExistingCanvas(savedDrawing: string[]) {
    shape=[]
    savedDrawing.forEach((data) => {
        const drawingData = JSON.parse(data);
        if (drawingData.type === 'rect') {
            const rectangle = new Rectangle(drawingData.x, drawingData.y, rcObj);
            rectangle.modifyRect(drawingData.width, drawingData.height);
            shape.push(rectangle)
        }else if(drawingData.type ==='circle'){
            const ellipse = new Ellipse(drawingData.x,drawingData.y,rcObj);
            ellipse.modifyEllipse(drawingData.width,drawingData.height);
            shape.push(ellipse)
        }else if(drawingData.type ==='line'){
            const line = new Line(drawingData.x1,drawingData.y1,drawingData.x2,drawingData.y2,rcObj);
            shape.push(line)
        }
    })
    renderCanvas(canvasObj, rcObj, shape)
    

}


function renderCanvas(canvas?: HTMLCanvasElement, rc?: RoughCanvas, shape?: Shapes[]) {

    const ctx = canvas?.getContext('2d');
    if (canvas && ctx && shape && rc) {
        ctx.clearRect(0, 0, canvas?.width, canvas?.height)
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

>>>>>>> master
}




<<<<<<< HEAD

=======
export function undo() {
    const lastElement = shape.pop();
    if (lastElement) {
        redoShapeArray.push(lastElement);
    }
    renderCanvas(canvasObj, rcObj, shape)
}


export function redo() {
    const lastElement = redoShapeArray.pop();
    if (lastElement) {
        shape.push(lastElement);
    }
    renderCanvas(canvasObj, rcObj, shape)

}


async function saveCanvas(token: string, canvasId: string) {
    try {
        if (shape.length > 0) {
            const lastElement = shape[shape.length - 1];

            if (lastElement instanceof Rectangle) {
                axiosOperation(token, canvasId, lastElement.toJson())
            }else if(lastElement instanceof Ellipse){
                axiosOperation(token,canvasId,lastElement.toJson())
            }else if(lastElement instanceof Line){
                axiosOperation(token,canvasId,lastElement.toJson())
            }
        }
    } catch (error) {
       return error
    }
}


async function axiosOperation(token: string, canvasId: string, data: object) {
    try {
        const response = await axios.post(`${backendUrl}/save-drawing`, { ...data, canvasId: canvasId }, { headers: { Authorization: `Bearer ${token}` } })
        console.log(response.data)
    } catch (error) {
        return error
    }
}
>>>>>>> master



