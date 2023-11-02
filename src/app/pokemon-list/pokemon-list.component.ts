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
  page: number = 1;
  itemsPerPage = 10;
  totalPokemons: number = 0;

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
    const offset = (this.page - 1) * this.itemsPerPage;
    this.dataService
      .getPokemons(this.itemsPerPage, offset)
      .subscribe((response: any) => {
        this.totalPokemons = response.count;
        this.pokemons = [];
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
