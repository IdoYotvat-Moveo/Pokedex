import { useEffect, useState } from "react"
// import { Pokemon, pokeService } from "../../services/poke.service"
import PokemonList from "../pokemon-list/PokemonList"
import PokemonFilter from "../pokemon-filter/PokemonFilter"
import { Pokemon, pokeService } from "../../services/poke.service"
import { LoadMoreButton, StyledActionSection } from "./styles"

const Index = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (!pokemons || !pokemons.length) loadPokemons()
    }, [])

    async function loadPokemons() {
        try {
            let pokemons = await pokeService.getPokemons(24, page)
            setPokemons(pokemons)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function loadMorePokemons(): Promise<void> {
        setPage(prevPage => prevPage + 1)
        try {
            const newPokemons = await pokeService.getPokemons(24, page + 1);
            setPokemons([...pokemons, ...newPokemons]);
        } catch (err) {
            console.log('could not load more pokemons', err);
        }
    }

    function showLess(): void {
        const remainingPokemons = pokemons.length - 24;
        setPokemons(pokemons.slice(0, remainingPokemons)); // Remove the last 24 pokemons
    }



    if (!pokemons || !pokemons.length) return <div className="loader">Loading Pokemons...</div>
    return (
        <div>
            <PokemonFilter />
            <PokemonList
                pokemons={pokemons} />
            <StyledActionSection className="flex justify-center">
                {pokemons.length > 24 && (
                    <LoadMoreButton onClick={showLess}>Show less</LoadMoreButton>
                )}
                <LoadMoreButton onClick={loadMorePokemons}>Load more..</LoadMoreButton>
            </StyledActionSection>
        </div>

    )
}


export default Index