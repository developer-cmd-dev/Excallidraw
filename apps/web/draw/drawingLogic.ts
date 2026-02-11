import { RoughCanvas } from "roughjs/bin/canvas";
import { Rectangle } from "./Rectangle";
import { Ellipse } from "./Ellipse";
import { Line } from "./Line";
import axios, { AxiosError } from "axios";
import { Canvas } from "@repo/common/types.ts";




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

export function initDraw(rc: RoughCanvas, canvas: HTMLCanvasElement, access_token: string, canvasId: string,drawing?:string[]): Shapes[] {
    let rectObj: Rectangle;
    let ellipseObj: Ellipse;
    let lineObj: Line;
    let clicked = false;
    canvasObj = canvas;
    rcObj = rc;

    
    // drawing.map((data)=>{
    //     const jsonData = JSON.parse(data);
    //     if(jsonData){
    //         if(jsonData.type==='rect'){
    //             console.log(jsonData)
    //             const rect = new Rectangle(jsonData.x,jsonData.y,rc);
    //             rect.modifyRect(jsonData.width,jsonData.height);
    //             shape.push(rect);
    //             renderCanvas(0,canvas,rc,shape)
    //         }
    //     }
    // })

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
                renderCanvas( canvas, rc, shape)
                rectObj.modifyRect(width, height)
            } else if (ellipseObj && drawingType == 'circle') {
                const width = e.clientX - ellipseObj.x;
                const height = e.clientY - ellipseObj.y;
                renderCanvas( canvas, rc, shape)
                ellipseObj.modifyEllipse(width, height)
            } else if (lineObj && drawingType == 'line') {
                const x2 = e.clientX;
                const y2 = e.clientY;
                renderCanvas( canvas, rc, shape);
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
        saveCanvas(access_token, canvasId);
        clicked = false

    })


    return []


}


function renderCanvas( canvas?: HTMLCanvasElement, rc?: RoughCanvas, shape?: Shapes[]) {

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

}




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
            }
        }
    } catch (error) {

    }
}


async function axiosOperation(token: string, canvasId: string, data: object) {
    try {
        const response = await axios.post(`${backendUrl}/save-drawing`, { ...data, canvasId: canvasId }, { headers: { Authorization: `Bearer ${token}` } })
        console.log(response.data)
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data)
        }
    }
}

                                                                                                                          

