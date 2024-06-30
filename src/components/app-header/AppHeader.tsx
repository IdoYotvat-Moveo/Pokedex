import { StyledContainer, StyledNavBar, StyledNavLink } from "./styles"

const AppHeader = () => {

    return (

        <StyledContainer>
            <img src="src/assets/images/pokelogo.svg" alt="" />
            <StyledNavBar>
                <StyledNavLink to={'/'}>Home</StyledNavLink>
                <StyledNavLink to={'/favorites'}>Favorites</StyledNavLink>
            </StyledNavBar>
        </StyledContainer>
    )
}

export default AppHeader