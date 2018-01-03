import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropControlsComponent } from './crop-controls.component';

describe('CropControlsComponent', () => {
  let component: CropControlsComponent;
  let fixture: ComponentFixture<CropControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
