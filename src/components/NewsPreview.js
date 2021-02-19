import React from 'react'
import Img from 'gatsby-image'

import defaultNewsImage from '../img/default-image.png'
import './NewsPreview.scss'

export default function NewsPreview({ title, image, category }) {
  console.log(category);

  return (
    <div className="news-preview">
      {image !== null
        ? <Img
          className="news-preview__image-wrap"
          fluid={image.node.file.blogImage.fluid}
        />
        : <img src={defaultNewsImage} alt="Single news" className="news-preview__image-wrap" />
      }
      <div className="news-preview__category">
        {
          category.map((item, index) => <span key={index}>{item.name}{index < category.length - 1 ? ',' : ''}</span>)
        }
      </div>
      
      <h3>{title}</h3>
    </div>
  )
}
