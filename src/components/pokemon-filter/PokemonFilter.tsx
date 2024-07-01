import { FormEvent } from "react"
import { StyledForm, StyledInput, StyledSearchbutton } from "./styles"

const PokemonFilter = () => {

    function onFilter(ev:FormEvent<HTMLFormElement>): void {
        ev.preventDefault()
        console.log('filterrrrrr');
    }

    
    return (
        <StyledForm onSubmit={onFilter}>
            <label title="search"></label>
            <StyledInput type="text" id="search" placeholder="Search Pokemon..." />
            <StyledSearchbutton>Search</StyledSearchbutton>
        </StyledForm>
    )
}


export default PokemonFilter