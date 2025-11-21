import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character, CharacterResponse } from '../models/character.model';
import { LocationDetail } from '../models/location.model';
import { Episode } from '../models/episode.model';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getCharacters(page: number = 1, filters?: any): Observable<CharacterResponse> {
    let params = new HttpParams().set('page', page.toString());
    
    if (filters) {
      if (filters.name) {
        params = params.set('name', filters.name);
      }
      if (filters.status) {
        params = params.set('status', filters.status);
      }
    }

    return this.http.get<CharacterResponse>(`${this.apiUrl}/character`, { params });
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/character/${id}`);
  }

  getLocationById(id: number): Observable<LocationDetail> {
    return this.http.get<LocationDetail>(`${this.apiUrl}/location/${id}`);
  }

  getEpisodeById(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}/episode/${id}`);
  }

  getCharacterByUrl(url: string): Observable<Character> {
    return this.http.get<Character>(url);
  }
}

