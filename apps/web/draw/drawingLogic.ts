import { RoughCanvas } from "roughjs/bin/canvas";




type Shape ={
    type:'rec',
    startX:number,
    startY:number,
    width:number,
    height:number
}



export function initDraw(rc:RoughCanvas,canvas:HTMLCanvasElement) {

  
    let isDown =false;
    let startX=0;
    let startY=0;

    let shape:Shape[] = []
   

   canvas.addEventListener('mousedown',(e)=>{
    isDown=true;
    startX=e.clientX;
    startY=e.clientY;

 
   })

   canvas.addEventListener('mousemove',(e)=>{
   if(isDown){
    const width = e.clientX-startX;
    const height=e.clientY-startY;
    clearDraw(canvas,rc,shape)
    rc.rectangle(startX,startY,width,height,{
        stroke:'white'
    })
   }
   })

   canvas.addEventListener('mouseup',(e)=>{
    isDown=false;
    const width = e.clientX-startX;
    const height=e.clientY-startY;
    shape.push({type:'rec',startX,startY,width,height})
   })
   
   


}

function clearDraw(canvas:HTMLCanvasElement,rc:RoughCanvas,shape:Shape[]){
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0,0,canvas.width,canvas.height)

    shape.forEach((elem)=>{
        rc.rectangle(elem.startX,elem.startY,elem.width,elem.height,{
            stroke:'white'
        })
    })
}








