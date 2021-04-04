import React from 'react'
import { Link } from 'gatsby'

export default function FeaturedPost({ title, minsOfread, content, language, authorName, image, link }) {
  return (
    <Link to={`/${link}`} className="news-preview__first-link">
      <div className="news-preview__first">
        <div className="news-preview__first-header">
          <div className="news-preview__first-wrapper">
            <h1 className="news-preview__first-title">{title}</h1>
            <span className="news-preview__first-read-time"> {minsOfread} {language.slug === 'sr' ? 'minuta čitanja' : 'min read'}</span>
          </div>
          <p>{content}...</p>
          <div className="news-preview__first-author">
            {authorName && <span className="news-preview__first-author-name">{language.slug === 'sr' ? `Autor teksta: ${authorName}` : `Written by: ${authorName}`}</span>}
          </div>
        </div>
        {image && <img className="news-preview__first-featured-img" src={image.node.sourceUrl} />}
      </div>
    </Link>
  )
}
