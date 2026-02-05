import { RoughCanvas } from "roughjs/bin/canvas";




type Shape = {
    type: 'rec'|'circle',
    startX: number,
    startY: number,
    width: number,
    height: number
}


let drawType = 'rec';

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
                clearDraw(canvas, rc, shape)
                rc.rectangle(startX, startY, width, height, {
                    stroke: 'white'
                })
            }else if(drawType=='circle'){
                const width = e.clientX - startX;
                const height = e.clientY - startY;
                clearDraw(canvas, rc, shape)
                rc.ellipse(startX, startY, width, height, {
                    stroke: 'white'
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
        }
    })




}

function clearDraw(canvas: HTMLCanvasElement, rc: RoughCanvas, shape: Shape[]) {
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
        }
    })
}








