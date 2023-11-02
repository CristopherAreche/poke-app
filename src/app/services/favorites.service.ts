import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritePokemons: any[] = [];
  constructor() {
    const storedData = sessionStorage.getItem('favoritePokemons');
    if (storedData) {
      this.favoritePokemons = JSON.parse(storedData);
    }
  }
  getFavorites() {
    return this.favoritePokemons;
  }
  addToFavorites(pokemon: any) {
    if (!this.favoritePokemons.some((favorite) => favorite.id === pokemon.id)) {
      this.favoritePokemons.push(pokemon);
      this.saveToSessionStorage();
    }
  }
  removeFromFavorites(pokemon: any) {
    const index = this.favoritePokemons.indexOf(pokemon);
    if (index !== -1) {
      this.favoritePokemons.splice(index, 1);
      this.saveToSessionStorage();
    }
  }
  public saveToSessionStorage() {
    sessionStorage.setItem(
      'favoritePokemons',
      JSON.stringify(this.favoritePokemons)
    );
  }
}
