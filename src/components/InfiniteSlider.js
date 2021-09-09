import React, { useState, useEffect } from 'react'
import SingleSlider from './SingleSlider'
import { SliderWrapper, SliderBox, ArrowWrapper } from './SingleSlider.styled'

export default function InfiniteSlider({ testimonials }) {
  const { testemonialsRepeater, testemonialsTitle } = testimonials
  console.log(testemonialsRepeater)
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => console.log(activeSlide))

  const isNextActive = () => Math.abs(activeSlide) < Math.abs(testemonialsRepeater.length - 1)
  const isNextDisabled = () => Math.abs(activeSlide) < Math.abs(testemonialsRepeater.length - 1) ? false : true

  const isPreviusDisabled = () => activeSlide !== 0 ? false : true

  function setSlider(action) {
    console.log(testemonialsRepeater.length)
    action === 'next'
      ? isNextActive() && setActiveSlide(activeSlide - 1)
      : activeSlide !== 0 && setActiveSlide(activeSlide + 1)
  }

  return (
    <SliderBox>
      <h2>{testemonialsTitle}</h2>
      <svg className={`arr-left ${isPreviusDisabled() && 'disabled-arr'}`} width="38" height="26" viewBox="0 0 38 26" fill="none" xmlns="http://www.w3.org/2000/svg"
        onClick={() => setSlider('prev')}
      >
        <path d="M0.858928 14.2201L9.81921 25.1001C10.5605 25.9299 11.7492 26.0091 12.5295 25.3703C13.3097 24.7314 13.4383 23.4402 12.7993 22.6601L6.41909 14.9201L35.6399 14.9201C36.7003 14.9201 37.56 14.0604 37.56 13.0001C37.56 11.9397 36.7003 11.0801 35.6399 11.0801L6.41909 11.0801L12.7993 3.34007C13.4383 2.55992 13.2945 1.28689 12.5295 0.629879C11.7406 -0.0475939 10.458 0.119763 9.81921 0.900068L0.858928 11.7801C0.275645 12.6002 0.325469 13.4269 0.858928 14.2201Z" fill="#2C4482"
        />
      </svg>

      <svg className={`arr-right ${isNextDisabled() && 'disabled-arr'}`} width="38" height="26" viewBox="0 0 38 26" fill="none" xmlns="http://www.w3.org/2000/svg"
        onClick={() => setSlider('next')}
      >
        <path d="M37.1411 11.7799L28.1808 0.899936C27.4395 0.0701315 26.2508 -0.00909521 25.4705 0.629746C24.6903 1.26859 24.5617 2.55979 25.2007 3.33993L31.5809 11.0799L2.36013 11.0799C1.29971 11.0799 0.440048 11.9396 0.440048 12.9999C0.440048 14.0603 1.29971 14.9199 2.36013 14.9199L31.5809 14.9199L25.2007 22.6599C24.5617 23.4401 24.7055 24.7131 25.4705 25.3701C26.2594 26.0476 27.542 25.8802 28.1808 25.0999L37.1411 14.2199C37.7244 13.3998 37.6745 12.5731 37.1411 11.7799Z" fill="#2C4482" />
      </svg>

      <SliderWrapper >
        {testemonialsRepeater !== null && testemonialsRepeater.map((item, index) =>
          <SingleSlider
            key={index}
            left={activeSlide}
            name={item.name}
            image={item.image.localFile.childImageSharp.fluid}
            role={item.role}
            content={item.content}
          />)}
      </SliderWrapper>

    </SliderBox >
  )
}
