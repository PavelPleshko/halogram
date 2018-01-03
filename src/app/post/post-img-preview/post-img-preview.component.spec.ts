import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostImgPreviewComponent } from './post-img-preview.component';

describe('PostImgPreviewComponent', () => {
  let component: PostImgPreviewComponent;
  let fixture: ComponentFixture<PostImgPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostImgPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostImgPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
