import styled from "styled-components"


type CardSize = 'small' | 'medium' | 'large'
interface CardProps {
  size: CardSize;
  children: React.ReactNode;
}

export const StyledCard = styled.div<{ size: CardSize }>`
  background-color: #F7F7F9;
  padding: 10px;
  border-radius: 9px;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.15));
  transition: all.3s;
    color:#373299;
    

    button{
        background:none;
        opacity: 0;
    }

    &:hover{
        button{
            opacity: 1;
        }
        scale: 1.02;
        cursor: pointer;
    }
    @media (max-width:790px ){
      margin-inline:20px;
   }

`;

export const PokemonCard: React.FC<CardProps> = ({ size, children }) => {
  return <StyledCard size={size}>{children}</StyledCard>;
};

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