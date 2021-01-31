import { Note } from './note';
import { Injectable } from '@angular/core';

const notesIdListTag = 'notesIdList';
const noteTitleTag = 'noteTitle';
const noteTextTag = 'noteText';
const noteDateTag = 'noteDate';
const separator = ';';

@Injectable({
  providedIn: 'root'
})
export class NotesDataService {


  notes: Note[] = [];
  idSource = 0;

  constructor() {}

  /**
   * Creates new note and handles all logic of saving it to browser localStorage.
   * @param title title of new note.
   * @param text text of new note.
   */
  addNote(title: string, text: string): void {
    const newNote = new Note(this.idSource, title, text);
    this.notes.unshift(newNote);
    this.addItemToStorage(newNote);
    this.idSource++;
  }

  deleteNote(note: Note): void {
    // find index of note to delete
    const indexToDelete = this.notes.findIndex( (item) => item.id === note.id );

    // delete item at found index
    this.notes.splice(indexToDelete, 1);

    this.deleteItemFromStorage(note.id);
  }

  /**
   * Returns array of saves notes.
   */
  getNotes(): Note[] {
    return this.notes;
  }

  /**
   * Fetches notes data from browser localStorage into notes array.
   */
  getDataFromStorage(): void {
    // if there is no entry for notesIdList, it means that there is no save data
    if (localStorage.getItem(notesIdListTag) === null) {
      console.log('No data to retrieve');
      return;
    }
    const idString = localStorage.getItem(notesIdListTag);

    // now we want to convert idListString to list of numbers
    // tslint:disable-next-line: no-non-null-assertion
    const idListString = idString!.split(separator);

    // delete last element - because it is an empty string
    idListString.pop();

    // cast items to number type
    const idList = idListString.map( (item: string) =>  +item);

    // set max item + 1 as idSource, to generate new notes' ids
    this.idSource = idList.sort()[idList.length - 1] + 1;

    // great, now we have a list of id's, that match existing notes in the storage
    // it's time to iterate over them
    for (const id of idList) {
      // firstly - get note data
      const title = localStorage.getItem(noteTitleTag + '-' + id);
      const text = localStorage.getItem(noteTextTag + '-' + id);
      const date = localStorage.getItem(noteDateTag + '-' + id);

      // now add note to list of notes
      // tslint:disable-next-line: no-non-null-assertion
      this.notes.push(new Note(id, title!, text!, date!));
    }

    this.notes.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
      return 0;
    });
  }

  /**
   * Puts created node into localStorage.
   * @param note note that we want to put into localStorage.
   */
  addItemToStorage(note: Note): void {
    let idString: string;

    // retrieve list of ids
    // if it's empty - get empty string
    if (localStorage.getItem(notesIdListTag) === null) {
      idString = '';
    }
    else {
      // tslint:disable-next-line: no-non-null-assertion
      idString = localStorage.getItem(notesIdListTag)!;
    }

    // add a new id to the end of the list and put it to storage
    idString = idString + note.id + separator;
    localStorage.setItem(notesIdListTag, idString);

    console.log(idString);
    // add storage data about this note
    localStorage.setItem(noteTitleTag + '-' + note.id, note.title);
    localStorage.setItem(noteTextTag + '-' + note.id, note.text);
    localStorage.setItem(noteDateTag + '-' + note.id, note.date);
  }

  deleteItemFromStorage(id: number): void {
    localStorage.removeItem(noteTitleTag + '-' + id);
    localStorage.removeItem(noteTextTag + '-' + id);
    localStorage.removeItem(noteDateTag + '-' + id);

    const idString = localStorage.getItem(notesIdListTag);

    // now we want to convert idListString to list of numbers
    // tslint:disable-next-line: no-non-null-assertion
    const idListString = idString!.split(separator);

    // delete last element - because it is an empty string
    idListString.pop();

    // cast items to number type
    const idList = idListString.map( (item: string) =>  +item);

    // find index of id to delete and delete it
    const indexToDelete = idList.indexOf(id);
    idList.splice(indexToDelete, 1);

    // rebuild string list of ids
    let idToString = '';
    for (const element of idList) {
      idToString = idToString + element + separator;
    }

    // add string list of ids to localStorage

    if (idToString === '') {
      localStorage.removeItem(notesIdListTag);
    }
    else {
      localStorage.setItem(notesIdListTag, idToString);
    }
  }
}
