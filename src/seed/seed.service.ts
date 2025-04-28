import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interfaces';;
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

    constructor(
      @InjectModel(Pokemon.name)
      private readonly pokemonModel: Model<Pokemon>,
      private readonly http: AxiosAdapter,
    ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({}); 
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/','pokemon?limit=600');
    const insertPromises = data.results?.map(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      return {name: name.toLowerCase(), no};
    });
    await this.pokemonModel.insertMany(insertPromises); 
    return 'Seed ejecutado con éxito!';
  }
}
