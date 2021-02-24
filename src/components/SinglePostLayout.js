import React, { useState, useEffect } from 'react'
import Img from 'gatsby-image'

import CommentComponent from './CommentComponent'
import { fetchWithTimeout } from '../utils/utils'

import SocialsShareComponent from './SocialsShareComponent'
import './SinglePostLayout.scss'

/**
 * SinglePostLayout component
 * 
 * @returns {JSX Element}
 */
export default function SinglePostLayout({
  id,
  postTitle,
  uri,
  postContent,
  slug,
  postSlugTranslationName,
  featuredPostArticleImage,
  language,
  authorName,
  authorDescription
}) {
  const [isCommentPosted, setIsCommentPosted] = useState(false)
  const [originalId, setOriginalId] = useState()

  const getOriginalPostId = data => fetch('https://dev.bitebell.com/wp-json/bitebell/v1/getpostid', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)

  })

  const slugForFetch = () => language === 'sr' ? slug : `en/${slug}`
  console.log('fs', slugForFetch())
  const fetchData = () => {
    fetchWithTimeout(
      getOriginalPostId,
      {
        uri: slugForFetch(),
      },
      10000)
      .then(response => {
        console.log('response', response)
        if (!response.ok) {
          throw new Error(`${response.statusText}`)
        } else {
          console.log(response)
        }
        return response.json()
      })
      .then(res => {
        console.log(res)
        setOriginalId(res.urlToId)
      })
      .catch(e => {
        console.error(e)
      })
  }


  useEffect(() => {
    fetchData()
    console.log('originalId', originalId)
  }, [originalId])


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
                {/* {authorImage && <Img className="single-post__author-header-img" fluid={authorImage}/>} */}
                {authorName && <span className="single-post__author-header-name">{language === 'sr' ? `Autor teksta ${authorName}` : `Written by ${authorName}`}</span>}
              </div>
              <div className="single-post__content content" dangerouslySetInnerHTML={{ __html: postContent }} />
              <div className="single-post__author-bottom">
                {/* {authorImage && <Img className="single-post__author-bottom-img" fluid={authorImage} />} */}
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
      {
        isCommentPosted
          ? <h1 style={{ width: "80%", margin: '0 auto', display: 'flex', justifyContent: 'center' }}>Upsesno ste postavili komentar</h1>
          : <CommentComponent id={originalId} setIsCommentPosted={setIsCommentPosted} isSrlanguage={language === 'sr' ? true : false} />
      }

    </section>
  )
}
