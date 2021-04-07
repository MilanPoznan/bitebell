import React, { useState, useEffect, useRef } from 'react'
import PartnershipForm from './PartnershipForm'
import DemoForm from './DemoForm'
import ThankYou from './ThankYou'

import BackgroundImage from 'gatsby-background-image'

import useIntersect from '../hooks/useIntersect'

import './ContactPage.scss'

export default function ContactPageLayout({ title, content, apiContent, partnerLogo, language, selectTypes, cfData, slug }) {

  const [isFormSuccessfullySubmited, setIsFormSuccessfullySubmited] = useState(false)
  const [ref, entry] = useIntersect({
    rootMargin: "0px 0px 0px",
    threshold: 0
  })

  //
  const logosRef = useRef(null)

  useEffect(() => {
    if (entry.isIntersecting) {
      logosRef.current.classList.add('shown')
    }
  }, [entry.isIntersecting])


  return (
    isFormSuccessfullySubmited
      ? <ThankYou language={language} />
      : <div className="contact container">
        <section className="contact__info">
          <h2 className="purple">{title}</h2>
          <div className="content-wys" dangerouslySetInnerHTML={{ __html: content }} />
        </section>

        <section className="contact__form">
          {slug === 'partnerships' || slug === 'partnerstva'
            ? <PartnershipForm data={cfData} language={language} selectTypes={selectTypes} setIsFormSuccessfullySubmited={setIsFormSuccessfullySubmited} />
            : <DemoForm data={cfData} language={language} setIsFormSuccessfullySubmited={setIsFormSuccessfullySubmited} />
          }
        </section>

        <section className="contact__api" ref={logosRef}>
          <div className="contact__api-text" dangerouslySetInnerHTML={{ __html: apiContent }}></div>
          <div className="contact__api-logos" ref={ref}>
            {partnerLogo.map((item, index) =>
              <div key={index} className={`${index % 2 === 0 ? 'logos top' : 'logos bottom'} `}>
                {
                  item.logo
                    ? <BackgroundImage className="logos__bg" fluid={item.logo.file.image.fluid} />
                    : <BackgroundImage bgclassName="logos__bg" fluid={item.logoImage.file.image.fluid} />
                }
              </div>
            )}

          </div>
        </section>

      </div>
  )
}
