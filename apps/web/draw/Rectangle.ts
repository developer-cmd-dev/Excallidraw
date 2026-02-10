import { RoughCanvas } from "roughjs/bin/canvas";

export class Rectangle{
    
    x:number;
    y:number;
    width:number=0;
    height:number=0;
    rc:RoughCanvas
    constructor(x: number, y: number,rc:RoughCanvas) {
        this.x = x;
        this.y = y;
        this.rc=rc;
    }

    modifyRect(width:number,height:number){
        this.width=width;
        this.height=height;
        this.renderRectangle();
    }

    renderRectangle(){
       return this.rc.rectangle(this.x,this.y,this.width,this.height,{stroke:'white'});
    }

}