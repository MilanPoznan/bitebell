import React from 'react'

import FbIcon from '../svg-images/facebook.svg'
import TwIcon from '../svg-images/twitter.svg'
import LnIcon from '../svg-images/lnIcon.svg'
// import ViberIcon from '../svg-images/viber.svg'
import WhatsAppIcon from '../svg-images/whatsapp.svg'

import './SocialsShareComponent.scss'

/**
 * SocialsShareComponent component
 *
 * 
 * @returns {JSX Element}
 */
export default function SocialsShareComponent({ isLangEng, title, postSlugTranslationName, slug }) {

  // URL from live site
  const url = 'https://mystifying-wiles-cc7118.netlify.app/'
  const shareUrl = `${url}${isLangEng ? "blog/" : "en/news/"}${postSlugTranslationName}`
  console.log('url', shareUrl)
  console.log('name', postSlugTranslationName)
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
            className="fb-xfbml-parse-ignore fb-link"
          >
            <FbIcon />
          </a>
        </div>
        <a
          className="twitter-share-button twitter-link"
          href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`}
          target="_blank"
          rel="noreferrer"
        >
          <TwIcon />
        </a>

        {/* <a
          className="twitter-share-button"
          // href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`}
          target="_blank"
          rel="noreferrer"
        >
          <ViberIcon />
        </a> */}
        <a
          className="twitter-share-button waap-link"
          href={`https://web.whatsapp.com/send?text=${shareUrl}`}
          data-action="share/whatsapp/share"
          target="_blank"
          rel="noreferrer"
        >
          <WhatsAppIcon />
        </a>
        <a
          className="ln-link"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          // href="https://www.linkedin.com/shareArticle?mini=true&url=https://mystifying-wiles-cc7118.netlify.app/blog/znacaj-automatizacije-za-restorane-5-kljucnih-saveta-za-uspeh&title=test"
          target="_blank"
          rel="noreferrer"
        >
          <LnIcon />
        </a>
      </div>
    </div>
  )
}

