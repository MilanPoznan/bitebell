import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

import './NewsPreview.scss'

/**
 * NewsPreview component
 * 
 * @returns {JSX Element}
 */
export default function NewsPreview({ title, image, language, category, link, firstOfTheIndex, authorAvatar, authorName }) {

  return (
    firstOfTheIndex === 0 ?
      <Link to={`/${link}`} className="news-preview__first-link">
        <div className="news-preview__first">
          <div className="news-preview__first-header">
            <h1 className="news-preview__first-title">{title}</h1>
            <div className="news-preview__first-author">
              {authorName && <span className="news-preview__first-author-name">{language.slug === 'sr' ? `Autor teksta ${authorName}` : `Written by ${authorName}`}</span>}
            </div>
          </div>
          <Img
            className="news-preview__first-featured-img"
            fluid={image.node.file.blogImage.fluid}
          />
        </div>
      </Link> :
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
            {
              category.map((item, index) => <span key={index}>{item.name}{index < category.length - 1 ? ',' : ''}</span>)
            }
          </div>
          <h3>{title}</h3>
        </div>
      </Link>
  )
}
