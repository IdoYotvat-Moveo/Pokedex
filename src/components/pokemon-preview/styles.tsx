import styled from "styled-components"


interface CardProps {
  children: React.ReactNode;
}

export const StyledCard = styled.div`
  background-color: #F7F7F9;
  padding: 10px;
  border-radius: 9px;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.15));
  transition: all.3s;
    color:#373299;
    

    .remove-btn{
        background:none;
        opacity: 0;
    }

    &:hover{
        .remove-btn{
            opacity: 1;
        }
        scale: 1.02;
        cursor: pointer;
    }
    @media (max-width:790px ){
      margin-block-start: 10px;
      margin-inline:50px;
   }

`;

export const PokemonCard: React.FC<CardProps> = ( {children} ) => {
  return <StyledCard>{children}</StyledCard>;
}

export const StyledPreviewName = styled.h2`
    text-align: center;
    font-size: 22px;
    font-weight: 400;
    line-height: 25.78px;  
`

export const StyledPreviewId = styled.h3`
font-size: 22px;
font-weight: 400;
line-height: 25.78px;
text-align: left;

`
export const StyledPokePreviewImg = styled.img`
width: 180px;
margin: auto;
`

export const StyledImgNameSection = styled.section`
    gap:50px;
`

export const StyledPreviewContainer = styled.div`
  min-width: 240px;
`