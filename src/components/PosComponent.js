import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import './PosComponent.scss'

export default function PosComponent({posSection}) {
  
  const {link, partnersLogoIcons, partnersRepeater, subtitle, tabelIcon, text, title} = posSection

  return (
    <div className="container">
      <div className="col-lg-6 order-first-mobile aos-init aos-animate">
        <div className="text-box">
          <div className="desktop-hide">
            <h2>{title}</h2>
            <h5>{subtitle}</h5>
          </div>
        </div>
        <Img fluid={partnersLogoIcons.localFile.childImageSharp.fluid} />
        <div className="swiper-container swiper-table swiper-container-initialized swiper-container-vertical swiper-container-ios">
          <div className="swiper-wrapper" id="swiper-wrapper-2277adbd582785eb">
            {
              partnersRepeater.map((slide, index) => {
                return (
                  <div className="swiper-slide" key={index}>
                    <div className={`col-1 ${slide.color}-color`}>
                        <span className="color-mark"></span>
                    </div>
                    <div className={`col-sm-2 col-3 ${slide.color}-color`}>
                      <p>{slide.name}</p>
                    </div>
                    <div className="col-sm-5 col-4">
                      <p>{slide.status}</p>
                    </div>
                    <div className="col-2">
                      <p>{slide.id}</p>
                    </div>
                    <div className="col-2">
                      <p>{slide.price}</p>
                    </div>
                </div>
                )
              })
            }
          </div>
        </div>
        <Img fluid={tabelIcon.localFile.childImageSharp.fluid} className="table-icons"/>
        <div className="col-lg-6 aos-init aos-animate">
          <div className="text-box">
            <div className="mobile-hide">
              <h2>{title}</h2>
              <h5>{subtitle}</h5>
            </div>
            <div dangerouslySetInnerHTML={{__html: text}}></div>
            <Link to={link.url} className="button button-lg connect-integrations-en">{link.title}</Link>
          </div>
        </div>  
      </div>
    </div>
  )
}

PosComponent.propTypes = {
  posSection: PropTypes.object
}