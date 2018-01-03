import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSingleComponent } from './profile-single.component';

describe('ProfileSingleComponent', () => {
  let component: ProfileSingleComponent;
  let fixture: ComponentFixture<ProfileSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
