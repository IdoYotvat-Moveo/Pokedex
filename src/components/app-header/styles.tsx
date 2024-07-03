import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #020166;
    height: 67px;
    justify-content: space-between;

    @media (max-width:714px){
      background-color: transparent;
      display: flex;
      justify-content: center;
    }
    `

export const StyledLogo = styled.img`
  margin-inline-start: 106px;
  @media (max-width:714px){
    top: 23px;
    left: 50px;
    margin: 0;
    }
  `

export const StyledNavBar = styled.div`
    margin-inline-end: 106px;
    display: flex;
    color: white;
    gap: 10px;
    
    @media (max-width:714px){
      display: none;
    }
    `
    
export const StyledNavLink = styled(NavLink)`
    padding: 24px;
    transition: .3s;
    
    &.active {
      background-color: #94D97E;
      color:black
    }

    @media (max-width:714px){
      display: none;
    }
`