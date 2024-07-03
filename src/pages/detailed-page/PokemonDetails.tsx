import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import favorites from '../../assets/images/favorites.svg'
import { Pokemon, pokeService } from "../../services/poke.service"
import { DescriptionStatsSection, StyledCardSection, StyledDescription, StyledDetailedContainer, StyledDetailedName, StyledHomePageBtn, StyledMainInfo, StyledPokeType, StyledPseudoElement, StyledSecondaryInfo, StyledStats, StyledSubStats, StyledTypeSection } from "./styles"
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
        <StyledDetailedContainer>
            <StyledHomePageBtn to={'/'}>&#x2190; Home page</StyledHomePageBtn>

            <PokemonCard size="medium">
                <StyledCardSection>
                    <StyledMainInfo>
                        <StyledPreviewId>#{pokemon._id}</StyledPreviewId>
                        {/* <img src={favorites} alt="" /> */}
                        <img src={pokemon.imgUrl} alt={pokemon.name} />
                        <StyledDetailedName>{pokemon.name}</StyledDetailedName>
                        <StyledTypeSection>{pokemon.type?.map(t => <StyledPokeType type={t} key={t}>{t}</StyledPokeType>)}</StyledTypeSection>
                    </StyledMainInfo>
                    <StyledPseudoElement></StyledPseudoElement>
                    <StyledSecondaryInfo>
                        <div>
                            <h3>Description:</h3>
                            <StyledDescription> {pokemon.description}</StyledDescription>
                        </div>
                        <StyledStats>
                            <h3>Stats:</h3>
                            <DescriptionStatsSection>
                                <StyledSubStats>
                                    <span>HP: {pokemon.stats.hp}</span>
                                    <span>Attack: {pokemon.stats.attack}</span>
                                    <span>Defence: {pokemon.stats.defence}</span>
                                </StyledSubStats>
                                <StyledSubStats>
                                    <span>Special Attack: {pokemon.stats.specialAtk}</span>
                                    <span>Special Defence: {pokemon.stats.specialDef}</span>
                                    <span>Speed: {pokemon.stats.speed}</span>
                                </StyledSubStats>
                                <span>Total: {pokemon.stats.total}</span>
                            </DescriptionStatsSection>
                        </StyledStats>
                    </StyledSecondaryInfo>
                </StyledCardSection>
            </PokemonCard>


        </StyledDetailedContainer>

    )
}

export default PokemonDetails