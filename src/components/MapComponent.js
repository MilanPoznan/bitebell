import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import './MapComponent.scss'

import { gsap } from 'gsap'


import useIntersect from '../hooks/useIntersect'

export default function MapComponent({ mapSection }) {

  const { link, map, orderConfirmed, subtitle, text, title, locations } = mapSection

  const [ref, entry] = useIntersect({
    rootMargin: "0px 0px 0px",
    threshold: 0.5
  })

  const sectionMapRef = useRef(null)
  const sectionTextRef = useRef(null)

  useEffect(() => {
    if (entry.isIntersecting) {
      sectionMapRef.current.classList.add('show-top')
      sectionTextRef.current.classList.add('show-bottom')
    }
  }, [entry.isIntersecting])

  return (
    <div className="container" ref={ref}>
      <div className="row">
        <div className="map-component__wrapper">
          <div className="text-box map-component__left" ref={sectionTextRef}>
            <div className="mobile-hide">
              <h2>{title}</h2>
              <h5>{subtitle}</h5>
            </div>
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
            <Link to={link.url} className="button button-lg dispatch-integrations-en">{link.title}</Link>
          </div>
          <div className="map-component__right" ref={sectionMapRef}>
            <div className="text-box">
              <div className="desktop-hide">
                <h2>{title}</h2>
                <h5>{subtitle}</h5>
              </div>
            </div>
            <div className="map-component__check">
              <Img fluid={orderConfirmed.icon.localFile.childImageSharp.fluid} className="map-component__check-map" />
              <p>{orderConfirmed.text}</p>
            </div>
            <div className="map-component__map-container">
              <Img fluid={map.localFile.childImageSharp.fluid} className="map-component__map" />
              {
                locations.map((location, index) => {
                  return (
                    <div className={`map-component__locations map-component__locations--${location.color}`} key={index}>
                      <div className='map-component__locations-wrapper'>
                        <span className="top-box"></span>
                        <span className="right-box"></span>
                        <span className="bottom-box"></span>
                        <span className="left-box"></span>
                        <div className="map-component__locations-img-container">
                          <Img fluid={location.locationIcon.localFile.childImageSharp.fluid} className="map-component__locations-img" />
                        </div>
                        <span className="map-component__locations-pin"></span>
                      </div>
                    </div>
                  )
                })
              }
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