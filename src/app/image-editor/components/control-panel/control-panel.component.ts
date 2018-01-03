import { Component, OnInit,Input,SimpleChanges,Output,EventEmitter,AfterViewInit } from '@angular/core';
import {FormBuilder,FormArray,Validators,FormGroup,FormControl} from '@angular/forms';
@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit,AfterViewInit {
editForm:FormGroup;
@Input() filters;
@Output() formChanged = new EventEmitter();
@Output() acceptChanges:EventEmitter<{changeType:string}> = new EventEmitter<{changeType:string}>();
get resizing(){
	return this.formModel.resize;
}

get cropping(){
	return this.formModel.crop;
}

get formModel(){
	return {
		resize:this.editForm.get('resize').value,
		crop:this.editForm.get('crop').value,
		filters:{
			contrast:this.editForm.get('filters').get('contrast').value,
			brightness:this.editForm.get('filters').get('brightness').value,
			saturate:this.editForm.get('filters').get('saturate').value,
			sepia:this.editForm.get('filters').get('sepia').value,
			sepia2:this.editForm.get('filters').get('sepia2').value,
			grayscale:this.editForm.get('filters').get('grayscale').value,
			invert:this.editForm.get('filters').get('invert').value,
			noise:this.editForm.get('filters').get('noise').value,
			pixelate:this.editForm.get('filters').get('pixelate').value
		}
	}
}
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
  	this.editForm = this.createForm(); 
  	
  }

  ngAfterViewInit(){
  	this.editForm.valueChanges.subscribe((updatedForm)=>{
  		this.formChanged.next(updatedForm);
  	})
  }

  createForm(){
  	return this.fb.group({
  		resize:[false],
  		crop:[false],
  		filters:this.fb.group({
	  		contrast:[0],
	  		brightness:[0],
	  		saturate:[0],
	  		sepia:[false],
	  		sepia2:[false],
	  		grayscale:[false],
	  		invert:[false],
	  		noise:[0],
	  		pixelate:[0]
  		})
  	})
  }



createFilters(){
for(var filter in this.filters){
	return this.fb.group({
		filterType:filter['type'],
		value:filter['value'],
	})
}
}

accept(changeType){
	this.acceptChanges.next({changeType:changeType});
}

cancel(changeType){
	this.acceptChanges.next({changeType:changeType});
	if(changeType === 'resize'){
		this.editForm.get('resize').setValue(false);
	}else if(changeType === 'crop'){
		this.editForm.get('crop').setValue(false);
	}else if(changeType === 'all'){
		
		this.editForm.reset()
		this.formChanged.next(this.editForm);
	}
	
}


}
