import React from 'react'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import './SponsorsComponent.scss'

export default function SponsorsComponents({sponsorsSection}) {

  const {sponsorsLogoRepeater, sponsorsTitle} = sponsorsSection

  return (
    <section className="partners">
      <div className="container-big">
        <h4>{sponsorsTitle}</h4>
        <div className="partners-icon sponsors__wrapper">
          {
            sponsorsLogoRepeater.map((sponsor, index) => {
              return (
                <div className="sponsors__img-wrapper" key={index}>
                  <Img className="sponsors__img" fluid={sponsor.logoIcon.localFile.childImageSharp.fluid}/>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

SponsorsComponents.propTypes = {
  sponsorsSection: PropTypes.object.isRequired
}