import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewNoteEditorComponent } from './new-note-editor.component';

describe('NewNoteEditorComponent', () => {
  let component: NewNoteEditorComponent;
  let fixture: ComponentFixture<NewNoteEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewNoteEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNoteEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
