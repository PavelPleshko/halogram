import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostModalComponent } from './profile-post-modal.component';

describe('ProfilePostModalComponent', () => {
  let component: ProfilePostModalComponent;
  let fixture: ComponentFixture<ProfilePostModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePostModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
