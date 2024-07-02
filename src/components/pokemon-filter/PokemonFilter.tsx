import { StyledForm, StyledInput, StyledSearchbutton } from "./styles"
import { Filter, pokeService } from "../../services/poke.service"
import { useEffect, useRef, useState } from "react"

interface FilterProps {
    filterBy: Filter
    onSetFilter: (filterBy: Filter) => void
}

const PokemonFilter = ({ filterBy, onSetFilter }: FilterProps) => {
    const [currFilterBy, setCurrFilterBy] = useState<Filter>(filterBy)
    const [pokemonNames, setPokemonNames] = useState<string[]>([])
    const debouncedSetFilter = useRef(pokeService.debounce((filter: Filter) => {onSetFilter(filter)}, 300)).current

    useEffect(() => {
        fetchPokemonNames()
    }, [])

    useEffect(() => {
        debouncedSetFilter(currFilterBy)
    }, [currFilterBy, debouncedSetFilter])

    async function fetchPokemonNames() {
        try {
            const names = await pokeService.getAllPokemonNames()
            setPokemonNames(names)
        } catch (error) {
            console.error('Error fetching Pokémon names:', error)
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const searchText = event.target.value.trim()
        setCurrFilterBy(prevFilter => ({ ...prevFilter, text: searchText }))
    }

    return (
        <div className="flex justify-center">
            <StyledForm>
                <label title="search"></label>
                <StyledInput
                    type="text"
                    id="search"
                    placeholder="Search Pokemon..."
                    value={currFilterBy.text}
                    onChange={handleChange}
                />
                <StyledSearchbutton>Search</StyledSearchbutton>
            </StyledForm>
        </div>
    )
}

export default PokemonFilter
