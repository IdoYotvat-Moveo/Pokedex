import { StyledPokePreviewImg, StyledPreview, StyledPreviewId, StyledPreviewName } from "./styles"
import { Pokemon } from "../../services/poke.service"
import deletePokebtn from '../../assets/images/removePoke.svg'

type previewProps = {
    pokemon: Pokemon
}

const PokemonPreview = ({ pokemon }: previewProps) => {

    return (
        <StyledPreview>
            <section className="flex justify-between">
                <StyledPreviewId>#{pokemon._id}</StyledPreviewId>
                <button><img src={deletePokebtn} alt="" /></button>
            </section>
            <section className="flex column">
                <StyledPokePreviewImg src={pokemon.imgUrl} alt="" />
                <StyledPreviewName>{pokemon.name}</StyledPreviewName>
            </section>
        </StyledPreview>
    )
}

export default PokemonPreview