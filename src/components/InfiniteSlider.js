import React, { useState, useEffect } from 'react'
//Components
import MobileInfiniteSlider from './MobileInfiniteSlider'
import DesktopSlider from './DesktopSlider'

import { MainSliderWrapper } from './SingleSlider.styled'
//Hooks
import { useCurrentWidth } from '../hooks/uzeResize'



export default function InfiniteSlider({ testimonials }) {

  const { testemonialsRepeater, testemonialsTitle } = testimonials
  const windowWidth = useCurrentWidth();
  console.log(windowWidth)


  return (
    <MainSliderWrapper>
      {windowWidth < 1200
        ? <MobileInfiniteSlider testemonialsTitle={testemonialsTitle} testemonialsRepeater={testemonialsRepeater} />
        : <DesktopSlider testemonialsTitle={testemonialsTitle} testemonialsRepeater={testemonialsRepeater} />
      }


    </MainSliderWrapper>
  )
}
