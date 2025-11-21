import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { Character } from '../models/character.model';

describe('FavoritesService', () => {
  let service: FavoritesService;

  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: '',
    episode: [],
    url: '',
    created: ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add character to favorites', () => {
    service.toggleFavorite(mockCharacter);
    expect(service.getFavorites().length).toBe(1);
    expect(service.isFavorite(mockCharacter.id)).toBe(true);
  });

  it('should remove character from favorites', () => {
    service.toggleFavorite(mockCharacter);
    expect(service.getFavorites().length).toBe(1);
    
    service.toggleFavorite(mockCharacter);
    expect(service.getFavorites().length).toBe(0);
    expect(service.isFavorite(mockCharacter.id)).toBe(false);
  });

  it('should load favorites from localStorage', () => {
    localStorage.setItem('favorites', JSON.stringify([mockCharacter]));
    
    const newService = new FavoritesService();
    expect(newService.getFavorites().length).toBe(1);
  });

  it('should handle empty favorites', () => {
    expect(service.getFavorites().length).toBe(0);
    expect(service.isFavorite(1)).toBe(false);
  });
});

