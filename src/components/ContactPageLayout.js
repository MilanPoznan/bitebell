import React from 'react'
import PartnershipForm from './PartnershipForm'
import Img from 'gatsby-image'

import './ContactPage.scss'

export default function ContactPageLayout({ data, language }) {
  const { partners: { title, content, apiContent, logos, becomePartnerCf } } = data
  return (
    <div className="contact container">
      <section className="contact__info">
        <h2 className="purple">{title}</h2>
        <div className="content-wys" dangerouslySetInnerHTML={{ __html: content }} />
      </section>

      <section className="contact__form">
        <PartnershipForm data={becomePartnerCf} language={language} />

      </section>

      <section className="contact__api">
        <div dangerouslySetInnerHTML={{ __html: apiContent }}></div>
        {logos.map((item, index) =>
          <Img key={index} fluid={item.logoImage.file.image.fluid}
          />)}
      </section>

    </div>
  )
}
