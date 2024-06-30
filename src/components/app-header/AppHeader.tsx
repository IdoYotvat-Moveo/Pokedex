import { Link } from "react-router-dom"
import { StyledContainer, StyledLogo, StyledNavBar, StyledNavLink } from "./styles"

const AppHeader = () => {

    return (
        <StyledContainer>
            <Link to={'/'}>
            <StyledLogo src="src/assets/images/pokelogo.svg" alt="" />
            </Link>
            <StyledNavBar>
                <StyledNavLink to={'/'}>Home</StyledNavLink>
                <StyledNavLink to={'/favorites'}>Favorites</StyledNavLink>
            </StyledNavBar>
        </StyledContainer>
    )
}

export default AppHeader