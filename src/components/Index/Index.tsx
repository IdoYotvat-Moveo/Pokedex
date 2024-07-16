import { useEffect, useState } from "react"
import PokemonList from "../pokemon-list/PokemonList"
import PokemonFilter from "../pokemon-filter/PokemonFilter"
import { Filter, Pokemon, pokeService } from "../../services/poke.service"
import { LoadMoreButton, StyledActionSection, StyledLoadingTitle } from "./styles"

const Index = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [page, setPage] = useState(1)
    const [filterBy, setFilterBy] = useState<Filter>(pokeService.getDefaultFilter())

    const AMOUNT = 30

    useEffect(() => {
        loadPokemons(true)
    }, [filterBy])

    useEffect(() => {
        if (page > 1) {
            loadMorePokemons()
        }
    }, [page])

    async function loadPokemons(isNewFilter = false) {
        if (filterBy.text) {
            try {
                const filteredPokemons = await pokeService.getPokemonsByName(filterBy.text)
                setPokemons(filteredPokemons)
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                let pokemons = await pokeService.getPokemons(AMOUNT, page, filterBy)
                setPokemons(prevPokemons => isNewFilter ? pokemons : [...prevPokemons, ...pokemons])
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    function onSetFilter(filterBy: Filter): void {
        setFilterBy(filterBy)
        setPage(1)
    }

    async function loadMorePokemons() {
        try {
            const newPokemons = await pokeService.getPokemons(AMOUNT, page, filterBy)
            setPokemons(prevPokemons => [
                ...prevPokemons,
                ...newPokemons.filter(newPokemon => !prevPokemons.some(pokemon => pokemon._id === newPokemon._id))
            ])
        } catch (err) {
            console.error('Could not load more pokemons:', err)
        }
    }

    function showLess(): void {
        const remainingPokemons = pokemons.length - AMOUNT
        setPokemons(pokemons.slice(0, remainingPokemons)) // remove the last 24 pokemons
    }

    function handleLoadMore(): void {
        setPage(prevPage => prevPage + 1)
    }

    return (
        <div>
            <PokemonFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            {!pokemons || !pokemons.length && <StyledLoadingTitle>No Pokemons to show...</StyledLoadingTitle>}
            {pokemons && <>
                <PokemonList
                    pokemons={pokemons} />
                <StyledActionSection className="flex justify-center">
                    {pokemons.length > AMOUNT && (
                        <LoadMoreButton onClick={showLess}>Show less...</LoadMoreButton>
                    )}
                    {!filterBy.text && <LoadMoreButton onClick={handleLoadMore}>Load more..</LoadMoreButton>}
                </StyledActionSection>
            </>}
        </div>

    )
}

export default Index