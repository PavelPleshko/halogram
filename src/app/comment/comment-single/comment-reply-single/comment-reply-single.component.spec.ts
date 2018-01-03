import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentReplySingleComponent } from './comment-reply-single.component';

describe('CommentReplySingleComponent', () => {
  let component: CommentReplySingleComponent;
  let fixture: ComponentFixture<CommentReplySingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentReplySingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentReplySingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
