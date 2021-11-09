import React from 'react'
import Img from 'gatsby-image'
import { SingleContent, SingleSliderBox, SingleRole, SingleName } from './SingleSlider.styled'

export default function SingleSlider({ name, role, content, image, left, hasTransition }) {
  console.log(content)
  return (
    <SingleSliderBox left={left} hasTransition={hasTransition}>
      <Img fluid={image} />
      <SingleName>{name}</SingleName>
      <SingleRole>{role}</SingleRole>
      <SingleContent>{content}</SingleContent>
    </SingleSliderBox>
  )
}
