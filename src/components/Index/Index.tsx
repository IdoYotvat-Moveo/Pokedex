import { useEffect, useState } from "react"
import { Pokemon, pokeService } from "../../services/poke.service"
import PokemonList from "../pokemon-list/PokemonList"

const Index = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    useEffect(() => {
        if (!pokemons || !pokemons.length) loadPokemons()
    }, [])

    async function loadPokemons() {
        try {
            let pokemons = await pokeService.query()
            setPokemons(pokemons)
        }
        catch (err) {
            console.log(err)
        }
    }

    if (!pokemons || !pokemons.length) return <div className="loader">Loading Pokemons...</div>
    return (
        <div>

            <PokemonList pokemons={pokemons} />
        </div>

    )
}


export default Index