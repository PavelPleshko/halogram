import { Component,forwardRef,Input,Output,EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


export const FILTER_TYPE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomControlComponent),
  multi: true
};
@Component({
  selector: 'app-custom-control',
  templateUrl: './custom-control.component.html',
  styleUrls: ['./custom-control.component.css'],
  providers:[FILTER_TYPE_ACCESSOR]
})
export class CustomControlComponent implements ControlValueAccessor {
@Input() allowedValues:Array<string>;
@Input() value;
@Input() name:string;
@Input() radio:boolean;
@Output() valueChange = new EventEmitter();
private onModelChange: Function;
private onTouch: Function;
focused: string;

  constructor() { }

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: string) {
    this.value = value;
  }

  onChange(value: string) {
    this.value = value;
    this.onModelChange(value);
    this.valueChange.emit(value);
  }

  onBlur(value: string) {
    this.focused = '';
  }

  onFocus(value: string) {
    this.focused = value;
    this.onTouch();
}
}
