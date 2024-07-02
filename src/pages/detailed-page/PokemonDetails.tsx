import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import favorites from '../../assets/images/favorites.svg'
import { Pokemon, pokeService } from "../../services/poke.service"
import { DescriptionStatsSection, StyledCardSection, StyledDescription, StyledDetailedContainer, StyledHomePageBtn, StyledPokeType, StyledTypeSection } from "./styles"
import { PokemonCard, StyledPreviewId } from "../../components/pokemon-preview/styles"

const PokemonDetails = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const { pokemonId } = useParams<{ pokemonId: string }>()

    useEffect(() => {
        if (pokemonId) loadPokemon(pokemonId)

    }, [pokemonId])

    async function loadPokemon(pokemonId: string) {
        try {
            const pokemonFromParams = await pokeService.getPokemonById(pokemonId)
            setPokemon(pokemonFromParams)
        } catch (err) {
            console.log('error loading pokemon', err)
        }
    }


    if (!pokemon) return <div className="loader">Loading Pokemon...</div>
    return (
        <StyledDetailedContainer className="f">
            <StyledHomePageBtn to={'/'}>&#x2190; Home page</StyledHomePageBtn>
            <PokemonCard size="medium">
                <StyledCardSection className="flex">
                    <div>
                        <StyledPreviewId>#{pokemon._id}</StyledPreviewId>
                        {/* <img src={favorites} alt="" /> */}
                        <img src={pokemon.imgUrl} alt={pokemon.name} />
                        <h3>{pokemon.name}</h3>
                        <StyledTypeSection>{pokemon.type?.map(t => <StyledPokeType key={t}>{t}</StyledPokeType>)}</StyledTypeSection>
                    </div>
                    <section>
                        <h3>Description:</h3>
                        <StyledDescription> {pokemon.description}</StyledDescription>
                        <h3>Stats:</h3>
                        <DescriptionStatsSection>
                            <span>HP: {pokemon.stats.hp}</span>
                            <span>Attack: {pokemon.stats.attack}</span>
                            <span>Defence: {pokemon.stats.defence}</span>
                            <span>Special Attack: {pokemon.stats.specialAtk}</span>
                            <span>Special Defence: {pokemon.stats.specialDef}</span>
                            <span>Speed: {pokemon.stats.speed}</span>
                            <span>Total: {pokemon.stats.total}</span>
                        </DescriptionStatsSection>

                    </section>
                </StyledCardSection>
            </PokemonCard>
        </StyledDetailedContainer>

    )
}

export default PokemonDetails