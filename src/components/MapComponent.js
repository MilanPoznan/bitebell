import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import './MapComponent.scss'

export default function MapComponent({mapSection}) {

  const {link, map, orderConfirmed, subtitle, text, title} = mapSection

  return (
    <div className="container">
      <div className="row">
        <div className="map-component__wrapper">
          <div className="text-box map-component__left">
            <div className="mobile-hide">
              <h2>{title}</h2>
              <h5>{subtitle}</h5>
            </div>
            <div dangerouslySetInnerHTML={{__html: text}}></div>
            <Link to={link.url} className="button button-lg dispatch-integrations-en">{link.title}</Link>
          </div>
          <div className="col-lg-6 order-first-mobile img-center aos-init aos-animate map-component__right">
            <div className="text-box">
              <div className="desktop-hide">
                <h2>{title}</h2>
                <h5>{subtitle}</h5>
              </div>
            </div>
            <div className="map-component__check">
              <Img fluid={orderConfirmed.icon.localFile.childImageSharp.fluid} className="map-component__check-map"/>
              <p>{orderConfirmed.text}</p>
            </div>
            <div className="map-component__map-container">
              <Img fluid={map.localFile.childImageSharp.fluid} className="map-component__map"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

MapComponent.propTypes = {
  mapSection: PropTypes.object.isRequired
}