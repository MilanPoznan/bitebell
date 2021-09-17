import styled from "styled-components"

export const MainSliderWrapper = styled.div`
  position: relative;
`
export const SliderBox = styled.div`
  position: relative;
  h2 {
    margin-bottom: 40px;
    font-family: Encode Sans;
    font-style: normal;
    font-weight: 800;
    font-size: 48px;
    line-height: 115.9%;
    text-align: center;

    color: #78226F;
  }
  svg {
    position: absolute;
    top: 50%;
    cursor: pointer;
    z-index: 20;
  }
  .arr-left {
    left: 14px;
  }
  .arr-right {
    right: 14px;
  }
  .disabled-arr {
    pointer-events: none;
    opacity: 0.2;
  }
  @media only screen and (min-width: 1200px) {
    .arr-left {
    left: 24px;
  }
  .arr-right {
    right: 24px;
  }
  }
`
export const SingleSliderBox = styled.div`
  display: flex;
  flex-flow: column;
  min-width: 80%;
  width: 80%;
  margin: 010%;
  max-width: 460px;
  padding: 52px 30px 44px;
  height: 100%;
  background: #FFFFFF;
  box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.1);
  transform: ${({ left }) => `translateX(${-left * 125}%)`};
  transition: ${({ hasTransition }) => hasTransition ? '0.4s' : 'none'};
  .gatsby-image-wrapper {
    width: 88px;
    min-height: 88px;
    margin: 0 auto 16px;
  }
  img { 
    width: 88px !important;
    height: 88px !important;
    padding: 4px;
    border-radius: 50%;
    object-fit: contain !important;
    border: 4px solid #EFEFEF;
  }
  @media only screen and (min-width: 1200px) {
    max-width: 374px;
    min-width: 374px;
    height: 458px;
    margin: 0 20px 40px;
  }
`

export const SliderWrapper = styled.div`
  display: flex;
  

  width: 100%;
  overflow: hidden;
  @media only screen and (min-width: 1200px) {
    justify-content: center;
  }
`

export const SingleRole = styled.p`
 font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 143.9%;
  text-align: center;
  font-weight: 400;
  color: #78226F;
`
export const SingleName = styled(SingleRole)`
  font-weight: bold;
`

export const SingleContent = styled.div`
  width: 100%;
  margin-top: 24px;
  font-family: Encode Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 143.9%;

  text-align: center;

  color: #2C4482;
`