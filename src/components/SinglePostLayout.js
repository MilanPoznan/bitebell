import React from 'react'
import Img from 'gatsby-image'

import SocialsShareComponent from './SocialsShareComponent'
import './SinglePostLayout.scss'

/**
 * SinglePostLayout component
 * 
 * @returns {JSX Element}
 */
export default function SinglePostLayout({
  postTitle,
  postContent,
  slug,
  postSlugTranslationName,
  featuredPostArticleImage,
  language,
  authorName,
  authorImage,
  authorDescription
}) {

  return (
    <section className="single-post">
      <div className="single-post__outer-wrapper">
        <div className="single-post__inner-wrapper">
          <div className="single-post__image-wrapper">
            {featuredPostArticleImage && <Img
              className="single-post__featured-img"
              fluid={featuredPostArticleImage}
            />}
          </div>
          <div className="single-post__main">
            <div className="single-post__main-content">
              <h1 className="single-post__title">{postTitle}</h1>
              <div className="single-post__author-header">
                {authorImage && <Img className="single-post__author-header-img" fluid={authorImage}/>}
                {authorName && <span className="single-post__author-header-name">{language === 'sr' ? `Autor teksta ${authorName}` : `Written by ${authorName}`}</span>}
              </div>
              <div className="single-post__content content" dangerouslySetInnerHTML={{ __html: postContent }} />
              <div className="single-post__author-bottom">
                {authorImage && <Img className="single-post__author-bottom-img" fluid={authorImage}/>}
                <div className="single-post__author-bottom-content">
                  {authorName && <h4 className="single-post__author-bottom-name">{authorName}</h4>}
                  {authorDescription && <div className="single-post__author-bottom-description">{authorDescription}</div>}
                </div>
              </div>
            </div>
            <SocialsShareComponent 
              title={postTitle}
              slug={slug}
              postSlugTranslationName={postSlugTranslationName}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
