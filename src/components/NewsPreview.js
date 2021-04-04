import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

import './NewsPreview.scss'


/**
 * NewsPreview component
 * 
 * @returns {JSX Element}
 */
export default function NewsPreview({ title, content, image, language, link, minsOfread }) {
  return (
    <Link to={`/${link}`}>
      <div className="news-preview">
        {image !== null
          ? <Img
            className="news-preview__image-wrap"
            fluid={image.node.file.blogImage.fluid}
          />
          : ''
        }
        <div className="news-preview__category">
          {/* {
              category.map((item, index) => <span key={index}>{item.name}{index < category.length - 1 ? ',' : ''}</span>)
            } */}
          {/* Ovo zameniti samo sa kategorinom kada busdu zeleli */}
          <span> .</span>
          <span className="news-preview__read-time"> {minsOfread} {language.slug === 'sr' ? 'minuta čitanja' : 'min read'}</span>
        </div>
        <h3>{title}</h3>
        <div style={{ fontSize: '12px', lineHeight: '20px' }}>{content}</div>

      </div>
    </Link>
  )
}
