import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterStatsComponent } from './character-stats.component';
import { Character } from '../../models/character.model';

describe('CharacterStatsComponent', () => {
  let component: CharacterStatsComponent;
  let fixture: ComponentFixture<CharacterStatsComponent>;

  const mockCharacters: Character[] = [
    {
      id: 1,
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: '', url: '' },
      location: { name: '', url: '' },
      image: '',
      episode: [],
      url: '',
      created: ''
    },
    {
      id: 2,
      name: 'Morty',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: '', url: '' },
      location: { name: '', url: '' },
      image: '',
      episode: [],
      url: '',
      created: ''
    },
    {
      id: 3,
      name: 'Alien',
      status: 'Dead',
      species: 'Alien',
      type: 'Gromflomite',
      gender: 'Male',
      origin: { name: '', url: '' },
      location: { name: '', url: '' },
      image: '',
      episode: [],
      url: '',
      created: ''
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate species count correctly', () => {
    component.characters = mockCharacters;
    component.ngOnChanges();
    
    expect(component.speciesCount['Human']).toBe(2);
    expect(component.speciesCount['Alien']).toBe(1);
  });

  it('should calculate type count correctly', () => {
    component.characters = mockCharacters;
    component.ngOnChanges();
    
    expect(component.typeCount['Sin tipo']).toBe(2);
    expect(component.typeCount['Gromflomite']).toBe(1);
  });

  it('should handle empty characters array', () => {
    component.characters = [];
    component.ngOnChanges();
    
    expect(component.getSpeciesEntries().length).toBe(0);
    expect(component.getTypeEntries().length).toBe(0);
  });

  it('should return species entries', () => {
    component.characters = mockCharacters;
    component.ngOnChanges();
    
    const entries = component.getSpeciesEntries();
    expect(entries.length).toBeGreaterThan(0);
  });
});

