import { NotesDataService } from './notes-data.service';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NewNoteEditorComponent } from './new-note-editor/new-note-editor.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    NewNoteEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    NotesDataService,
    {
      provide: APP_INITIALIZER,
      useFactory: (nds: NotesDataService) => () => nds.getDataFromStorage(),
      deps: [NotesDataService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
