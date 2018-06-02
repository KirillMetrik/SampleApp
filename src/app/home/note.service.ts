import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '@app/home/note.model';

@Injectable()
export class NoteService
{
    constructor(private httpClient: HttpClient) { }

    getNotes(): Observable<Note[]>
    {
        return this.httpClient.get<Note[]>('/notes');
    }

    update(note: Note)
    {
        return this.httpClient.put(`/notes/${note.id}`, note);
    }

    delete(note: Note)
    {
        return this.httpClient.delete(`/notes/${note.id}`);
    }

    add(note: Note)
    {
        return this.httpClient.post('/notes', note);
    }
}