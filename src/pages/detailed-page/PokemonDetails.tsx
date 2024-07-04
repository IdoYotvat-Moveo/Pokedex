import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Boundaries, Coords, MapEssentials, Pokemon, pokeService } from "../../services/poke.service"
import { DescriptionStatsSection, StyledCardSection, StyledDescription, StyledDetailedContainer, StyledDetailedName, StyledHomePageBtn, StyledMainInfo, StyledPokeType, StyledPseudoElement, StyledSecondaryInfo, StyledStats, StyledSubStats, StyledTypeSection } from "./styles"
import { PokemonCard, StyledPreviewId } from "../../components/pokemon-preview/styles"
import Map from "../../components/map/Map"


const telAvivBoundaries: Boundaries = {
    north: 32.1244,
    south: 32.0150,
    east: 34.8247,
    west: 34.7610
}

const PokemonDetails = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const { pokemonId } = useParams<{ pokemonId: string }>()
    const [currCenter, setCurrCenter] = useState<Coords>(pokeService.getRandomCenter(telAvivBoundaries))
    const apiKey = import.meta.env.VITE_API_KEY
    const zoom = 8

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
        <>

            <StyledDetailedContainer>
                <StyledHomePageBtn to={'/'}>&#x2190; Home page</StyledHomePageBtn>
                <PokemonCard>
                    <StyledCardSection>
                        <StyledMainInfo>
                            <StyledPreviewId>#{pokemon._id}</StyledPreviewId>
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
            <Map apiKey={apiKey} center={currCenter} zoom={14} />
        </>

    )
}

export default PokemonDetails