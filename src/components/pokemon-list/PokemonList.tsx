import { Link } from "react-router-dom"
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
                   <Link to={`/pokemon/${pokemon._id}`}><PokemonPreview pokemon={pokemon}/></Link>
               </li>
            ))}
        </StyledList>
    )
}

export default PokemonList