import { RoughCanvas } from "roughjs/bin/canvas";




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




}

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
}








