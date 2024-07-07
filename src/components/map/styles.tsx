import styled from "styled-components";



export const StyledLayerBtn = styled.button`
    text-transform: capitalize;
    opacity: 1;
    /* width: 100px; */
    margin: 15px auto;
    border-radius: 9px;
    background-color: #373299;
    color: white;
    padding: 10px;
    transition: all.3s;
    border: 1px solid #373299;

    &:hover{
        background-color: #fff;
        color:#373299 ;
    }
`


export const StyledMapActions = styled.div`
display: grid;
grid-template-columns:repeat(2,100px);
justify-content: center;

`