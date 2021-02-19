import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import './MapComponent.scss'

export default function MapComponent({mapSection}) {

  const {link, map, orderConfirmed, subtitle, text, title} = mapSection
  console.log(map)

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 aos-init aos-animate">
          <div className="text-box">
            <div className="mobile-hide">
              <h2>{title}</h2>
              <h5>{subtitle}</h5>
            </div>
            <div dangerouslySetInnerHTML={{__html: text}}></div>
            <Link to={link.url} className="button button-lg dispatch-integrations-en">{link.title}</Link>
          </div>
          <div className="col-lg-6 order-first-mobile img-center aos-init aos-animate">
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