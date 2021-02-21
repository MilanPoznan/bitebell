import React from 'react'

import FbIcon from '../svg-images/facebook.svg'
import TwIcon from '../svg-images/twitter.svg'
import LnIcon from '../svg-images/linked-in.svg'

import './SocialsShareComponent.scss'

/**
 * SocialsShareComponent component
 *
 * 
 * @returns {JSX Element}
 */
export default function SocialsShareComponent({ title, postSlugTranslationName, slug }) {

  // URL from live site
  const url = 'https://mystifying-wiles-cc7118.netlify.app/'
  const shareUrl = `${url}/${postSlugTranslationName}${slug}`
  
  return (
    <div className="socials-share">
      <div className="socials-share__buttons">
        <div
          data-href={shareUrl}
          className="fb-share-button fb-custom"
          data-layout="button"
          data-size="small"
        >
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noreferrer"
            className="fb-xfbml-parse-ignore"
          >
            <FbIcon />
          </a> 
        </div>
        <a
          className="twitter-share-button"
          href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`}
          target="_blank"
          rel="noreferrer"
        >
          <TwIcon />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${title}`}
          target="_blank"
          rel="noreferrer"
        >
          <LnIcon />
        </a>
      </div>
    </div>
  )
}

