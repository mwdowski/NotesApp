import { NotesDataService } from './../notes-data.service';
import { Component, OnInit } from '@angular/core';
import { Note } from '../note';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  constructor(public notesData: NotesDataService) { }

  ngOnInit(): void {
  }

  log(message: string): void {
    console.log(message);
  }

  deleteNote(note: Note): void {
    this.notesData.deleteNote(note);
  }

}
