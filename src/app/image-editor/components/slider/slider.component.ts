
import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  ViewEncapsulation,
  AfterContentInit,
  forwardRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {Input as HammerInput} from 'hammerjs';



const MIN_AUTO_TICK_SEPARATION = 30;

export const MD_SLIDER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SliderComponent),
  multi: true
};

function applyCssTransform(element: HTMLElement, transformValue: string): void {
  let value: string = transformValue.trim();

  element.style.transform = value;
  element.style.webkitTransform = value;
}


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
   providers: [MD_SLIDER_VALUE_ACCESSOR],
   changeDetection:ChangeDetectionStrategy.OnPush,
   host:{
   	'tabindex':'0',	
   	'(change)':'onChange($event)',
   	'(slidestart)':'onSlideStart($event)',
   	'(slideend)':'onSlideEnd()',
   	'(blur)':'onBlur()'
   }
})
export class SliderComponent implements AfterContentInit,ControlValueAccessor {
private _renderer = null;
private _disabled:boolean = false;
@Input() unit:string = '%';
@Input()
@HostBinding('class.slider-disabled')
@HostBinding('attr.aria-disabled')
get disabled():boolean{
	return this._disabled;
}
set disabled(value){
	this._disabled =value;
}

private _filterTypeName:string;

get filterTypeName():string{
	let name = this.filterType;
	name = name.replace(/[_]+/g,' ');
	name = name.charAt(0).toUpperCase() + name.slice(1,name.length);
	console.log(name);
	return name;
}

private _min:number = 0;

@Input()
@HostBinding('attr.aria-valuemin')
get min():number{
	return this._min;
}
set min(v:number){
	this._min = Number(v);
	if(!this._isInitialized){
		this.value = this._min;
	}
}

private _max:number = 100;

@Input()
@HostBinding('attr.aria-valuemax')
get max():number{
	return this._max;
}
set max(v:number){
	this._max = Number(v);
}

private _percent:number = 0;

private _changeFn:(value:any)=>void = (value)=>{
};
onTouched: ()=>any=()=>{};
@Input() step:number = 1;
isSliding:boolean = false;
isActive:boolean = false;
private _isInitialized:boolean = false;
private _value:number = 0;

@Input()
@HostBinding('attr.aria-valuenow')
get value():number{ return this._value}
set value(v:number){
	console.log(v);

if(v == null){
		v = 0;
	}
	this._value = Number(v);
	this._isInitialized = true;
	this._changeFn(this._value);
}

@Input() filterType:string;
@Output() valueChange:EventEmitter<{value:number,type:string}> = new EventEmitter<{value:number,type:string}>(false);
  constructor(private el:ElementRef) {
   }


ngAfterContentInit():void{
this._changeFn(this.value);
}


onChange(event):void{
if(this.disabled){
	return;
}
event.preventDefault();
this.isSliding = true;
this.updateValue(Number(event.target.value));
}


updateValue(value:number){
    this.value = value;

    if (this.filterType) {
      this.valueChange.emit({ value: this.value, type: this.filterType });
}
}
onBlur():void{
	this.isActive = false;
	this.onTouched();
}

updatePercentFromValue():void{
	this._percent = this.calculatePercentage(this.value);
	
}




calculatePercentage(value:number):number{
return (value - this.min)/(this.max - this.min);
}

calculateValue(percentage:number):number{
	return this.min + (percentage*(this.max - this.min));
}

writeValue(value:any):void{
this.value = value;
}

registerOnChange(fn:(value:any)=>void):void{
	this._changeFn = fn;
}

registerOnTouched(fn:any):void{
	this.onTouched = fn;
}

setDisabledState(isDisabled:boolean):void{
	this.disabled = isDisabled;
}



addFocus():void{
	this.el.nativeElement.focus();
}





}
