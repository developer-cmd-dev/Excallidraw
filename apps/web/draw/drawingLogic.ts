import { clear } from "console";
import { Shapes } from "../app/canvas/page";


type Shape = {
    type: 'rec';
    startX: number;
    startY: number;
    width: number;
    height: number;
} | {
    type: 'circle';
    centerX: number;
    centerY: number;
    radius: number;
    dx:number;
    dy:number;

}

let shapeType='rec';

export function getShapeType (type:string){
    console.log(type)
    shapeType=type;
}



export function initDraw(canvas: HTMLCanvasElement) {

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    let clicked = false;
    let startX = 0;
    let startY = 0;
    let existingShape: Shape[] = []

    canvas.addEventListener('mousedown', (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    })

    canvas.addEventListener('mousemove', (e) => {
        if (clicked) {
            if(shapeType=='rec'){
                let width = e.clientX - startX;
                let height = e.clientY - startY;
                renderExistingShape(existingShape, canvas, ctx);
                ctx.strokeStyle = 'white';
                ctx.strokeRect(startX, startY, width, height);
            }else if(shapeType=='circle'){
                let dx=e.clientX-startX;
                let dy=e.clientY-startY;
                const radius = Math.sqrt(dx * dx + dy * dy);
                renderExistingShape(existingShape,canvas,ctx)
                ctx.beginPath();
                ctx.arc(startX,startY,radius,0,2*Math.PI,false)
                ctx.stroke();

            }
           

            
        }
    })

    canvas.addEventListener('mouseup', (e) => {
        clicked = false;
    if(shapeType=='rec'){
        let width = e.clientX - startX;
        let height = e.clientY - startY;
        existingShape.push({
            type: 'rec',
            startX,
            startY,
            width,
            height
        })
    }else if(shapeType=='circle'){
        let dx=e.clientX-startX;
        let dy=e.clientY-startY;
        const radius = Math.sqrt(dx * dx + dy * dy);
        existingShape.push({
            type:'circle',
            centerX:startX,
            centerY:startY,
            dx,
            dy,
            radius
        })
    }
    })





}

function drawing() {

}



function renderExistingShape(existingShape: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    existingShape.forEach((shape) => {
        if (shape.type == 'rec') {
            ctx.strokeStyle = 'white';
            ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
        }else if(shape.type=='circle'){
            ctx.beginPath();
            ctx.arc(shape.centerX,shape.centerX,shape.radius,0,2*Math.PI,false);
            ctx.stroke()
        }
    })
}


