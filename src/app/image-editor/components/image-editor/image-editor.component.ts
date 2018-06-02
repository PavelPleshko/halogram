import { Component, OnInit,OnDestroy,Output,EventEmitter,ViewChild,ElementRef,AfterViewInit,Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {ImageEditorService} from '../../services/image-editor.service';
import {FormGroup} from '@angular/forms';
import * as Swiper from 'swiper';
import * as Fabric from 'fabric';
import {ControlPanelComponent} from '../control-panel/control-panel.component';
@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss','../../../../../node_modules/swiper/dist/css/swiper.css']
})
export class ImageEditorComponent implements OnInit,AfterViewInit,OnDestroy {
	image;
  originalImage;
  imageBeforeChanges={
    src:null,
    width:0,
    height:0
  };
  imgOriginalData:{width:number,height:number}={width:undefined,height:undefined};
  ctx:CanvasRenderingContext2D;
  canvas;
  cropBox;
  filterCanvas;
  endResize;
  resize;
  startMovingInitialPos={x:0,y:0};
  pX=0;
  pY=0;
  currentDimensions:{width:number,height:number}={width:undefined,height:undefined};

  resizeMode:boolean=false;
  cropMode:boolean=false;
  filterMode:boolean=false;
  startMove;
  move;
  endMove;
  filters;
  imgStyle;
  eventState=new Object();
  loading:boolean= false;
  isInitialized:boolean=false;

limits = {
  max_width:1200,
  max_height:1000,
  min_width:60,
  min_height:60
};

subscriptions=[];



  editmode:boolean = true;
  private selected:number;
	@ViewChild('swiper') swiperGallery:ElementRef;
  @ViewChild('scrollbar') scrollbar:ElementRef;
  @ViewChild('handle_se') handle_se:ElementRef;
  @ViewChild('handle_sw') handle_sw:ElementRef;
  @ViewChild('handle_ne') handle_ne:ElementRef;
  @ViewChild('handle_nw') handle_nw:ElementRef;
  @ViewChild('imageToResize') imageToResize:ElementRef;
  @ViewChild('resize_subcontainer') container:ElementRef;
 @ViewChild('c_panel') c_panel:ControlPanelComponent;

filterPresets = [
{filter:'contrast(120%) brightness(130%) saturate(100%)',fabric:{contrast:62,brightness:30},labelName:'1977'},
{filter:'contrast(120%) brightness(140%) saturate(205%)',fabric:{contrast:78,brightness:51,saturate:200},labelName:'Happiness'},
{filter:'contrast(90%) saturate(20%) brightness(100%) sepia(100%) hue-rotate(30deg)',fabric:{brightness:4,saturate:28,sepia2:true,grayscale:true},labelName:'Retro'},
{filter:'brightness(300%) hue-rotate(290deg) contrast(55%)',fabric:{contrast:19,sepia:true},labelName:'Gingham'},
{filter:'contrast(100%) brightness(260%)',fabric:{contrast:100,brightness:80},labelName:'Sunshine'},
{filter:'contrast(200%) brightness(120%) saturate(110%) grayscale(100%)',fabric:{contrast:99,grayscale:true,saturate:77},labelName:'Sincity'},
{filter:'contrast(110%) brightness(110%) sepia(30%) grayscale(100%)',fabric:{contrast:28,brightness:28,grayscale:true},labelName:'Inkwell'}
];

  constructor(private imageEditor:ImageEditorService,private renderer:Renderer2,
    private router:Router){ }

  ngOnInit(){
  	let imgSub = this.imageEditor.imageToEdit$.subscribe((img)=>{
  		if(img){
  			this.image = img;
        this.originalImage = img;
  		}
  	})  
    this.subscriptions.push(imgSub);
  }

ngAfterViewInit(){

  var swiper = Swiper.default;
  const mySwiper = new swiper(this.swiperGallery.nativeElement,{
      slidesPerView:'auto',
      scrollbar:{
        el:this.scrollbar.nativeElement,
        hide:true
      }
    });

  if(this.image){
    this.imgOriginalData ={
      width:this.imageToResize.nativeElement.width,
      height:this.imageToResize.nativeElement.height
    }
    this.currentDimensions=this.imgOriginalData;
    
  }
this.startResizeListeners();
  
      this.canvas = document.getElementById('canvas');
      this.filterCanvas = new Fabric.fabric.Canvas('filterCanvas');

}


startResizeListeners(){
   if(this.editmode){
     let se =  this.renderer.listen(this.handle_se.nativeElement,'mousedown',this.startResizing.bind(this));
      let ne =  this.renderer.listen(this.handle_ne.nativeElement,'mousedown',this.startResizing.bind(this));
      let sw =  this.renderer.listen(this.handle_sw.nativeElement,'mousedown',this.startResizing.bind(this));
      let nw =  this.renderer.listen(this.handle_nw.nativeElement,'mousedown',this.startResizing.bind(this));
    this.startMove = this.renderer.listen(this.imageToResize.nativeElement,'mousedown',this.startMoving.bind(this))
    }
}

select(name,fabricConfig){
this.updateForm(fabricConfig);
}

updateForm(options){
  
  let formFilters = this.c_panel.editForm.get('filters') as FormGroup;
   formFilters.reset();
  for(var key in options){
    formFilters.get(key).patchValue(options[key]);
  }
}

onFormChanged(form){
  this.isInitialized=true;
this.resizeMode = form['resize'];
this.cropMode = form['crop'];
this.filters = form['filters'];
if(!this.resizeMode && !this.cropMode){
this.updatePicture(this.filters);
}else{
  this.filterMode=false;
}
}

updatePicture(filters){
  if(!filters) return;
  this.filterMode = true;
  var that = this;
  Fabric.fabric.Image.fromURL(this.imageToResize.nativeElement.currentSrc,function(img){
    that.filterCanvas.removeListeners();
    //normalize the width and height
    while(img.height > 550 || img.width > 800){
      img.width *= 0.97;
      img.height *=0.97;
    }
  that.filterCanvas.setHeight(img.height);
that.filterCanvas.setWidth(img.width);

 that.filterCanvas.setBackgroundImage(img);
that.filterCanvas.setActiveObject(img);
var obj = that.filterCanvas.getActiveObject();

   obj.filters = that.getImageFiltersFromForm(filters);

that.loading = true;
obj.applyFilters(function(){
  that.filterCanvas.renderAll.call(that.filterCanvas);
  that.loading = false;
});
})
}

getImageFiltersFromForm(filters){
  let imgFilters = [];
  if(filters['saturate'] > '0'){
    imgFilters.push(new Fabric.fabric.Image.filters.Saturate({saturate:filters['saturate']}))
  }
  if(filters['grayscale'] === true){
    imgFilters.push(new Fabric.fabric.Image.filters.Grayscale())
  }
  if(filters['brightness'] > '0'){
    imgFilters.push(new Fabric.fabric.Image.filters.Brightness({brightness:filters['brightness']}))
  }
   if(filters['sepia'] === true){
    imgFilters.push(new Fabric.fabric.Image.filters.Sepia())
  }
  if(filters['sepia2'] === true){
    imgFilters.push(new Fabric.fabric.Image.filters.Sepia2())
  }
  if(filters['invert'] === true){
    imgFilters.push(new Fabric.fabric.Image.filters.Invert())
  }
    if(filters['contrast'] > '0'){
    imgFilters.push(new Fabric.fabric.Image.filters.Contrast({contrast:filters['contrast']}))
  }
  if(filters['noise'] > '0'){
    imgFilters.push(new Fabric.fabric.Image.filters.Noise({noise:filters['noise']}))
  }
    if(filters['pixelate'] > '0'){
    imgFilters.push(new Fabric.fabric.Image.filters.Pixelate({blocksize:filters['pixelate']}))
  }

  return imgFilters;
}



startMoving(e){
  e.preventDefault();
  e.stopPropagation();
  this.saveEventState(e);
    this.startMovingInitialPos.y = e.clientY - this.container.nativeElement.style.top.replace('px','');
    this.startMovingInitialPos.x = e.clientX - this.container.nativeElement.style.left.replace('px','');
  this.move = this.renderer.listen('document','mousemove',this.moving.bind(this));
  this.endMove = this.renderer.listen('document','mouseup',this.endMoving.bind(this));
}

endMoving(e){
  e.preventDefault();
  this.endMove(); 
  this.move();
  this.saveEventState(e,true);
}

moving(e){
  e.preventDefault();
  e.stopPropagation();
  var container = this.container.nativeElement;
  container.style.left = (e.clientX-this.startMovingInitialPos.x) +'px';
  container.style.top = (e.clientY-this.startMovingInitialPos.y)+'px';
}

startResizing(e){
  this.saveEventState(e,true);
  this.pX = e.clientX;
  this.pY = e.clientY;
  console.log(e);
  this.resize = this.renderer.listen('document','mousemove',this.resizing.bind(this));
  this.endResize = this.renderer.listen('document','mouseup',this.endResizing.bind(this));
}



saveEventState(e,updateEvent?){
var container = this.container.nativeElement;

this.eventState['container_width'] = container.clientWidth;
this.eventState['container_height'] = container.clientHeight;
this.eventState['container_left'] = Number(container.style.left.replace('px',''));
this.eventState['container_left2'] = +container.offsetLeft;
this.eventState['container_top2'] = +container.offsetTop;
this.eventState['container_top'] = Number(container.style.top.replace('px',''));
this.eventState['mouse_x'] = e.clientX;
this.eventState['mouse_y'] = e.clientY;
if(updateEvent){
  this.eventState['evnt'] = e;
}
}

resizing(e){
e.preventDefault();
e.stopPropagation();
var img = e.target;
var container = this.container.nativeElement;
var height=this.imageToResize.nativeElement.height,
width=this.imageToResize.nativeElement.width,
left=this.eventState['container_left'],
top=this.eventState['container_top'],mouse={};
var target = this.eventState['evnt'].target;
mouse['x'] = e.clientX;
mouse['y'] = e.clientY;
let offsetX = e.clientX-this.pX;
let offsetY = e.clientY-this.pY;
      if(hasClass.call(target,'resize-handle-se')){
      width += offsetX;
      height += offsetY;     
      }
      else if(hasClass.call(target,'resize-handle-sw')){
        width -= offsetX;
        height+= offsetY;
        left += offsetX;
        
      }else if(hasClass.call(target,'resize-handle-nw')){
    width -=offsetX
    height -=offsetY;
    left +=offsetX;
    top +=offsetY;
  }else if(hasClass.call(target,'resize-handle-ne')){
    width +=offsetX;
    height -=offsetY;   
    top +=offsetY;
  }
 if(width < this.limits.max_width && width > this.limits.min_width &&
  height < this.limits.max_height && height > this.limits.min_height){
    this.imageToResize.nativeElement.width =width;
  this.imageToResize.nativeElement.height = height;
   this.imageToResize.nativeElement.style.width = width+'px';
    this.imageToResize.nativeElement.style.height = height+'px';
    container.style.left = left + 'px';
    container.style.top = top+'px';
     this.updateCurrentDimensions(width,height);
     }
  
  this.saveEventState(e,false);
     this.pX = e.clientX;
     this.pY = e.clientY;
}

endResizing(e){
  e.preventDefault();
  e.stopPropagation();
  this.endResize();
  this.resize(); //cancel event;
}

updateCurrentDimensions(width?,height?){
  if(!width || !height){
    width = this.imageToResize.nativeElement.width;
    height = this.imageToResize.nativeElement.height;
  }
    this.currentDimensions = {
      width:width,
      height:height
    }
  
}


onAcceptOrCancelChanges(changes){
if(!changes){
return;
}
switch(changes.changeType){
  case 'acceptResize':
  var changedImg = this.transformImage('resize');
  this.imageEditor.setImage(changedImg);
  break;
  case 'cancelResize':
  this.imageToResize.nativeElement.width = this.imgOriginalData.width;
  this.imageToResize.nativeElement.height = this.imgOriginalData.height;
   var changedImg = this.transformImage('resize');
  this.imageEditor.setImage(changedImg);
  break;
  case 'acceptCrop':
  var changedImg = this.transformImage('crop');
  this.imageEditor.setImage(changedImg);
  break;
  case 'cancelCrop':
  this.imageEditor.setImage(this.imageBeforeChanges.src);
  this.imageToResize.nativeElement.width = this.imageBeforeChanges.width;
  this.imageToResize.nativeElement.height = this.imageBeforeChanges.height;
  this.imageToResize.nativeElement.style.width = this.imageBeforeChanges.width+'px';
  this.imageToResize.nativeElement.style.height = this.imageBeforeChanges.height+'px';
  break;
}
this.updateCurrentDimensions();
}

transformImage(transformType){
  this.ctx= this.canvas.getContext('2d');
    let scaleW = this.imageToResize.nativeElement.naturalWidth/this.imageToResize.nativeElement.clientWidth;
     let scaleH = this.imageToResize.nativeElement.naturalHeight/this.imageToResize.nativeElement.clientHeight;
  let x,y,width,height;
  this.saveImageBeforeChanges();

  if(transformType === 'resize'){
    x=0;
    y=0;
    width=this.imageToResize.nativeElement.clientWidth;
    height = this.imageToResize.nativeElement.clientHeight;
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.height=height+'px';
   this.canvas.style.width = width+'px';
    this.ctx.drawImage(this.imageToResize.nativeElement,x,y,width,height);
  
  }else if(transformType === 'crop'){
    x = this.cropBox['x'];
    y = this.cropBox['y'];
    width = this.cropBox['width'];
    height = this.cropBox['height'];
     this.canvas.width = width;
     this.canvas.height = height;
   this.canvas.style.height=height+'px';
   this.canvas.style.width = width+'px';
    this.ctx.drawImage(this.imageToResize.nativeElement,x*scaleW,y*scaleH,
      width*scaleW,height*scaleH,0,0,width,height);

    this.imageToResize.nativeElement.style.width = this.canvas.style.width;
    this.imageToResize.nativeElement.style.height = this.canvas.style.height;
  }
   let src = this.canvas.toDataURL('image/png',1);
   return src;
}


saveImageBeforeChanges(){
  let canvas = document.createElement('canvas');
  canvas.style.display = 'none';
     let width=this.imageToResize.nativeElement.clientWidth;
    let height = this.imageToResize.nativeElement.clientHeight;
    canvas.width = width;
    canvas.height = height;
    canvas.style.height=height+'px';
   canvas.style.width = width+'px';
   let ctx = canvas.getContext('2d');
    ctx.drawImage(this.imageToResize.nativeElement,0,0,width,height);
     let src = canvas.toDataURL('image/png',1);
     this.imageBeforeChanges = {
       src:src,
       width:width,
       height:height
     };
}


updateCropBoxPosition(cropBox){
  this.cropBox = cropBox;
}

saveImage(pc:boolean){
  let dataURL = this.filterCanvas.toDataURL({format:'jpeg',quality:1});
   if(pc){
      let blob = this.convertUrlToBlob(dataURL);
      let anchor:HTMLAnchorElement = this.renderer.createElement('a');
      let url = window.URL.createObjectURL(blob);
      this.renderer.appendChild(this.imageToResize.nativeElement,anchor);
      this.renderer.setStyle(anchor,'display','none');
      this.renderer.setAttribute(anchor,'href',url);
      
      anchor.download = 'newfile.jpeg';
      anchor.click();
      window.URL.revokeObjectURL(url);
    }else{
      this.imageEditor.setImage(dataURL);
      this.router.navigate(['/post/new']);
    }
}

cancelChanges(){
  this.imageEditor.setImage(this.originalImage);
  this.router.navigateByUrl('/post/new'); 
  }


convertUrlToBlob(dataURL){
   let arr = dataURL.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}


ngOnDestroy(){
 this.subscriptions.forEach((sub)=>{
   sub.unsubscribe();
 })
}
}


function hasClass(className){
  return Array.prototype.includes.call(this.classList,className);
}