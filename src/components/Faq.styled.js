import styled from "styled-components"

export const FaqContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const FaqHeader = styled.div`
  padding: 40px 0 40px;
`

export const Title = styled.h2`
  margin: 0 auto 40px;
  width: 80%;
  display: flex;
  justify-content: center;
  text-align: center;

`
export const Subtitle = styled.h3`
  margin: 0 auto;
  width: 75%;
  display: flex;
  justify-content: center;
  text-align: center;
`
export const AccordionContainer = styled.div`
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-flow: column;
  margin: 0 auto 20px;
  padding: 10px;
  border: 1px solid rgb(49, 67, 81);
  transition: max-height 1s ease-in;
 
`
export const AccordionTitle = styled.p`
display: flex;
justify-content: space-between;
color: #78226F;
font-weight: bold;
cursor: pointer;
svg {
  transition: 0.3s;
  transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
}
`

export const AccordionSubTitle = styled.div`
  padding-top: 20px;
`

export const FaqSearch = styled.div`
  position: relative;
  width: 80%;
  margin: 0 auto 40px;
  display: flex;
  justify-content: center;
  max-width: 400px;
  svg {
    position: absolute;
    left: 10px;
    top: 9px;
  }

`
export const FaqInput = styled.input`
    width: 100%;
    max-width: 400px;
    height: 36px;
    border: 1px solid #e6e9ea;
    padding: 2px 18px 2px 30px;
    transition: box-shadow .3s ease-in-out;
    border-radius: 18px;
    box-shadow: 0 0.3125rem 0.9375rem rgb(14 33 47 / 7%), 0 0.9375rem 2.1875rem rgb(14 33 47 / 10%);
    background-color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    color: #575757;
`

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
  svg {
    position: absolute;
    right: 10px;
    top: 6px;
  }
  @media only screen and (min-width: 1024px) {
    display: none;
  }
`
export const SelectFilter = styled.select`
  width: 100%;
  height: 30px;
  max-width: 400px;
  text-transform: capitalize; 
  border-radius: 12px;
  padding: 0 10px;
  color: #575757;
  -webkit-appearance: none;
  &:focus-visible {
    /* outline-offset: 0px; */
    outline: none ;

  }
  @media only screen and (min-width: 1024px) {
    display: none;
  }
  option {
  color: #575757;

  }
`

export const AccordionWrapper = styled.div`
  display: flex;
  flex-flow: column;
  padding: 16px;
  @media only screen and (min-width: 1024px) {
    width: 70%;
  } 
`

export const DesktopWrapper = styled.div`
  display: flex;
  @media only screen and (min-width: 1024px) {
    width: 80%;
    margin: 40px auto;
  } 
`

export const FilterWrapper = styled.div`
  display: none;
  @media only screen and (min-width: 1024px) {
    display: flex;
    flex-flow: column;
    width: 20%;
  }
`

export const SingleOption = styled.p`
  text-transform: capitalize;
  margin-bottom: 6px;
  width: 100%;
  cursor: pointer;
  font-weight: ${({ isActive }) => isActive ? 'bold' : 'normal'};
  color: ${({ isActive }) => isActive ? 'rgb(0, 119, 204)' : 'rgb(49, 67, 81)'};
  &:hover {
    color: #2C4482;
  }
`

export const CategoryMobileTitle = styled.p`
  font-size: 20px;
  margin-bottom: 14px;
  @media only screen and (min-width: 1024px) {
    display: none;
  }
`

export const FaqWrapper = styled.div`
 @media only screen and (min-width: 1680px) {
    max-width: 1200px;
    margin: 0 auto;
  }
`