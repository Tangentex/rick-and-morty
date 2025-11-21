import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { RickMortyService } from '../../services/rick-morty.service';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit, OnDestroy {
  characters: Character[] = [];
  selectedCharacter: Character | null = null;
  searchName: string = '';
  searchStatus: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  loading: boolean = false;
  
  private searchSubject = new Subject<{name: string, status: string}>();
  private subscription?: Subscription;

  @Output() characterSelected = new EventEmitter<Character>();
  @Output() favoriteToggled = new EventEmitter<Character>();
  @Output() charactersLoaded = new EventEmitter<Character[]>();

  constructor(private rickMortyService: RickMortyService) {}

  ngOnInit() {
    this.loadCharacters();
    this.setupSearch();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setupSearch() {
    this.subscription = this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(filters => {
        this.loading = true;
        this.currentPage = 1;
        return this.rickMortyService.getCharacters(this.currentPage, filters);
      })
    ).subscribe({
      next: (response) => {
        this.characters = response.results;
        this.totalPages = response.info.pages;
        this.loading = false;
        this.charactersLoaded.emit(this.characters);
      },
      error: (error) => {
        console.error('Error al buscar personajes:', error);
        this.characters = [];
        this.loading = false;
        this.charactersLoaded.emit(this.characters);
      }
    });
  }

  loadCharacters() {
    this.loading = true;
    const filters = {
      name: this.searchName,
      status: this.searchStatus
    };

    this.rickMortyService.getCharacters(this.currentPage, filters).subscribe({
      next: (response) => {
        this.characters = response.results;
        this.totalPages = response.info.pages;
        this.loading = false;
        this.charactersLoaded.emit(this.characters);
      },
      error: (error) => {
        console.error('Error al cargar personajes:', error);
        this.loading = false;
      }
    });
  }

  onSearchChange() {
    this.searchSubject.next({
      name: this.searchName,
      status: this.searchStatus
    });
  }

  selectCharacter(character: Character) {
    this.selectedCharacter = character;
    this.characterSelected.emit(character);
  }

  toggleFavorite(character: Character, event: Event) {
    event.stopPropagation();
    this.favoriteToggled.emit(character);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
    }
  }
}
