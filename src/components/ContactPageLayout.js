import React from 'react'
import PartnershipForm from './PartnershipForm'
import BackgroundImage from 'gatsby-background-image'

import './ContactPage.scss'

export default function ContactPageLayout({ data, language, selectTypes }) {
  const { partners: { title, content, apiContent, logos, becomePartnerCf } } = data
  return (
    <div className="contact container">
      <section className="contact__info">
        <h2 className="purple">{title}</h2>
        <div className="content-wys" dangerouslySetInnerHTML={{ __html: content }} />
      </section>

      <section className="contact__form">
        <PartnershipForm data={becomePartnerCf} language={language} selectTypes={selectTypes} />
      </section>

      <section className="contact__api">
        <div className="contact__api-text" dangerouslySetInnerHTML={{ __html: apiContent }}></div>
        <div className="contact__api-logos">
          {logos.map((item, index) =>
            <div className={`${index % 2 === 0 ? 'top' : 'bottom'} `}>
              <BackgroundImage key={index} fluid={item.logoImage.file.image.fluid} />
            </div>
          )}

        </div>
      </section>

    </div>
  )
}
