import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IEvents } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  urlAPI = environment.urlAPI;

  getEvents() {
    return this.http.get<IEvents>('https://cors-anywhere.herokuapp.com/' + `${this.urlAPI}`);
  }
}
