import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import './MapComponent.scss'

import { gsap, TweenMax, TimelineMax} from 'gsap'


import useIntersect from '../hooks/useIntersect'

export default function MapComponent({ mapSection }) {

  const { link, map, orderConfirmed, subtitle, text, title, locations } = mapSection

  const [ref, entry] = useIntersect({
    rootMargin: "0px 0px 0px",
    threshold: 0.5
  })

  const colorSelector = (item) => {
    switch(item) {
      case 'red':
        return '#d61f26'
      case 'yellow':
        return '#ffc244'
      case 'blue':
        return '#2C4482'
      case 'green':
        return '#3cd5af'
      default:
        return ''
    }
  }

  const firstBoxColor = colorSelector(locations[0].color);
  const secondBoxColor = colorSelector(locations[1].color);
  const thirdBoxColor = colorSelector(locations[2].color);


  const borderBox1 = useRef(null)
  const borderBox2 = useRef(null)
  const borderBox3 = useRef(null)

  const dot = useRef(null)

  console.log(borderBox1)

  const sectionMapRef = useRef(null)
  const sectionTextRef = useRef(null)

  const borderBoxAnimate = (element, duration, property) => {
    TweenMax.to(element, duration, property).play();
  }

  const animateFirstBox = () => {
    borderBoxAnimate(borderBox1.current.children[0], 1, {width: '100%'})
    borderBoxAnimate(borderBox1.current.children[1], 1, {height: '100%', delay: 1})
    borderBoxAnimate(borderBox1.current.children[2], 1, {width: '100%', delay: 2})
    borderBoxAnimate(borderBox1.current.children[3], 1, {height: '100%', delay: 3})
    borderBoxAnimate(borderBox1.current, 1, {opacity: '0', delay: 6})
  }

  const animateSecondBox = () => {
    borderBoxAnimate(borderBox2.current.children[0], 1, {width: '100%', delay:6})
    borderBoxAnimate(borderBox2.current.children[1], 1, {height: '100%', delay: 7})
    borderBoxAnimate(borderBox2.current.children[2], 1, {width: '100%', delay: 8})
    borderBoxAnimate(borderBox2.current.children[3], 1, {height: '100%', delay: 9})
    borderBoxAnimate(borderBox2.current, 1, {opacity: '0', delay: 12})
  }

  const animateThirdBox = () => {
    borderBoxAnimate(borderBox3.current.children[0], 1, {width: '100%', delay: 12})
    borderBoxAnimate(borderBox3.current.children[1], 1, {height: '100%', delay: 13})
    borderBoxAnimate(borderBox3.current.children[2], 1, {width: '100%', delay: 14})
    borderBoxAnimate(borderBox3.current.children[3], 1, {height: '100%', delay: 15})
    borderBoxAnimate(borderBox3.current, 1, {opacity: '0', delay: 18})
  }

  const animateDot = () => {
    borderBoxAnimate(dot.current, {transform: 'scale(1.5)'})
  }
  // var masterTimeline = new TimelineMax({ repeat: -1, repeatDelay: 1 });
  
  useEffect(() => {
    animateFirstBox();
    animateSecondBox();
    animateThirdBox();
    // animateDot();
  })
  
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
              <div className={`map-component__locations`}>
                <div className='map-component__locations-wrapper' ref={borderBox1}>
                  <span className="top-box" style={{backgroundColor: firstBoxColor}}></span>
                  <span className="right-box" style={{backgroundColor: firstBoxColor}}></span>
                  <span className="bottom-box" style={{backgroundColor: firstBoxColor}}></span>
                  <span className="left-box" style={{backgroundColor: firstBoxColor}}></span>
                  <div className="map-component__locations-img-container" style={{backgroundColor: firstBoxColor}}>
                    <Img fluid={locations[0].locationIcon.localFile.childImageSharp.fluid} className="map-component__locations-img" />
                  </div>
                  <span className="map-component__locations-pin" style={{backgroundColor: firstBoxColor}} ref={dot}>
                    <span className="map-component__locations-pin-inner" style={{backgroundColor: firstBoxColor}}></span>
                  </span>
                </div>
              </div>
              <div className={`map-component__locations`}>
                <div className='map-component__locations-wrapper' ref={borderBox2}>
                  <span className="top-box" style={{backgroundColor: secondBoxColor}}></span>
                  <span className="right-box" style={{backgroundColor: secondBoxColor}}></span>
                  <span className="bottom-box" style={{backgroundColor: secondBoxColor}}></span>
                  <span className="left-box" style={{backgroundColor: secondBoxColor}}></span>
                  <div className="map-component__locations-img-container" style={{backgroundColor: secondBoxColor}}>
                    <Img fluid={locations[1].locationIcon.localFile.childImageSharp.fluid} className="map-component__locations-img" />
                  </div>
                  <div className="map-component__locations-pin" style={{backgroundColor: secondBoxColor}} ref={dot}>
                    <span className="map-component__locations-pin-inner" style={{backgroundColor: secondBoxColor}}></span>
                  </div>
                </div>
              </div>
              <div className={`map-component__locations`}>
                <div className='map-component__locations-wrapper' ref={borderBox3}>
                  <span className="top-box" style={{backgroundColor: thirdBoxColor}}></span>
                  <span className="right-box" style={{backgroundColor: thirdBoxColor}}></span>
                  <span className="bottom-box" style={{backgroundColor: thirdBoxColor}}></span>
                  <span className="left-box" style={{backgroundColor: thirdBoxColor}}></span>
                  <div className="map-component__locations-img-container" style={{backgroundColor: thirdBoxColor}}>
                    <Img fluid={locations[2].locationIcon.localFile.childImageSharp.fluid} className="map-component__locations-img" />
                  </div>
                  <span className="map-component__locations-pin" style={{backgroundColor: thirdBoxColor}} ref={dot}>
                    <span className="map-component__locations-pin-inner" style={{backgroundColor: thirdBoxColor}}></span>
                  </span>
                </div>
              </div>
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