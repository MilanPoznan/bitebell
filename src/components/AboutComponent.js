import React from 'react'
import Img from 'gatsby-image'
import './AboutComponent.scss'
import PropTypes from 'prop-types'

export default function AboutComponent({aboutSection}) {
  
  const {aboutRepeater, title} = aboutSection

  return (
    <div className="container">
      <h2 className="about__title">{title}</h2>
      <div className="short-about about__container">
        {
          aboutRepeater.map((about, index) => {       
            return (
              <div className="about__repeater" key={index}>
                <div className="short-about-box">
                  <div className="box-icon about__img-wrapper">
                    <Img fluid={about.icon.localFile.childImageSharp.fluid} className="about__img"/>
                  </div>
                  <div className="box-text">
                    <h5>{about.cardTitle}</h5>
                    <p>{about.cardText}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

AboutComponent.propTypes = {
  aboutSection: PropTypes.object.isRequired
}