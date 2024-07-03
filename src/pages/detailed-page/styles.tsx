import styled from "styled-components";
import { Link } from "react-router-dom";


const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
}



export type PokemonType = keyof typeof typeColors;

interface StyledPokeTypeProps {
    type: PokemonType;
}


export const StyledDetailedContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    width: 850px;
`

export const StyledHomePageBtn = styled(Link)`
    margin-block: 40px;
    align-self: flex-start;
    color: #020166;
`

export const StyledTypeSection = styled.section`
   display :flex ;
   gap: 15px;
   margin-block: 25px;
`

//todo here
export const StyledCardSection = styled.section`
   width: 840px;
   display :flex ;
   gap: 30px;
`

export const StyledPokeType = styled.div<StyledPokeTypeProps>`
text-transform: capitalize;
display: flex;
align-items: center;
justify-content: center;
 width: 100px;
height: 35px;
border-radius: 9px;
color: #fff;
background-color: ${props => typeColors[props.type]};
`

export const DescriptionStatsSection = styled.section`
    display: flex;
    flex-direction: row;
    gap: 30px;
`

export const StyledPseudoElement = styled.div`
    width: 1px;
    height: 220px;
    margin-block: 10px;
    background-color: #D7D7D7;
    
`

export const StyledDescription = styled.p`
    width: 430px;
    margin-block: 10px;
`

export const StyledMainInfo = styled.div`
    padding: 10px;
    text-align: center;
`
export const StyledSecondaryInfo = styled.div`
padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 22px;
`
export const StyledStats = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
export const StyledDetailedName = styled.h3`
    margin-block-end: 10px;
    
`
export const StyledSubStats = styled.section`
    display: flex;
    flex-direction: column;
    gap: 5px;
`


