import { NewNoteEditorComponent } from './new-note-editor/new-note-editor.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'notes', component: NotesListComponent },
  { path: 'new', component: NewNoteEditorComponent},
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
