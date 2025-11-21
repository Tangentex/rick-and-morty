import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RickMortyService } from './rick-morty.service';
import { CharacterResponse } from '../models/character.model';

describe('RickMortyService', () => {
  let service: RickMortyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RickMortyService]
    });
    service = TestBed.inject(RickMortyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get characters', () => {
    const mockResponse: CharacterResponse = {
      info: {
        count: 826,
        pages: 42,
        next: 'https://rickandmortyapi.com/api/character?page=2',
        prev: null
      },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
          location: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/20' },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: ['https://rickandmortyapi.com/api/episode/1'],
          url: 'https://rickandmortyapi.com/api/character/1',
          created: '2017-11-04T18:48:46.250Z'
        }
      ]
    };

    service.getCharacters(1).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(response.results.length).toBe(1);
    });

    const req = httpMock.expectOne('https://rickandmortyapi.com/api/character?page=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get characters with filters', () => {
    const filters = { name: 'Rick', status: 'alive' };

    service.getCharacters(1, filters).subscribe();

    const req = httpMock.expectOne(
      'https://rickandmortyapi.com/api/character?page=1&name=Rick&status=alive'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ info: { count: 0, pages: 0, next: null, prev: null }, results: [] });
  });

  it('should handle error when getting characters', () => {
    service.getCharacters(1).subscribe(
      () => fail('should have failed'),
      (error) => {
        expect(error.status).toBe(404);
      }
    );

    const req = httpMock.expectOne('https://rickandmortyapi.com/api/character?page=1');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });
});

