import React, { useState, useEffect, useRef } from 'react'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import './SponsorsComponent.scss'
import useIntersect from '../hooks/useIntersect'

export default function SponsorsComponents({sponsorsSection}) {

  const {sponsorsLogoRepeater, sponsorsTitle} = sponsorsSection

  const [counter, setCounter] = useState(0)

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

  const slide = () => counter * 156


  return (
    <section className="partners" ref={logosRef}>
      <div className="container-big partners__container">
        <h4>{sponsorsTitle}</h4>
        <div className="partners-icon sponsors__wrapper" ref={ref}>
          {
            sponsorsLogoRepeater.length > 7 &&
            <>
              <span role="button" onClick={() => counter > 0 && setCounter(counter - 1)} 
              style={{
                borderLeft: `${counter > 0 ? 'solid 5px rgba(44, 68, 130, 1)' : 'solid 5px rgba(44, 68, 130, 0.4)'}`,
                borderBottom: `${counter > 0 ? 'solid 5px rgba(44, 68, 130, 1)' : 'solid 5px rgba(44, 68, 130, 0.4)'}`
                }}></span>
              <span role="button" onClick={() => counter < (sponsorsLogoRepeater.length - 7) && setCounter(counter + 1)}
              style={{
                borderRight: `${counter < (sponsorsLogoRepeater.length - 7) ? 'solid 5px rgba(44, 68, 130, 1)' : 'solid 5px rgba(44, 68, 130, 0.4)'}`,
                borderTop: `${counter < (sponsorsLogoRepeater.length - 7) ? 'solid 5px rgba(44, 68, 130, 1)' : 'solid 5px rgba(44, 68, 130, 0.4)'}`
                }}></span>
            </>
          }
          {
            sponsorsLogoRepeater.map((sponsor, index) => {
              return (
                <div className={`${index % 2 === 0 ? 'top' : 'bottom'} sponsors__img-wrapper`} style={{transform: `translateX(${slide()}px)`}} key={index}>
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