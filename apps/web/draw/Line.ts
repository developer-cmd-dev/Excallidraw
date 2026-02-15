import { RoughCanvas } from "roughjs/bin/canvas";

export class Line{
    x1:number;
    y1:number;
    x2:number;
    y2:number;
    rc:RoughCanvas
    constructor(x1: number, y1: number,x2:number,y2:number,rc:RoughCanvas) {
        this.x1 = x1;
        this.y1= y1;
        this.x2=x2;
        this.y2=y2;
        this.rc=rc;
    }

    modifyLine(x2:number,y2:number){
        this.x2=x2;
        this.y2=y2;
        this.renderLine();
    }

    renderLine(){
       return this.rc.line(this.x1,this.y1,this.x2,this.y2,{stroke:'white',strokeWidth:1});
    }


    toJson(){
        return{
            type:"line",
            x1:this.x1,
            y1:this.y1,
            x2:this.x2,
            y2:this.y2
        }
    }
}