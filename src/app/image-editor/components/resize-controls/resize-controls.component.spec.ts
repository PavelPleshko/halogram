import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeControlsComponent } from './resize-controls.component';

describe('ResizeControlsComponent', () => {
  let component: ResizeControlsComponent;
  let fixture: ComponentFixture<ResizeControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResizeControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizeControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
