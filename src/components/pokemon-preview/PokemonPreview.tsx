import { PokemonCard, StyledPokePreviewImg, StyledPreviewContainer, StyledPreviewId, StyledPreviewName } from "./styles"
import { Pokemon } from "../../services/poke.service"
import deletePokebtn from '../../assets/images/removePoke.svg'

type previewProps = {
    pokemon: Pokemon,
    children?: React.ReactNode
    // size?:string
}

const PokemonPreview = ({ pokemon, children }: previewProps) => {

    return (
        <PokemonCard size="small">
            <StyledPreviewContainer>
                <section className="flex justify-between">
                    <StyledPreviewId>#{pokemon._id}</StyledPreviewId>
                    <button><img src={deletePokebtn} alt="" /></button>
                </section>
                <section className="flex column">
                    <StyledPokePreviewImg src={pokemon.imgUrl} alt="" />
                    <StyledPreviewName>{pokemon.name}</StyledPreviewName>
                </section>
            </StyledPreviewContainer>
            {children}
        </PokemonCard>
    )
}

export default PokemonPreview