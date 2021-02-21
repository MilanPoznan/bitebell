import React, {useEffect, useState} from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import './PosComponent.scss'

export default function PosComponent({posSection}) {
  
  const {link, partnersLogoIcons, partnersRepeater, subtitle, tabelIcon, text, title} = posSection

  const [listRotation, setListRotation] = useState();

  // useEffect(() => {
  //   let timer = null;

  //   setTimeout(() => {

  //   }, 3000)
  //   return ()=> clearTimeout()
  // })

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
        <div className="pos__swiper-wrapper swiper-container swiper-table swiper-container-initialized swiper-container-vertical swiper-container-ios">
          <div className="swiper-wrapper pos__swiper" id="swiper-wrapper-2277adbd582785eb">
            {
              partnersRepeater.map((slide, index) => {
                return (
                  <div className="swiper-slide pos__slide" key={index}>
                    <div className={`pos__slide-element pos__slide-element--${slide.color}`}>
                        <span className="color-mark"></span>
                    </div>
                    <div className="pos__slide-name-wrapper">
                      <p className={`pos__slide-name--${slide.color}`}>{slide.name}</p>
                    </div>
                    <div className="pos__slide-status">
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
        <Img fluid={tabelIcon.localFile.childImageSharp.fluid} className="table-icons pos__table-icon"/>
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