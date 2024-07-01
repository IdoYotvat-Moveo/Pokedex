import { Link } from "react-router-dom"
import { StyledContainer, StyledLogo, StyledNavBar, StyledNavLink } from "./styles"
import MainLogo from '../../assets/images/pokelogo.svg'

const AppHeader = () => {

    return (
        <StyledContainer>
            <Link to={'/'}>
            <StyledLogo src={MainLogo} alt="" />
            </Link>
            <StyledNavBar>
                <StyledNavLink to={'/'}>Home</StyledNavLink>
                <StyledNavLink to={'/favorites'}>Favorites</StyledNavLink>
            </StyledNavBar>
        </StyledContainer>
    )
}

export default AppHeader