import { RoughCanvas } from "roughjs/bin/canvas";

export class Ellipse{

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

    modifyEllipse(width:number,height:number){
        this.width=width;
        this.height=height;
        this.renderEllipse();
    }

    renderEllipse(){
       return this.rc.ellipse(this.x,this.y,this.width,this.height,{stroke:'white'});
    }


     toJson(){
        return{
            x:this.x,
            y:this.y,
            width:this.width,
            height:this.height
        }
    }


}