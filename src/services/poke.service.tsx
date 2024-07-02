import axios from 'axios'

const POKE_DB = 'pokeDB'
const BASE_URL = 'https://pokeapi.co/api/v2'

export interface Pokemon {
    _id: string,
    name: string,
    imgUrl: string,
    type?: string[],
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

export const pokeService = {
    getPokemons,
    getPokemonById,
    getPokemonsByName,
    getDefaultFilter,
    getAllPokemonNames,
    debounce
}


async function getPokemons(amount: number = 25, page: number = 1, filterBy: Filter = getDefaultFilter()): Promise<Pokemon[]> {
    const cachedPokemons = loadFromStorage<Pokemon[]>(POKE_DB) || []
    const startIndex = (page - 1) * amount
    const endIndex = startIndex + amount
    try {
        //log startIndex
        let filteredPokemons = filterPokemons(cachedPokemons, filterBy)
        if (filteredPokemons.length !== cachedPokemons.length || !cachedPokemons.length) {
            const response = await axios.get(`${BASE_URL}/pokemon?limit=${amount}&offset=${startIndex}`)
            const pokemonUrls = response.data.results.map((pokemon: BasicPokemonInfo) => pokemon.url)
            const pokemonPromises = pokemonUrls.map((url: string) => axios.get(url))
            const pokemonResponses = await Promise.all(pokemonPromises)
            const newPokemons = pokemonResponses.map(res => convertToPokemon(res.data))

            const updatedPokemons = [...cachedPokemons, ...newPokemons]

            saveToStorage(POKE_DB, updatedPokemons)
            filteredPokemons = filterPokemons(updatedPokemons, filterBy)
        }

        return filteredPokemons.slice(startIndex, endIndex)
    } catch (error) {
        console.error('Error fetching Pokémon data:', error)
        throw error
    }
}

async function getAllPokemonNames(): Promise<string[]> {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon?limit=1000`) // Adjust limit as needed
        return response.data.results.map((pokemon: any) => pokemon.name)
    } catch (error) {
        console.error('Error fetching Pokémon names:', error)
        throw error
    }
}


function filterPokemons(pokemons: Pokemon[], filterBy: Filter): Pokemon[] {
    let filteredPokemons = pokemons

    if (filterBy.text) {
        const regExp = new RegExp(filterBy.text, 'i')
        filteredPokemons = filteredPokemons.filter(pokemon => regExp.test(pokemon.name))
    }
    //todo future filtering
    // if (filterBy.id) {
    //     filteredPokemons = filteredPokemons.filter(pokemon => pokemon._id === filterBy.id?.toString())
    // }

    return filteredPokemons
}

export async function getPokemonsByName(name: string): Promise<Pokemon[]> {
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



