import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-character-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-stats.component.html',
  styleUrl: './character-stats.component.css'
})
export class CharacterStatsComponent implements OnChanges {
  @Input() characters: Character[] = [];
  
  speciesCount: { [key: string]: number } = {};
  typeCount: { [key: string]: number } = {};

  ngOnChanges() {
    this.calculateStats();
  }

  calculateStats() {
    this.speciesCount = {};
    this.typeCount = {};

    this.characters.forEach(character => {
      // Contar por especie
      const species = character.species || 'Desconocido';
      this.speciesCount[species] = (this.speciesCount[species] || 0) + 1;

      // Contar por tipo
      const type = character.type || 'Sin tipo';
      this.typeCount[type] = (this.typeCount[type] || 0) + 1;
    });
  }

  getSpeciesEntries() {
    return Object.entries(this.speciesCount);
  }

  getTypeEntries() {
    return Object.entries(this.typeCount);
  }
}
