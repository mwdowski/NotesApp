import { NotesDataService } from './../notes-data.service';
import { Component, OnInit } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-new-note-editor',
  templateUrl: './new-note-editor.component.html',
  styleUrls: ['./new-note-editor.component.css']
})
export class NewNoteEditorComponent implements OnInit {

  title = '';
  text = '';

  constructor(private notesData: NotesDataService) {}

  ngOnInit(): void {
  }

  /**
   * Adds a new note to NotesDataService. Takes data from fields of component.
   */
  addNote(): void {
    // don't let user make new note, if they left any field emtpy
    if (this.isAnyFieldEmpty()) {
      return;
    }
    this.notesData.addNote(this.title, this.text);
    this.title = '';
    this.text = '';
  }

  /**
   * Check wether any field - ttile or text - is empty.
   */
  isAnyFieldEmpty(): boolean {
    return (this.title === '' || this.text === '');
  }

}
