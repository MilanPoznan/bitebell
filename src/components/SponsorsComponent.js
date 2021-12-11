import React, { useState, useEffect, useRef } from 'react'
import { useCurrentWidth } from '../hooks/uzeResize'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import './SponsorsComponent.scss'
import useIntersect from '../hooks/useIntersect'

export default function SponsorsComponents({ sponsorsSection }) {

  const { sponsorsLogoRepeater, sponsorsTitle } = sponsorsSection

  const windowWidth = useCurrentWidth()

  const [counter, setCounter] = useState(0)

  const [ref, entry] = useIntersect({
    rootMargin: "0px 0px 0px",
    threshold: windowWidth < 1023 ? 0.5 : 1
  })

  const logosRef = useRef(null)

  useEffect(() => {
    if (entry.isIntersecting) {
      logosRef.current.classList.add('shown')
    }
  }, [entry.isIntersecting])

  const slide = () => counter * 146

  return (
    <section className="partners" ref={logosRef}>
      <div className="container-big partners__container">
        <h4>{sponsorsTitle}</h4>
        <div className="partners-icon sponsors__wrapper" ref={ref}  >
          {/* {
            sponsorsLogoRepeater.length > 7 &&
            <>
              <span role="button" className={counter === 0 ? "inactive" : "active"}
                onClick={() => setCounter(counter + 1)} />
              <span role="button" className={Math.abs(counter) >= sponsorsLogoRepeater.length - 7 ? "inactive" : "active"} onClick={() => counter < (sponsorsLogoRepeater.length - 7) && setCounter(counter - 1)} />
            </>
          } */}
          {
            sponsorsLogoRepeater.map((sponsor, index) => {
              return (
                <div className={`${index % 2 === 0 ? 'top' : 'bottom'} sponsors__img-wrapper`} key={index} style={{ position: 'relative', transition: '0.5s', left: `${slide()}px` }}>
                  {sponsor.logoIcon && <Img className="sponsors__img" fluid={sponsor.logoIcon.localFile.childImageSharp.fluid} />}
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