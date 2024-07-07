import { StyledClearButton, StyledDropDowm, StyledDropItem, StyledForm, StyledInput, StyledRecentSearch, StyledSearchbutton } from "./styles"
import { Filter, pokeService } from "../../services/poke.service"
import { FormEvent, useEffect, useRef, useState } from "react"

interface FilterProps {
    filterBy: Filter
    onSetFilter: (filterBy: Filter) => void
}

const PokemonFilter = ({ filterBy, onSetFilter }: FilterProps) => {
    const [currFilterBy, setCurrFilterBy] = useState<Filter>(filterBy)
    const [pokemonNames, setPokemonNames] = useState<string[]>([])

    const [recentSearches, setRecentSearches] = useState<string[]>([])
    const [showDropdown, setShowDropdown] = useState(false)

    const debouncedSetFilter = useRef(pokeService.debounce((filter: Filter) => { onSetFilter(filter) }, 300)).current

    useEffect(() => {
        fetchPokemonNames()
        const savedSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]')
        setRecentSearches(savedSearches)
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

    function handleSearch(ev: FormEvent) {
        if (ev) ev.preventDefault()
        if (currFilterBy.text) {
            const updatedSearches = [currFilterBy.text, ...recentSearches.slice(0, 2)]
            setRecentSearches(updatedSearches)
            localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
        }
        setShowDropdown(false)
    }

    function clearSearches() {
        setRecentSearches([])
        localStorage.setItem('recentSearches', JSON.stringify([]))
        setCurrFilterBy({ text: '' })
    }


    return (
        <div className="flex justify-center">
            <StyledForm onSubmit={handleSearch}>
                <label title="search"></label>
                <StyledInput
                    type="text"
                    id="search"
                    placeholder="Search Pokemon..."
                    value={currFilterBy.text}
                    onChange={handleChange}
                    autoComplete="off"
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                />
                <StyledSearchbutton onClick={handleSearch}>Search</StyledSearchbutton>
                {showDropdown && (
                    <StyledDropDowm>
                        <div className="flex justify-between justify-center">
                            <StyledRecentSearch>RECENT SEARCHES</StyledRecentSearch>
                            <StyledClearButton onClick={clearSearches}>CLEAR</StyledClearButton>
                        </div>
                        {recentSearches.map((item, index) => (
                            <StyledDropItem onClick={() => setCurrFilterBy({ text: item })} key={index + item[0]}>{item}</StyledDropItem>
                        ))}
                    </StyledDropDowm>
                )}

            </StyledForm>
        </div>
    )
}

export default PokemonFilter
