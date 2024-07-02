import { useEffect, useState } from "react"
import PokemonList from "../pokemon-list/PokemonList"
import PokemonFilter from "../pokemon-filter/PokemonFilter"
import { Filter, Pokemon, pokeService } from "../../services/poke.service"
import { LoadMoreButton, StyledActionSection } from "./styles"

const Index = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [page, setPage] = useState(1)
    const [filterBy, setFilterBy] = useState<Filter>(pokeService.getDefaultFilter())


    useEffect(() => {
        if (filterBy.text) {
            loadFilteredPokemons()
        } else {
            loadPokemons()
        }
    }, [filterBy])

    async function loadPokemons() {
        try {
            let pokemons = await pokeService.getPokemons(25, page, filterBy)
            setPokemons(pokemons)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function loadFilteredPokemons() {
        try {
            const filteredPokemons = await pokeService.getPokemonsByName(filterBy.text)
            setPokemons(filteredPokemons)
        } catch (err) {
            console.log(err)
        }
    }

    function onSetFilter(filterBy: Filter): void {
        setFilterBy(filterBy)
    }

    async function loadMorePokemons(): Promise<void> {
        setPage(prevPage => prevPage + 1)
        try {
            const newPokemons = await pokeService.getPokemons(24, page + 1)
            setPokemons([...pokemons, ...newPokemons])
        } catch (err) {
            console.log('could not load more pokemons', err)
        }
    }


    function showLess(): void {
        const remainingPokemons = pokemons.length - 24
        setPokemons(pokemons.slice(0, remainingPokemons)) // Remove the last 24 pokemons
    }



    return (
        <div>
            <PokemonFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            {!pokemons || !pokemons.length && <h3>No Pokemons to show...</h3>}
            {pokemons && <>
                <PokemonList
                    pokemons={pokemons} />
                <StyledActionSection className="flex justify-center">
                    {pokemons.length > 24 && (
                        <LoadMoreButton onClick={showLess}>Show less</LoadMoreButton>
                    )}
                    <LoadMoreButton onClick={loadMorePokemons}>Load more..</LoadMoreButton>
                </StyledActionSection>
            </>}
        </div>

    )
}


export default Index