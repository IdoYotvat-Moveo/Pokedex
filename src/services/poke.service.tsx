import axios from 'axios';

const POKE_DB = 'pokeDB';
const BASE_URL = 'https://pokeapi.co/api/v2';

export interface Stats {
    hp: number,
    attack: number,
    defence: number,
    specialAtk: number,
    specialDef: number,
    speed: number,
    total: number,
}

export interface Pokemon {
    _id: string,
    name: string,
    imgUrl: string,
    type: string[],
    description: string,
    stats: Stats,
}

export interface BasicPokemonInfo {
    name: string,
    url: string,
}

export const pokeService = {
    getPokemons,
    getPokemonById,
    // getPokemonsByType,
};

// async function getPokemons(amount: number = 24): Promise<Pokemon[]> {
//     try {
//         const response = await axios.get(`${BASE_URL}/pokemon?limit=${amount}`)
//         const pokemonUrls = response.data.results.map((pokemon: BasicPokemonInfo) => pokemon.url)
//         const pokemonPromises = pokemonUrls.map((url: string) => axios.get(url))
//         const pokemonResponses = await Promise.all(pokemonPromises)
//         return pokemonResponses.map(res => convertToPokemon(res.data))
//     } catch (error) {
//         console.error('Error fetching Pokémon data:', error)
//         throw error;
//     }
// }

async function getPokemons(amount: number = 24, page: number = 1): Promise<Pokemon[]> {
    
    const cachedPokemons = loadFromStorage<Pokemon[]>(POKE_DB) || [];
    const startIndex = (page - 1) * amount;
    const endIndex = startIndex + amount;

    // Return cached data if available
    if (cachedPokemons.length >= endIndex) {
        return cachedPokemons.slice(startIndex, endIndex);
    }

    try {
        const response = await axios.get(`${BASE_URL}/pokemon?limit=${amount}&offset=${startIndex}`);
        const pokemonUrls = response.data.results.map((pokemon: BasicPokemonInfo) => pokemon.url);
        const pokemonPromises = pokemonUrls.map((url: string) => axios.get(url));
        const pokemonResponses = await Promise.all(pokemonPromises);

        const newPokemons = pokemonResponses.map(res => convertToPokemon(res.data));

        // Merge newPokemons with cachedPokemons
        const updatedPokemons = [...cachedPokemons, ...newPokemons];

        saveToStorage(POKE_DB, updatedPokemons);

        return updatedPokemons.slice(startIndex, endIndex);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        throw error;
    }
}

async function getPokemonById(pokemonId: string): Promise<Pokemon> {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon/${pokemonId}`);
        return convertToPokemon(response.data);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        throw error;
    }
}


//todo add for filtering later.
// async function getPokemonsByType(type: string, limit: number = 24): Promise<Pokemon[]> {
//     try {
//         const response = await axios.get(`${BASE_URL}/type/${type}`);
//         const pokemonList = response.data.pokemon.slice(0, limit).map((p: any) => p.pokemon);
//         const pokemonPromises = pokemonList.map((pokemon: BasicPokemonInfo) => axios.get(pokemon.url));
//         const pokemonResponses = await Promise.all(pokemonPromises);
//         return pokemonResponses.map(res => convertToPokemon(res.data));
//     } catch (error) {
//         console.error('Error fetching Pokémon by type:', error);
//         throw error;
//     }
// }

function convertToPokemon(data: any): Pokemon {
    return {
        _id: data.id.toString(),
        name: data.name,
        imgUrl: data.sprites.front_default,
        type: data.types.map((currType: any) => currType.type.name),
        //todo find better description!!!!
        description: data.species.name, //here
        stats: {
            hp: data.stats.find((currStat: any) => currStat.stat.name === 'hp').base_stat,
            attack: data.stats.find((currStat: any) => currStat.stat.name === 'attack').base_stat,
            defence: data.stats.find((currStat: any) => currStat.stat.name === 'defense').base_stat,
            specialAtk: data.stats.find((currStat: any) => currStat.stat.name === 'special-attack').base_stat,
            specialDef: data.stats.find((currStat: any) => currStat.stat.name === 'special-defense').base_stat,
            speed: data.stats.find((currStat: any) => currStat.stat.name === 'speed').base_stat,
            total: data.stats.reduce((total: number, stat: any) => total + stat.base_stat, 0),
        },
    };
}

function saveToStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage<T>(key: string): T | undefined {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) as T : undefined
}
