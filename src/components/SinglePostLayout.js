import React from 'react'
import Img from 'gatsby-image'

import SocialsShareComponent from './SocialsShareComponent'
import './SinglePostLayout.scss'

export default function SinglePostLayout({
  postTitle,
  postContent,
  slug,
  postSlugTranslationName,
  featuredPostArticleImage,
  language,
}) {

  console.log('Language from SPL: ', language)
  return (
    <section className="single-post">
      <div className="single-post__outer-wrapper">
        <div className="single-post__inner-wrapper">
          <div className="single-post__image-wrapper">
            {featuredPostArticleImage ? <Img
              className="single-post__featured-img"
              fluid={featuredPostArticleImage.fluid}
            /> : ''}
          </div>
          <div className="single-post__main">
            <div className="single-post__main-content">
              <h1 className="single-post__title">{postTitle}</h1>
              <div className="single-post__author-header">
                <div className="single-post__author-header-img">AH</div>
                <span className="single-post__author-header-name">{language.locale === 'en_US' ? 'Written by ' : 'Autor teksta '}Author name</span>
              </div>
              <div className="single-post__content content" dangerouslySetInnerHTML={{ __html: postContent }} />
              <div className="single-post__author-bottom">
                <div className="single-post__author-bottom-img">AF</div>
                <div className="single-post__author-bottom-content">
                  <h4 className="single-post__author-bottom-name">Author name</h4>
                  <div className="single-post__author-bottom-description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam qui hic aperiam dolore consectetur facilis corrupti cupiditate quis nobis nihil.</div>
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
