import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { NoteService } from '@app/home/note.service';
import { Note } from '@app/home/note.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quote: string;
  notes: Note[];
  addingNote: Note;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.getNotes()
      .subscribe(notes => this.notes = notes);
  }

  edit(note: Note)
  {
    note.isEditing = true;
  }

  save(note: Note)
  {
    if (note === this.addingNote)
    {
      this.noteService.add(note)
        .subscribe(() =>
        {
          note.id = _.last(this.notes).id + 1;
          this.notes.push(note);
          this.addingNote = null;
        });
    }
    else
    {
      this.noteService.update(note)
        .subscribe(() => note.isEditing = false);
    }
  }

  remove(note: Note)
  {
    this.noteService.delete(note)
      .subscribe(() => _.remove(this.notes, note));
  }

  add()
  {
    this.addingNote = {
      id: null,
      title: null
    };
  }
}
