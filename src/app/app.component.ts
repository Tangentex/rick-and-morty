import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CharacterStatsComponent } from './components/character-stats/character-stats.component';
import { FavoritesService } from './services/favorites.service';
import { Character } from './models/character.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CharacterListComponent,
    CharacterDetailComponent,
    FavoritesComponent,
    CharacterStatsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Rick and Morty App';
  selectedCharacter: Character | null = null;
  currentCharacters: Character[] = [];

  constructor(private favoritesService: FavoritesService) {}

  onCharacterSelected(character: Character) {
    this.selectedCharacter = character;
  }

  onFavoriteToggled(character: Character) {
    this.favoritesService.toggleFavorite(character);
  }

  onCharactersLoaded(characters: Character[]) {
    this.currentCharacters = characters;
  }
}
