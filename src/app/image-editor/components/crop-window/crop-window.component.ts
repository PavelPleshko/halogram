import { Component,HostListener,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-crop-window',
  templateUrl: './crop-window.component.html',
  styleUrls: ['./crop-window.component.scss']
})
export class CropWindowComponent{
@Input() dimensions:{width:number,height:number};
@Output() cropBoxPositionChange = new EventEmitter();
  x: number;
  y: number;
  px: number;
  py: number;
  width: number;
  height: number;
  minArea: number;
  draggingCorner: boolean;
  draggingWindow: boolean;
  resizer: Function;
  constructor() { 
  this.x = 300;
    this.y = 100;
    this.px = 0;
    this.py = 0;
    this.width =200;
    this.height=200;
    this.draggingCorner = false;
    this.draggingWindow = false;
    this.minArea = 20000;
}

 
area() {
    return this.width * this.height;
  }

  onCropWindowPress(event: MouseEvent) {
    this.draggingWindow = true;
    this.px = event.clientX;
    this.py = event.clientY;
    
  }

  onCropWindowDrag(event: MouseEvent) {
     if (!this.draggingWindow) {
        return;
    }
    let offsetX = event.clientX - this.px;
    let offsetY = event.clientY - this.py;

    this.x += offsetX;
    this.y += offsetY;
    this.px = event.clientX;
    this.py = event.clientY;
  }



  topLeftResize(offsetX: number, offsetY: number) {
    this.x += offsetX;
    this.y += offsetY;
    this.width -= offsetX;
    this.height -= offsetY;
  }


  topRightResize(offsetX: number, offsetY: number) {
    this.y += offsetY;
    this.width += offsetX;
    this.height -= offsetY;
  }

  bottomLeftResize(offsetX: number, offsetY: number) {
    this.x += offsetX;
    this.width -= offsetX;
    this.height += offsetY;
  }

  bottomRightResize(offsetX: number, offsetY: number) {
    this.width += offsetX;
    this.height += offsetY;
  }

  onCornerClick(event: MouseEvent, resizer?: Function) {
    this.draggingCorner = true;
    this.px = event.clientX;
    this.py = event.clientY;
    this.resizer = resizer;
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('document:mousemove', ['$event'])
  onCornerMove(event: MouseEvent) {
    if (!this.draggingCorner) {
        return;
    }
    let offsetX = event.clientX - this.px;
    let offsetY = event.clientY - this.py;

    let lastX = this.x;
    let lastY = this.y;
    let pWidth = this.width;
    let pHeight = this.height;
   
if (this.area() < this.allowedArea()) {
    this.resizer(offsetX, offsetY);
}
    
    this.px = event.clientX;
    this.py = event.clientY;
  }

  allowedArea(){
  	return this.dimensions.width * this.dimensions.height;
  }


  @HostListener('document:mouseup', ['$event'])
  onCornerRelease(event: MouseEvent) {
    this.draggingWindow = false;
    this.draggingCorner = false;
    this.cropBoxPositionChange.emit({x:this.x,y:this.y,width:this.width,height:this.height});
  }
}
