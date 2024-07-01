import { useEffect, useState } from "react"
// import { Pokemon, pokeService } from "../../services/poke.service"
import PokemonList from "../pokemon-list/PokemonList"
import PokemonFilter from "../pokemon-filter/PokemonFilter"
import { Pokemon, pokeService } from "../../services/poke.service"

const Index = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [page,setPage] = useState(1)

    useEffect(() => {
        if (!pokemons || !pokemons.length) loadPokemons()
    }, [])

    async function loadPokemons() {
        try {
            // let pokemons = await pokeService.query()
            let pokemons = await pokeService.getPokemons(24,page)
            setPokemons(pokemons)
        }
        catch (err) {
            console.log(err)
        }
    }

    if (!pokemons || !pokemons.length) return <div className="loader">Loading Pokemons...</div>
    return (
        <div>
            <PokemonFilter />
            <PokemonList pokemons={pokemons} />
        </div>

    )
}


export default Index