import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PokemonPreview from "../../components/pokemon-preview/PokemonPreview"
import { Pokemon, pokeService } from "../../services/poke.service"

const PokemonDetails = () => {
    const [pokemon, setPokemon] = useState<Pokemon| null>(null)
    const { pokemonId } = useParams<{ pokemonId: string }>()

    useEffect(() => {
        if (pokemonId) loadPokemon(pokemonId)

    }, [pokemonId])

    async function loadPokemon(pokemonId: string) {
        try {
            const pokemonFromParams = await pokeService.getPokemonById(pokemonId)
            setPokemon(pokemonFromParams)
        } catch (err) {
            console.log('error loading pokemon', err);
        }
    }

    console.log(pokemon)
    if (!pokemon) return <div className="loader">Loading Pokemon...</div>
    return (
        <div>
        <PokemonPreview pokemon={pokemon}/>
        <h3>Description</h3>
        <p>{pokemon.description}</p>

        <h3>Stats</h3>
        </div>
    )
}

export default PokemonDetails