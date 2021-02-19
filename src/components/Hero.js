import React from 'react';
import PropTypes from 'prop-types'
import './Hero.scss'

export default function Hero({heroSection}) {

  const {heroTitle, heroSubtitle} = heroSection

  return (
    <div className="header">
      <div className="container hero">
        <h1>{heroTitle}</h1>
        <div dangerouslySetInnerHTML={{__html: heroSubtitle}}></div>
      </div>
    </div>
  )
}

Hero.propTypes = {
  heroSection: PropTypes.object
}
