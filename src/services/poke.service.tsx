import axios from 'axios'
import { PokemonType } from '../pages/detailed-page/styles'

const POKE_DB = 'pokeDB'
const BASE_URL = 'https://pokeapi.co/api/v2'

export interface Pokemon {
    _id: string,
    name: string,
    imgUrl: string,
    type?: PokemonType[],
    description?: string,
    stats: Stats,
    isFavorite?: boolean
}
export interface Stats {
    hp: number,
    attack: number,
    defence: number,
    specialAtk: number,
    specialDef: number,
    speed: number,
    total: number,
}
export interface BasicPokemonInfo {
    name: string,
    url: string,
}
export interface Filter {
    text: string
    id?: number | null
}
export interface Boundaries {
    north: number,
    south: number,
    east: number,
    west: number
}
export interface MapEssentials {
    apiKey: string
    center: {
        lat: number
        lng: number
    };
    zoom: number
}
export interface Coords {
    lat: number;
    lng: number;
}

export const pokeService = {
    getPokemons,
    getPokemonById,
    getPokemonsByName,
    getDefaultFilter,
    getRandomCenter,
    loadFromStorage,
    saveToStorage,
    // removePokemon,
    debounce
}

async function getPokemons(amount: number = 30, page: number = 1, filterBy: Filter = getDefaultFilter()): Promise<Pokemon[]> {
    const cachedPokemons = loadFromStorage<Pokemon[]>(POKE_DB) || []
    const startIndex = (page - 1) * amount
    const endIndex = startIndex + amount

    try {
        let filteredPokemons = filterPokemons(cachedPokemons, filterBy)

        // fetch new pokemons if filteredPokemons does not cover the range 
        if (filteredPokemons.length < endIndex) {
            const response = await axios.get(`${BASE_URL}/pokemon?limit=${amount}&offset=${startIndex}`)
            const pokemonUrls = response.data.results.map((pokemon: BasicPokemonInfo) => pokemon.url)
            const pokemonPromises = pokemonUrls.map((url: string) => axios.get(url))
            const pokemonResponses = await Promise.all(pokemonPromises)
            const newPokemons = pokemonResponses.map(res => convertToPokemon(res.data))

            const updatedPokemons = [
                ...cachedPokemons,
                ...newPokemons.filter(newPokemon => !cachedPokemons.some(cachedPokemon => cachedPokemon._id === newPokemon._id))
            ]
            saveToStorage(POKE_DB, updatedPokemons)
            filteredPokemons = filterPokemons(updatedPokemons, filterBy)
        }

        return filteredPokemons.slice(startIndex, endIndex)
    } catch (error) {
        console.error('Error fetching Pokémon data:', error)
        throw error
    }
}

function filterPokemons(pokemons: Pokemon[], filterBy: Filter): Pokemon[] {
    let filteredPokemons = pokemons

    if (filterBy.text) {
        const searchText = filterBy.text.toLowerCase()
        filteredPokemons = filteredPokemons.filter(pokemon => pokemon.name.toLowerCase() === searchText)
    }

    return filteredPokemons
}

 async function getPokemonsByName(name: string): Promise<Pokemon[]> {
    try {
        //getting all names
        const response = await axios.get(`${BASE_URL}/pokemon?limit=1000`)
        const pokemonNames: string[] = response.data.results.map((pokemon: any) => pokemon.name)

        //filtering by name
        const filteredNames = pokemonNames.filter((pokemonName) =>
            pokemonName.toLowerCase().includes(name.toLowerCase())
        )
        //geting all the details
        const detailedPokemons = await Promise.all(filteredNames.map(async (pokemonName) => {
            const pokemonDetailsResponse = await axios.get(`${BASE_URL}/pokemon/${pokemonName}`)
            return convertToDetailedPokemon(pokemonDetailsResponse.data)
        }))
        //returning the pokemons
        return detailedPokemons
    } catch (error) {
        console.error('Error fetching Pokémon by name:', error)
        throw error
    }
}

async function getPokemonById(pokemonId: string): Promise<Pokemon> {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon/${pokemonId}`)
        const detailedPokemon = convertToDetailedPokemon(response.data)
        return detailedPokemon
    } catch (error) {
        console.error('Error fetching Pokémon data:', error)
        throw error
    }
}

function convertToPokemon(data: any): Pokemon {
    //return only basic info
    return {
        _id: data.id.toString(),
        name: data.name,
        imgUrl: data.sprites.front_default,
        stats: {} as Stats, // stats are not fetched at first
    }
}

async function convertToDetailedPokemon(data: any): Promise<Pokemon> {
    const descriptionUrl = data.species.url
    try {
        //handle description
        const descriptionResponse = await axios.get(descriptionUrl)
        const description = descriptionResponse.data.flavor_text_entries.find((entry: any) => entry.language.name === 'en').flavor_text
        //fill in rest of information
        return {
            _id: data.id.toString(),
            name: data.name,
            imgUrl: data.sprites.front_default,
            type: data.types.map((currType: any) => currType.type.name),
            description: description,
            stats: {
                hp: data.stats.find((currStat: any) => currStat.stat.name === 'hp').base_stat,
                attack: data.stats.find((currStat: any) => currStat.stat.name === 'attack').base_stat,
                defence: data.stats.find((currStat: any) => currStat.stat.name === 'defense').base_stat,
                specialAtk: data.stats.find((currStat: any) => currStat.stat.name === 'special-attack').base_stat,
                specialDef: data.stats.find((currStat: any) => currStat.stat.name === 'special-defense').base_stat,
                speed: data.stats.find((currStat: any) => currStat.stat.name === 'speed').base_stat,
                total: data.stats.reduce((total: number, stat: any) => total + stat.base_stat, 0),
            },
        }
    } catch (error) {
        console.error('Error fetching Pokémon description:', error)
        throw error
    }
}

function getDefaultFilter(): Filter {
    return { text: '' }
}

function getRandomCenter(bounds: Boundaries) {
    const lat = bounds.south + Math.random() * (bounds.north - bounds.south)
    const lng = bounds.west + Math.random() * (bounds.east - bounds.west)
    return { lat, lng }
}

function saveToStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage<T>(key: string): T | undefined {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) as T : undefined
}

function debounce<T extends (...args: any[]) => void>(func: T, timeout = 300) {
    let timer: ReturnType<typeof setTimeout> | null
    return function (this: any, ...args: Parameters<T>) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout) as ReturnType<typeof setTimeout>
    }
}



