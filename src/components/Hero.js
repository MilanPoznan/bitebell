import React, { useState } from 'react';
import PropTypes from 'prop-types'
import YtModal from './YtModal'
import './Hero.scss'

export default function Hero({ heroSection, language }) {

  const { heroTitle, heroSubtitle } = heroSection

  const [showVideo, setShowVideo] = useState(false)

  function playVideo() {
    setShowVideo(true)
    document.body.classList.add('no-scroll')

  }

  return (
    <>
      <div className="header hero__container">
        <div className="container hero">
          <h1>{heroTitle}</h1>
          <div dangerouslySetInnerHTML={{ __html: heroSubtitle }}></div>
          <div className='hero__video-wrapper'>
            <div className="hero__play-btn" onClick={playVideo}></div>
            <p>{language == 'sr' ? 'Pogledaj kako' : 'See how it works'}</p>
          </div>
        </div>
      </div>
      {showVideo && <YtModal setShowVideo={setShowVideo} language={language} />}
    </>
  )
}

Hero.propTypes = {
  heroSection: PropTypes.object
}
