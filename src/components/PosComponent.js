import React, { useEffect, useState, useRef } from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import './PosComponent.scss'
import useIntersect from '../hooks/useIntersect'

export default function PosComponent({ posSection, language }) {

  const { link, partnersLogoIcons, partnersRepeater, subtitle, tabelIcon, text, title } = posSection

  const [rotateIndex, setRotateIndex] = useState(0)
  const [yCalc, setYCalc] = useState(0)
  const [isGoesUp, setIsGoesUp] = useState(false)

  const sectionListRef = useRef(null)
  const sectionTextRef = useRef(null)

  const [ref, entry] = useIntersect({
    rootMargin: "0px 0px 0px",
    threshold: 0
  })


  useEffect(() => {
    if (entry.isIntersecting) {
      sectionListRef.current.classList.add('show-top')
      sectionTextRef.current.classList.add('show-bottom')
    }
  }, [entry.isIntersecting])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.abs(rotateIndex) === partnersRepeater.length - 6) {
        setIsGoesUp(true)
      } else if (rotateIndex + 1 === 0) {
        setIsGoesUp(false)
      }
      isGoesUp ? setRotateIndex(rotateIndex + 1) : setRotateIndex(rotateIndex - 1)
      setYCalc(64 * rotateIndex)
    }, 3000);
    return () => clearInterval(interval);
  });
  return (
    <div className="container" ref={ref}>
      <div className="pos__container" id="pos">
        <div className="pos__list-container" ref={sectionListRef}>
          <div className="text-box">
            <div className="desktop-hide">
              <h2>{title}</h2>
              <h5>{subtitle}</h5>
            </div>
          </div>
          {partnersLogoIcons && <Img fluid={partnersLogoIcons.localFile.childImageSharp.fluid} />}
          <div className="pos__swiper-wrapper swiper-container swiper-table swiper-container-initialized swiper-container-vertical swiper-container-ios">
            <div className="swiper-wrapper pos__swiper" id="swiper-wrapper-2277adbd582785eb" style={{ transform: `translateY(${yCalc}px)`, transition: '0.5s' }}>
              {
                partnersRepeater.map((slide, index) => {
                  return (
                    <div className={`pos__slide pos__slide pos-${index}`} key={index}>
                      <div className={`pos__slide-element pos__slide-element--${slide.color}`}></div>
                      <div className="pos__slide-name-wrapper">
                        <p className={`pos__slide-name--${slide.color}`}>{slide.name}</p>
                      </div>
                      <div className="pos__slide-status">
                        <p>{slide.status}</p>
                      </div>
                      <div className="pos__slide-id">
                        <p>{slide.id}</p>
                      </div>
                      <div className="pos__slide-price">
                        <p>{slide.price}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          {tabelIcon && <Img fluid={tabelIcon.localFile.childImageSharp.fluid} className="table-icons pos__table-icon" />}
        </div>
        <div className="pos__text-container" ref={sectionTextRef}>
          <div className="text-box">
            <div className="mobile-hide">
              <h2>{title}</h2>
              <h5>{subtitle}</h5>
            </div>
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
            <Link to={link.url} className={`${language === 'sr' ? 'connect-integrations-rs ' : 'connect-integrations-en '}button button-lg`}>{link.title}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

PosComponent.propTypes = {
  posSection: PropTypes.object
}