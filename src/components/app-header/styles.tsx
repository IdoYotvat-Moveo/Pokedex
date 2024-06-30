import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #020166;
    height: 67px;
    justify-content: space-between;
    
    `

export const StyledNavBar = styled.div`
    margin-inline-end: 106px;
    display: flex;
    color: white;
    gap: 10px;
`

export const StyledNavLink = styled(NavLink)`
    padding: 24px;
    transition: .3s;

  &.active {
    background-color: #94D97E;
    color:black
  }
`