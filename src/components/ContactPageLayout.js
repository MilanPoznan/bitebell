import React from 'react'
import PartnershipForm from './PartnershipForm'
import DemoForm from './DemoForm'

import BackgroundImage from 'gatsby-background-image'

import './ContactPage.scss'

export default function ContactPageLayout({ title, content, apiContent, partnerLogo, language, selectTypes, cfData, slug }) {
  return (
    <div className="contact container">
      <section className="contact__info">
        <h2 className="purple">{title}</h2>
        <div className="content-wys" dangerouslySetInnerHTML={{ __html: content }} />
      </section>

      <section className="contact__form">
        {slug === 'partnerships' || slug === 'partnerstva'
          ? <PartnershipForm data={cfData} language={language} selectTypes={selectTypes} />
          : <DemoForm data={cfData} language={language} />
        }
      </section>

      <section className="contact__api">
        <div className="contact__api-text" dangerouslySetInnerHTML={{ __html: apiContent }}></div>
        <div className="contact__api-logos">
          {partnerLogo.map((item, index) =>
            <div key={index} className={`${index % 2 === 0 ? 'top' : 'bottom'} `}>
              {item.logo
                ? <BackgroundImage fluid={item.logo.file.image.fluid} />
                : <BackgroundImage fluid={item.logoImage.file.image.fluid} />
              }

            </div>
          )}

        </div>
      </section>

    </div>
  )
}
