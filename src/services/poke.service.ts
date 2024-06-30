import { storageService } from './async-storage-service'

const POKE_DB = 'pokeDB'

export const pokeService = {
    query,
    getById,
    remove,
    save,
}

_createPokemons()

export interface Pokemon {
    _id: string,
    name: string,
    imgUrl: string,
    type: string[],
    description: string,
    stats: Stats
}

export interface Stats {
    hp: number,
    attack: number,
    defence: number,
    specialAtk: number,
    specialDef: number,
    speed: number,
    total: number
}

async function query(): Promise<Pokemon[]> {
    try {
        const pokemons = await storageService.query<Pokemon>(POKE_DB)
        return pokemons;
    } catch (err: any) {
        console.error('Query -> Had issues querying pokemons', err)
        throw new Error(err)
    }
}

async function getById(pokemonId: string): Promise<Pokemon | null> {
    const pokemon = await storageService.get<Pokemon>(POKE_DB, pokemonId)
    return pokemon
}

function remove(pokemonId: string): Promise<void> {
    return storageService.remove(POKE_DB, pokemonId)
}

function save(pokemon: Pokemon): Promise<Pokemon> {
    if (pokemon._id) {
        return storageService.put<Pokemon>(POKE_DB, pokemon)
    } else {
        return storageService.post<Pokemon>(POKE_DB, pokemon)
    }
}

function saveToStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage<T>(key: string): T | undefined {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) as T : undefined
}

function _createPokemons(): void {
    let pokemons = loadFromStorage<Pokemon[]>(POKE_DB)
    if (!pokemons || pokemons.length) {
        pokemons = [
            {
                _id: "001",
                name: "Bulbasaur",
                imgUrl: "",
                type: ["Grass", "Poison"],
                description: "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
                stats: {
                    hp: 45,
                    attack: 49,
                    defence: 49,
                    specialAtk: 65,
                    specialDef: 65,
                    speed: 45,
                    total: 318
                }
            },
            {
                _id: "002",
                name: "Ivysaur",
                imgUrl: "",
                type: ["Grass", "Poison"],
                description: "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.",
                stats: {
                    hp: 60,
                    attack: 62,
                    defence: 63,
                    specialAtk: 80,
                    specialDef: 80,
                    speed: 60,
                    total: 405
                }
            },
            {
                _id: "003",
                name: "Venusaur",
                imgUrl: "",
                type: ["Grass", "Poison"],
                description: "The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.",
                stats: {
                    hp: 80,
                    attack: 82,
                    defence: 83,
                    specialAtk: 100,
                    specialDef: 100,
                    speed: 80,
                    total: 525
                }
            },
            {
                _id: "004",
                name: "Charmander",
                imgUrl: "",
                type: ["Fire"],
                description: "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.",
                stats: {
                    hp: 39,
                    attack: 52,
                    defence: 43,
                    specialAtk: 60,
                    specialDef: 50,
                    speed: 65,
                    total: 309
                }
            },
            {
                _id: "005",
                name: "Charmeleon",
                imgUrl: "",
                type: ["Fire"],
                description: "When it swings its burning tail, it elevates the temperature to unbearably high levels.",
                stats: {
                    hp: 58,
                    attack: 64,
                    defence: 58,
                    specialAtk: 80,
                    specialDef: 65,
                    speed: 80,
                    total: 405
                }
            },
            {
                _id: "006",
                name: "Charizard",
                imgUrl: "",
                type: ["Fire", "Flying"],
                description: "Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.",
                stats: {
                    hp: 78,
                    attack: 84,
                    defence: 78,
                    specialAtk: 109,
                    specialDef: 85,
                    speed: 100,
                    total: 534
                }
            },
            {
                _id: "007",
                name: "Squirtle",
                imgUrl: "",
                type: ["Water"],
                description: "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.",
                stats: {
                    hp: 44,
                    attack: 48,
                    defence: 65,
                    specialAtk: 50,
                    specialDef: 64,
                    speed: 43,
                    total: 314
                }
            },
            {
                _id: "008",
                name: "Wartortle",
                imgUrl: "",
                type: ["Water"],
                description: "Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance.",
                stats: {
                    hp: 59,
                    attack: 63,
                    defence: 80,
                    specialAtk: 65,
                    specialDef: 80,
                    speed: 58,
                    total: 405
                }
            },
            {
                _id: "009",
                name: "Blastoise",
                imgUrl: "",
                type: ["Water"],
                description: "A brutal Pokémon with pressurized water jets on its shell. They are used for high-speed tackles.",
                stats: {
                    hp: 79,
                    attack: 83,
                    defence: 100,
                    specialAtk: 85,
                    specialDef: 105,
                    speed: 78,
                    total: 530
                }
            },
            {
                _id: "010",
                name: "Caterpie",
                imgUrl: "",
                type: ["Bug"],
                description: "Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls.",
                stats: {
                    hp: 45,
                    attack: 30,
                    defence: 35,
                    specialAtk: 20,
                    specialDef: 20,
                    speed: 45,
                    total: 195
                }
            },
            {
                _id: "011",
                name: "Metapod",
                imgUrl: "",
                type: ["Bug"],
                description: "This Pokémon is vulnerable to attack while its shell is soft, exposing its weak and tender body.",
                stats: {
                    hp: 50,
                    attack: 20,
                    defence: 55,
                    specialAtk: 25,
                    specialDef: 25,
                    speed: 30,
                    total: 205
                }
            },
            {
                _id: "012",
                name: "Butterfree",
                imgUrl: "",
                type: ["Bug", "Flying"],
                description: "In battle, it flaps its wings at great speed to release highly toxic dust into the air.",
                stats: {
                    hp: 60,
                    attack: 45,
                    defence: 50,
                    specialAtk: 90,
                    specialDef: 80,
                    speed: 70,
                    total: 395
                }
            },
            {
                _id: "013",
                name: "Weedle",
                imgUrl: "",
                type: ["Bug", "Poison"],
                description: "Often found in forests, eating leaves. It has a sharp venomous stinger on its head.",
                stats: {
                    hp: 40,
                    attack: 35,
                    defence: 30,
                    specialAtk: 20,
                    specialDef: 20,
                    speed: 50,
                    total: 195
                }
            },
            {
                _id: "014",
                name: "Kakuna",
                imgUrl: "",
                type: ["Bug", "Poison"],
                description: "Almost incapable of moving, this Pokémon can only harden its shell to protect itself from predators.",
                stats: {
                    hp: 45,
                    attack: 25,
                    defence: 50,
                    specialAtk: 25,
                    specialDef: 25,
                    speed: 35,
                    total: 205
                }
            },
            {
                _id: "015",
                name: "Beedrill",
                imgUrl: "",
                type: ["Bug", "Poison"],
                description: "Flies at high speed and attacks using its large venomous stingers on its forelegs and tail.",
                stats: {
                    hp: 65,
                    attack: 90,
                    defence: 40,
                    specialAtk: 45,
                    specialDef: 80,
                    speed: 75,
                    total: 395
                }
            }
        ]
    }
    saveToStorage(POKE_DB, pokemons)
}