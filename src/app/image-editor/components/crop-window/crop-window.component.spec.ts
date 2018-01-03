import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropWindowComponent } from './crop-window.component';

describe('CropWindowComponent', () => {
  let component: CropWindowComponent;
  let fixture: ComponentFixture<CropWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
