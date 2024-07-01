import { StyledPokePreviewImg, StyledPreview, StyledPreviewId, StyledPreviewName } from "./styles"
import { Pokemon } from "../../services/poke.service"

type previewProps = {
    pokemon: Pokemon
}

const PokemonPreview = ({ pokemon }: previewProps) => {


    // console.log("src/assets/images/pokeexample.png");
    
    return (
        <StyledPreview>
            <section className="flex justify-between">
                <StyledPreviewId>#{pokemon._id}</StyledPreviewId>
                <button><img src="src/assets/images/removePoke.svg" alt=""/></button>
            </section>
            <section className="flex column">
                <StyledPokePreviewImg src={pokemon.imgUrl} alt="" />
                <StyledPreviewName>{pokemon.name}</StyledPreviewName>
            </section>
        </StyledPreview>
    )
}

export default PokemonPreview