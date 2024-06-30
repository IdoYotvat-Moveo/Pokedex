import { Pokemon } from "../../services/poke.service"
import PokemonPreview from "../pokemon-preview/PokemonPreview"
import { StyledList } from "./styles"

type listProps = {
    pokemons: Pokemon[]
}

const PokemonList = ({ pokemons }: listProps) => {



    return (
        <StyledList className="flex wrap">
            {pokemons.map(pokemon => (
               <li key={pokemon._id}>
                   <PokemonPreview pokemon={pokemon}/>
               </li>
            ))}
        </StyledList>
    )
}

export default PokemonList