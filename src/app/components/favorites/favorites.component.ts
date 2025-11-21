import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  favorites: Character[] = [];
  showDetails: boolean = false;
  selectedFavorite: Character | null = null;

  @Output() favoriteSelected = new EventEmitter<Character>();

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  selectFavorite(character: Character) {
    this.selectedFavorite = character;
    this.showDetails = true;
    this.favoriteSelected.emit(character);
  }

  closeDetails() {
    this.showDetails = false;
    this.selectedFavorite = null;
  }
}
