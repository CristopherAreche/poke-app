import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  page = 1;
  totalPokemons!: number;

  constructor(
    private dataService: DataService,
    private favoritesService: FavoritesService
  ) {}
  ngOnInit(): void {
    this.getPokemons();
  }
  addToFavorites(pokemon: any) {
    this.favoritesService.addToFavorites(pokemon);
  }
  removeFromFavorites(pokemon: any) {
    this.favoritesService.removeFromFavorites(pokemon);
  }
  //Get Pokemons
  getPokemons() {
    this.dataService
      .getPokemons(10, this.page + 0)
      .subscribe((response: any) => {
        this.totalPokemons = response.count;
        response.results.forEach((result: any) => {
          this.dataService
            .getMoreData(result.name)
            .subscribe((uniqueResponse: any) => {
              this.pokemons.push(uniqueResponse);
            });
        });
      });
  }
}
