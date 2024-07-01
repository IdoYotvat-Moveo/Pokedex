import styled from "styled-components";

export const StyledPreview = styled.div`
    padding: 10px;
    background-color: #F7F7F9;
    height: 255px;
    width: 241px;
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
        scale: 1.03;
        cursor: pointer;
    }
`

export const StyledPreviewName = styled.h2`
/* position: absolute; */
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