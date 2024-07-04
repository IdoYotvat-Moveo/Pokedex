import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Boundaries, Coords, Pokemon, pokeService } from "../../services/poke.service"
import { DescriptionStatsSection, MapContainer, StyledCardSection, StyledDescription, StyledDetailedContainer, StyledDetailedName, StyledDirectionsbtn, StyledHomePageBtn, StyledMainInfo, StyledPokeType, StyledPseudoElement, StyledSecondaryInfo, StyledStats, StyledSubStats, StyledTypeSection } from "./styles"
import { PokemonCard, StyledPreviewId } from "../../components/pokemon-preview/styles"
import Map from "../../components/map/Map"


const telAvivBoundaries: Boundaries = {
    north: 32.1244,
    south: 32.0150,
    east: 34.8247,
    west: 34.7610
}

const MoveoOfficeLocation: Coords = {
    lat: 32.064771,
    lng: 34.772383
}


const PokemonDetails = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const { pokemonId } = useParams<{ pokemonId: string }>()
    const [currCenter, setCurrCenter] = useState<Coords | null>(pokeService.getRandomCenter(telAvivBoundaries))
    const [directions, setDirections] = useState<any>(null)

    const zoom = 14

    useEffect(() => {
        if (pokemonId) loadPokemon(pokemonId)

    }, [pokemonId])

    useEffect(() => {
        setCurrCenter(pokeService.getRandomCenter(telAvivBoundaries))
    }, [])

    async function loadPokemon(pokemonId: string) {
        try {
            const pokemonFromParams = await pokeService.getPokemonById(pokemonId)
            setPokemon(pokemonFromParams)
        } catch (err) {
            console.log('error loading pokemon', err)
        }
    }

    const handleShowDirections = (): void => {
        const directionsService = new google.maps.DirectionsService();
        if (currCenter) {
            directionsService.route(
                {
                    origin: new google.maps.LatLng(currCenter.lat, currCenter.lng), // Pokémon location
                    destination: new google.maps.LatLng(MoveoOfficeLocation.lat, MoveoOfficeLocation.lng), // Office location
                    travelMode: google.maps.TravelMode.WALKING, // Can be DRIVING, WALKING, BICYCLING, or TRANSIT
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setDirections(result); // Set directions data to state
                    } else {
                        console.error('Directions request failed due to ' + status);
                    }
                }
            );
        }

    }


    if (!pokemon || !currCenter) return <div className="loader">Loading...</div>
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
                <StyledDirectionsbtn onClick={handleShowDirections}>show directions</StyledDirectionsbtn>
            </StyledDetailedContainer>
            <MapContainer>
                <Map directions={directions} MoveoOfficeLocation={MoveoOfficeLocation} customMarker={pokemon.imgUrl} center={currCenter} zoom={zoom} />
            </MapContainer>
        </>

    )
}

export default PokemonDetails