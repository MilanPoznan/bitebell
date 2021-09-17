import styled from "styled-components"


export const DesktopSliderWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  svg {
    position: absolute;
    top: calc(50% - 13px);
    cursor: pointer;
    z-index: 100;
  }
  .arr-right-desktop {
    right: 25%;
  }
  .arr-left-desktop {
    left: 30%;
  }
`
export const DesSlider = styled.div`
  display: flex;
  overflow: hidden;
`
export const ActiveSingleSlide = styled.div`
 display: flex;
  flex-flow: column;
  position: relative;
  min-width: 80%;
  width: 80%;
  margin: 010%;
  max-width: 460px;
  padding: 52px 30px 44px;
  height: 100%;
  background: #FFFFFF;
  box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.1);
  /* transform: ${({ left }) => `translateX(${-left * 374}px)`}; */
  transition: 0.4s;
  opacity: 0.3;
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
  svg {
    position: absolute;
    top: calc(50% - 13px);
    cursor: pointer;
    z-index: 100;
  }
  .arr-left {
    left: -60px;
  }
  .arr-right {
    right: -60px;
  }

  @media only screen and (min-width: 1200px) {
    max-width: 400px;
    min-width: 400px;
    height: 458px;
    margin: 0 40px 40px;
  }
`

export const NonActiveSingleSlide = styled(ActiveSingleSlide)`
  opacity: 0.3;
`