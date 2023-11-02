import { Component } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {
  favoritePokemons: any[] = [];
  editingPokemonIndex: number = -1;
  isEditing: boolean = false;

  constructor(private favoritesServices: FavoritesService) {}
  ngOnInit() {
    this.favoritePokemons = this.favoritesServices.getFavorites();
  }
  removeFromFavorites(pokemon: any) {
    this.favoritesServices.removeFromFavorites(pokemon);
    this.favoritePokemons = this.favoritesServices.getFavorites();
  }
  toggleEdit(index: number) {
    this.editingPokemonIndex = index;
    this.isEditing = !this.isEditing;
  }
  saveName(pokemon: any, index: number) {
    this.editingPokemonIndex;
    this.isEditing = false;
    this.favoritesServices.saveToSessionStorage();
  }
}
