import styled from "styled-components";

export const StyledForm = styled.form`
    margin-block-start: 57px;
    margin-bottom: 20px;
    
    @media (max-width:714px){
    }
`

export const StyledInput = styled.input`
 width: 22vw;
 min-width: 145px;
 height: 36px;
 top: 124px;
 left: 428px;
 gap: 0px;
 border-radius: 9px;
 border: 1px solid;
 background-color: #F7F7F9;
 opacity: 0px;
 margin-inline-end:6px;
 padding-inline-start: 10px;
 `

export const StyledSearchbutton = styled.button`
width: 87px;
height: 36px;
top: 123px;
left: 775px;
gap: 0px;
border-radius: 9px;
opacity: 0px;
background-color: #373299;
color: white;
`

export const StyledDropDowm = styled.div`
position: absolute;
z-index: 1;
background-color:#fff ;
box-shadow: 4px 4px 20px 0px #00000012;
width: 22vw;
min-width: 180px;
border-radius: 10px;

`

export const StyledRecentSearch = styled.span`
    color:#373299 ;
    padding: 15px;
    font-weight: 600;
    `

export const StyledClearButton = styled.button`
    background-color: transparent;
    color:#373299 ;
    font-weight: 600;
    padding: 18px;
    `

export const StyledDropItem=styled.div`
padding: 10px;
padding-inline: 15px;
color: #5A5A89;
border-radius: 10px;


&:hover{
    background-color: #e9e8e8;
    cursor: pointer;
}
`