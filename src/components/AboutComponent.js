import React, { useEffect, useRef } from 'react'
import Img from 'gatsby-image'
import {useCurrentWidth} from '../hooks/uzeResize'
import './AboutComponent.scss'
import PropTypes from 'prop-types'
import useIntersect from '../hooks/useIntersect'

export default function AboutComponent({ aboutSection }) {

  const { aboutRepeater, title } = aboutSection

  const windowWidth = useCurrentWidth();

  const [ref, entry] = useIntersect({
    rootMargin: "0px 0px 0px",
    threshold: windowWidth < 1023 ? 0.2 : 0.5
  })

  const aboutRef = useRef(null)

  useEffect(() => {
    if (entry.isIntersecting) {
      aboutRef.current.classList.add('show')
    }
  }, [entry.isIntersecting])

  return (
    <div className="container about" ref={ref} id="about">
      <h2 className="about__title">{title}</h2>
      <div className="short-about about__container" ref={aboutRef}>
        {
          aboutRepeater.map((about, index) => {
            return (
              <div className={`about__repeater ${index % 2 === 0 ? 'top' : 'bottom'}`} key={index}>
                <div className="short-about-box">
                  <div className="box-icon about__img-wrapper">
                    <Img fluid={about.icon.localFile.childImageSharp.fluid} className="about__img" />
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