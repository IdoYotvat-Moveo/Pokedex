import styled from "styled-components";
import { Link } from "react-router-dom";

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
   margin-bottom: 16px;
`

export const StyledCardSection = styled.section`
   display :flex ;
   gap: 30px;
`

export const StyledPokeType = styled.div`
text-transform: capitalize;
display: flex;
align-items: center;
justify-content: center;
 width: 100px;
height: 35px;
border-radius: 9px;
color: #fff;
background-color: #a33ea1;
`

export const DescriptionStatsSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 4px;
`



export const StyledDescription = styled.p`
    width: 430px;
    margin-block: 10px;
`


