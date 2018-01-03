import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostSingleComponent } from './profile-post-single.component';

describe('ProfilePostSingleComponent', () => {
  let component: ProfilePostSingleComponent;
  let fixture: ComponentFixture<ProfilePostSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePostSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
