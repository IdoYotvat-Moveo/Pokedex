import { Pokemon } from "../../services/poke.service"
import { StyledPreview, StyledPreviewId, StyledPreviewName } from "./styles"

type previewProps = {
    pokemon: Pokemon
}

const PokemonPreview = ({ pokemon }: previewProps) => {


    return (
        <StyledPreview>
            <section className="flex justify-between">
                <StyledPreviewId>#{pokemon._id}</StyledPreviewId>
                <button><img src="src/assets/images/removePoke.svg" alt="" /></button>
            </section>
            <StyledPreviewName>{pokemon.name}</StyledPreviewName>
        </StyledPreview>
    )
}

export default PokemonPreview