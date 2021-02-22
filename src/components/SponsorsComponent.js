import React, { useState, useEffect, useRef } from 'react'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import './SponsorsComponent.scss'
import useIntersect from '../hooks/useIntersect'

export default function SponsorsComponents({sponsorsSection}) {

  const {sponsorsLogoRepeater, sponsorsTitle} = sponsorsSection

  const [ref, entry] = useIntersect({
    rootMargin: "0px 0px 0px",
    threshold: 1
  })

  const logosRef = useRef(null)

  useEffect(() => {
    if (entry.isIntersecting) {
      logosRef.current.classList.add('shown')
    }
  }, [entry.isIntersecting])

  return (
    <section className="partners" ref={logosRef}>
      <div className="container-big">
        <h4>{sponsorsTitle}</h4>
        <div className="partners-icon sponsors__wrapper" ref={ref}>
          {
            sponsorsLogoRepeater.map((sponsor, index) => {
              return (
                <div className={`${index % 2 === 0 ? 'top' : 'bottom'} sponsors__img-wrapper`} key={index}>
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