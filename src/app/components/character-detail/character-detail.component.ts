import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { RickMortyService } from '../../services/rick-morty.service';
import { Character } from '../../models/character.model';
import { LocationDetail } from '../../models/location.model';
import { Episode } from '../../models/episode.model';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css'
})
export class CharacterDetailComponent implements OnChanges {
  @Input() character: Character | null = null;
  
  origin: LocationDetail | null = null;
  originResident: Character | null = null;
  location: LocationDetail | null = null;
  locationResident: Character | null = null;
  episode: Episode | null = null;
  loading: boolean = false;

  constructor(private rickMortyService: RickMortyService) {}

  ngOnChanges() {
    if (this.character) {
      this.loadCharacterDetails();
    }
  }

  loadCharacterDetails() {
    if (!this.character) return;

    this.loading = true;
    this.origin = null;
    this.originResident = null;
    this.location = null;
    this.locationResident = null;
    this.episode = null;

    const originId = this.extractIdFromUrl(this.character.origin.url);
    const locationId = this.extractIdFromUrl(this.character.location.url);
    const episodeId = this.character.episode.length > 0 ? 
      this.extractIdFromUrl(this.character.episode[0]) : null;

    if (originId) {
      this.rickMortyService.getLocationById(originId).subscribe({
        next: (origin) => {
          this.origin = origin;
          if (origin.residents.length > 0) {
            const residentUrl = origin.residents[0];
            this.rickMortyService.getCharacterByUrl(residentUrl).subscribe({
              next: (resident) => {
                this.originResident = resident;
              }
            });
          }
        }
      });
    }

    if (locationId) {
      this.rickMortyService.getLocationById(locationId).subscribe({
        next: (location) => {
          this.location = location;
          if (location.residents.length > 0) {
            const residentUrl = location.residents[0];
            this.rickMortyService.getCharacterByUrl(residentUrl).subscribe({
              next: (resident) => {
                this.locationResident = resident;
              }
            });
          }
        }
      });
    }

    if (episodeId) {
      this.rickMortyService.getEpisodeById(episodeId).subscribe({
        next: (episode) => {
          this.episode = episode;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  extractIdFromUrl(url: string): number | null {
    if (!url) return null;
    const parts = url.split('/');
    const id = parts[parts.length - 1];
    return id ? parseInt(id) : null;
  }
}
