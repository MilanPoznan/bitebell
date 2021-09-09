import React from 'react'
import Img from 'gatsby-image'
import { SingleContent, SingleSliderBox, SingleRole, SingleName } from './SingleSlider.styled'

export default function SingleSlider({ name, role, content, image, left }) {
  return (
    <SingleSliderBox left={left}>
      <Img fluid={image} />
      <SingleName>{name}</SingleName>
      <SingleRole>{role}</SingleRole>
      <SingleContent dangerouslySetInnerHTML={{ __html: content }}></SingleContent>
    </SingleSliderBox>
  )
}