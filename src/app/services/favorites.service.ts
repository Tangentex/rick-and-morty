import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<Character[]>([]);
  favorites$: Observable<Character[]> = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavoritesFromLocalStorage();
  }

  getFavorites(): Character[] {
    return this.favoritesSubject.value;
  }

  toggleFavorite(character: Character) {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(fav => fav.id === character.id);
    
    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(character);
    }
    
    this.favoritesSubject.next([...favorites]);
    this.saveFavoritesToLocalStorage();
  }

  isFavorite(characterId: number): boolean {
    return this.getFavorites().some(fav => fav.id === characterId);
  }

  private loadFavoritesFromLocalStorage() {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      try {
        const favorites = JSON.parse(stored);
        this.favoritesSubject.next(favorites);
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
      }
    }
  }

  private saveFavoritesToLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(this.getFavorites()));
  }
}

