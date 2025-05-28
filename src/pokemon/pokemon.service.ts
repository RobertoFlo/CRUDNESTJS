import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PokemonService {
  private defaultLimit: number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) {
   
  }

  async create(createPokemonDto: CreatePokemonDto) {
    try{
      createPokemonDto.name = createPokemonDto.name.toLowerCase().trim();
      const Pokemon = await this.pokemonModel.create(createPokemonDto);
      return Pokemon;
    }catch(error){
      this.handleExceptions(error)
    }
  }

  findAll(queryParams:PaginationDto) {
    this.defaultLimit = this.configService.get<number>('defaultLimit');
    const {limit = this.defaultLimit, offset = 0} = queryParams;
   // const {limit=10 , offset=0} = queryParams;
    try{
      // let PokemonAll = this.pokemonModel.find().limit(queryParams.limit).skip(queryParams.offset).sort({no:1}).select('-__v');
      let PokemonAll = this.pokemonModel.find().limit(limit).skip(offset).sort({no:1}).select('-__v');
      if(!PokemonAll){
        throw new NotFoundException('No Pokemon found');
      };
      return PokemonAll;
    }catch(err){ 
      throw new InternalServerErrorException('Something went wrong');
    }  
  }

  async findOne(term: string) {
    let pokemon:Pokemon;
    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no:term});
    }
    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name:term.toLowerCase().trim()});

    }
    if(!pokemon) throw new NotFoundException('Pokemon with id, name or no');

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try{
      let pokemon = await this.findOne(term);
      if(updatePokemonDto.name){
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();
      }
      await pokemon.updateOne(updatePokemonDto,{new:true});
      return {...pokemon.toJSON(),...updatePokemonDto};
    }catch(error){
      this.handleExceptions(error)
    }
    
  }

  async remove(term: string) {
    const result = await this.pokemonModel.deleteOne({ _id: term });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Pokemon with id "${term}" not exists`);
    }
    return `This action removes a #${term} pokemon`;
  }

  private handleExceptions(error:any){
    if(error.code === 11000){
      return new BadRequestException(`Pokemon with  ${JSON.stringify(error.keyValue)} already exists`);
    }
    throw new InternalServerErrorException('Something went wrong');
  }
}
